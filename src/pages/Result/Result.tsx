import { OnChangeType } from "App";
import { Checkbox, Form, Input, Textarea } from "components";
import { useAppSelector } from "hooks/useAppSelector";
import { Dispatch } from "react";
import { AppReducerActions, AppState, ConfigType } from "state";
import styles from "./result.module.css";

interface ResultProps {
  inputs: AppState["inputs"];
  configs: AppState['configs']
  onChange: OnChangeType;
  appDispatch: Dispatch<AppReducerActions>;
}

export function Result({
  configs,
  inputs,
  onChange,
  appDispatch,
}: ResultProps) {
  const { selectValueById } = useAppSelector();
  if (!configs) return null;

  console.count("Result");
  const createInputs = (input: ConfigType) => {
    if (input.type === "checkbox") {
      return (
        <Checkbox
          key={input.itemId}
          id={input.itemId}
          checked={selectValueById(input.itemId, inputs) as boolean | undefined}
          label={input.label}
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
  };
  return (
    <div className={styles.Result}>
      <h3>Result</h3>
      <Form>{() => configs.map(createInputs)}</Form>
    </div>
  );
}
