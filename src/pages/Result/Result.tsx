import { OnChangeType } from "App";
import { Button, Checkbox, Form, Input, Textarea } from "components";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { useEffect } from "react";
import { Dispatch } from "react";
import { AppReducerActions, AppState, ConfigType, OptionType } from "state";
import styles from "./result.module.css";

interface ResultProps {
  error: AppState["error"];
  inputs: AppState["inputs"];
  configs: AppState["configs"];
  options: AppState['options'];
  onChange: OnChangeType;
  appDispatch: Dispatch<AppReducerActions>;
}

export function Result({
  error,
  configs,
  inputs,
  options,
  onChange,
  appDispatch,
}: ResultProps) {
  const { selectValueById } = useAppSelector();
  const appAction = useAppDispatch(appDispatch);
  useEffect(() => {
    if (error) {
      appAction.setAppState({ configs: null });
    }
  }, [appAction, error]);
  if (!configs) return null;
  console.count("Result");

  const createInputs = (input: ConfigType | OptionType) => {
    if ("label" in input) {
      if (input.type === "checkbox") {
        return (
          <Checkbox
            key={input.itemId}
            id={input.itemId}
            checked={
              selectValueById(input.itemId, inputs) as boolean | undefined
            }
            label={input.label}
            type={input.type}
            onChange={onChange}
          />
        );
      }
      if (input.type === "textarea") {
        return (
          <Textarea
            key={input.itemId}
            id={input.itemId}
            value={selectValueById(input.itemId, inputs) as string | undefined}
            label={input.label}
            onChange={onChange}
          />
        );
      }
      if (input.type === "radio") {
        return (
          <Input
            key={input.value}
            id={input.itemId}
            label={input.label}
            value={input.value}
            type={input.type}
            checked={selectValueById(input.itemId, inputs) === input.value}
            onChange={onChange}
          />
        );
      }
      return (
        <Input
          key={input.itemId}
          id={input.itemId}
          label={input.label}
          value={selectValueById(input.itemId, inputs) as string | undefined}
          type={input.type}
          onChange={onChange}
        />
      );
    }
  };
  return (
    <div className={styles.Result}>
      <h3>Result</h3>
      <h1>Form title: {options?.formTitle}</h1>
      <Form>{configs.map(createInputs)}
        {options?.buttons.map(button => <Button key={button.title} title={button.title} type="button" />)}
      </Form>
    </div>
  );
}
