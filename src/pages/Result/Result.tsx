import { OnChangeType } from "App";
import { Button, Form} from "components";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useEffect } from "react";
import { Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { AppReducerActions, AppState} from "state";
import styles from "./result.module.css";
import { useInputs } from "./useInputs";

interface ResultProps {
  error: AppState["error"];
  inputs: AppState["inputs"];
  configs: AppState["configs"];
  options: AppState["options"];
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
  const appAction = useAppDispatch(appDispatch);
  const inputsSet = useInputs({configs, inputs, onChange})
  const navigate = useNavigate()
  useEffect(() => {
    if (error) appAction.setAppState({ configs: null });
  }, [appAction, error]);
  if (!configs) return <Button title="adjust configs" onClick={() => navigate('/')} />;
  console.count("Result");

  return (
    <div className={styles.Result}>
      <h3>Result</h3>
      <h1>Form title: {options?.formTitle}</h1>
      <Form>
        {inputsSet}
        {options?.buttons.map((button) => (
          <Button key={button.title} title={button.title} type="button" />
        ))}
      </Form>
    </div>
  );
}
