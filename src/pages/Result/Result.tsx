import { OnChangeType } from "App";
import { Button, Form } from "components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppState } from "state";
import styles from "./result.module.css";
import { useInputs } from "./useInputs";

interface ResultProps {
  inputs: AppState["inputs"];
  configs: AppState["configs"];
  options: AppState["options"];
  onChange: OnChangeType;
}

export default function Result({
  configs,
  inputs,
  options,
  onChange,
}: ResultProps) {
  const inputsSet = useInputs({ configs, inputs, onChange });
  const navigate = useNavigate();
  useEffect(() => {
    if (!configs) navigate("/");
  }, [configs, navigate]);
  if (!configs) return null;
  return (
    <div className={styles.Result}>
      <h3>Result</h3>
      <h1>{options?.formTitle}</h1>
      <Form>
        {inputsSet}
        {options?.buttons.map((button) => (
          <Button key={button.title} title={button.title} type="button" />
        ))}
      </Form>
    </div>
  );
}
