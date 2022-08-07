import { OnChangeType } from "App";
import { Button, Form, Textarea } from "components";
import { isString } from "helpers";
import styles from "./config.module.css";

interface ConfigProps {
  configValue?: string | boolean;
  onChange: OnChangeType;
  clickApply: () => void;
}

export default function Config({
  configValue,
  clickApply,
  onChange,
}: ConfigProps) {
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
          <Button onClick={clickApply} title="Apply" />
        ) : null}
      </Form>
    </div>
  );
}
