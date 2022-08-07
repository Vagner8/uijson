import { OnChangeType } from "App";
import { Button, Form, Textarea } from "components";
import { isString } from "helpers";
import { useAppDispatch } from "hooks/useAppDispatch";
import { Dispatch, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppReducerActions } from "state";
import styles from "./config.module.css";

interface ConfigProps {
  configValue?: string | boolean;
  onChange: OnChangeType;
  clickApply: () => void;
  appDispatch: Dispatch<AppReducerActions>;
}

export function Config({ configValue, clickApply, onChange, appDispatch }: ConfigProps) {
  const appAction = useAppDispatch(appDispatch)
  console.count("Config");
  return (
    <div className={styles.Config}>
      <h3>Config</h3>
      <Form>
        <Textarea
          id="config"
          label="config"
          onChange={onChange}
          rows={20}
          value={isString(configValue) ? configValue : undefined}
        />
        {configValue ? (
          <Link to="/result">
            <Button onClick={clickApply} type="button" title="Apply" />
          </Link>
        ) : null}
      </Form>
    </div>
  );
}
