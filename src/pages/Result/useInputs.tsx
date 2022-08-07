import { OnChangeType } from "App";
import { Checkbox, Input, Textarea } from "components";
import { useAppSelector } from "hooks/useAppSelector";
import { useCallback, useEffect, useState } from "react";
import { AppState, ConfigType, OptionType } from "state";

interface UseInputs {
  configs: AppState["configs"];
  inputs: AppState["inputs"];
  onChange: OnChangeType;
}

export function useInputs({ configs, inputs, onChange }: UseInputs) {
  const [res, setRes] = useState<(JSX.Element | undefined)[]>([]);
  const { selectValueById } = useAppSelector();

  const createInputs = useCallback(() => (input: ConfigType | OptionType) => {
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
  }, [inputs, onChange, selectValueById]);

  useEffect(() => {
    if (configs) setRes(configs.map(createInputs()))
  }, [configs, createInputs]);

  return res
}
