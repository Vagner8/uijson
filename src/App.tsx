import { Alert } from "components";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import React, { ChangeEvent, lazy, Suspense, useReducer } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Container } from "./components/Container/Container";
import { Navbar } from "./components/Navbar/Navbar";
import { appReducer, ConfigType, initialAppState, OptionType } from "./state";
import { v4 as uuidv4 } from "uuid";
import {
  haveRadioButtonsUniqueValue,
  isConfigType,
  isOptionType,
} from "helpers";

const Result = lazy(() => import("./pages/Result/Result"));
const Config = lazy(() => import("./pages/Config/Config"));

export interface OnChangeType {
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

function App() {
  const [appState, appDispatch] = useReducer(appReducer, initialAppState);
  const { selectValueById } = useAppSelector();
  const actionApp = useAppDispatch(appDispatch);
  const navigate = useNavigate();
  const onChange: OnChangeType = (e) => {
    actionApp.setAppState({ error: null });
    if (e.target.type === "checkbox") {
      return actionApp.onChange({
        itemId: e.target.id,
        checked: (e.target as HTMLInputElement).checked,
        type: e.target.type,
      });
    }
    actionApp.onChange({
      itemId: e.target.id,
      value: e.target.value,
      type: e.target.type,
    });
  };

  const clickApply = () => {
    try {
      const configsValue = selectValueById("config", appState.inputs) as
        | undefined
        | string;
      if (!configsValue) return;
      const arrConfigs = JSON.parse(configsValue) as (
        | ConfigType
        | OptionType
      )[];
      const options = arrConfigs.filter(isOptionType);
      const configs = arrConfigs.filter(isConfigType).map((item) => {
        if (item.type !== "radio") {
          return {
            ...item,
            itemId: uuidv4(),
          };
        }
        return item;
      });
      actionApp.setAppState({ configs, options: options[0] });
      if (options.length > 1)
        return actionApp.setAppState({ error: "allowed only one option object" });
      if (!haveRadioButtonsUniqueValue(configs))
        return actionApp.setAppState({ error: "radio buttons values are not unique" });
      if (!appState.error) navigate("/result");
    } catch (err) {
      actionApp.setAppState({ error: "incorrect input" });
    }
  };

  return (
    <div className="App">
      <Navbar
        isConfigValue={!!selectValueById("config", appState.inputs)}
        clickApply={clickApply}
      />
      <Container>
        {appState.error ? <Alert message={appState.error} /> : null}
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <Config
                  configValue={selectValueById("config", appState.inputs)}
                  clickApply={clickApply}
                  onChange={onChange}
                />
              }
            />
            <Route
              path="/result"
              element={
                <Result
                  inputs={appState.inputs}
                  configs={appState.configs}
                  options={appState.options}
                  onChange={onChange}
                />
              }
            />
          </Routes>
        </Suspense>
      </Container>
    </div>
  );
}

export default App;
