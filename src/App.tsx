import { Alert } from "components";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import React, { ChangeEvent, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Container } from "./components/Container/Container";
import { Navbar } from "./components/Navbar/Navbar";
import { Config } from "./pages/Config/Config";
import { Result } from "./pages/Result/Result";
import { appReducer, ConfigType, initialAppState, OptionType } from "./state";
import { v4 as uuidv4 } from "uuid";
import { isConfigType, isOptionType } from "helpers";

export interface OnChangeType {
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

function App() {
  const [appState, appDispatch] = useReducer(appReducer, initialAppState);
  const { selectValueById } = useAppSelector();
  const actionApp = useAppDispatch(appDispatch);
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
      const configs = selectValueById("config", appState.inputs) as
        | undefined
        | string;
      if (!configs) return;
      const arrConfigs = JSON.parse(configs) as (ConfigType | OptionType)[];
      actionApp.setAppState({
        configs: arrConfigs.filter(isConfigType).map((item) => {
          if (item.type !== "radio") {
            return {
              ...item,
              itemId: uuidv4(),
            };
          }
          return item;
        }),
        options: arrConfigs.filter(isOptionType)[0],
      });
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
        <Routes>
          <Route
            path="/"
            element={
              <Config
                configValue={selectValueById("config", appState.inputs)}
                clickApply={clickApply}
                onChange={onChange}
                appDispatch={appDispatch}
              />
            }
          />
          <Route
            path="/result"
            element={
              <Result
                error={appState.error}
                inputs={appState.inputs}
                configs={appState.configs}
                options={appState.options}
                onChange={onChange}
                appDispatch={appDispatch}
              />
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
