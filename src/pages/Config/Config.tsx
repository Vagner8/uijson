import { OnChangeType } from "App";
import { Button, Form, Textarea } from "components";
import { isString } from "helpers";
import { Link } from "react-router-dom";
import styles from "./config.module.css";

interface ConfigProps {
  configValue?: string | boolean;
  onChange: OnChangeType;
  clickApply: () => void;
}

export function Config({ configValue, clickApply, onChange }: ConfigProps) {
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
