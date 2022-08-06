import { useMemo } from "react";
import { AppState } from "state";

export function useAppSelector() {
  return useMemo(
    () => ({
      selectValueById(id: string, inputs: AppState["inputs"]) {
        const input = inputs?.find((input) => input.id === id);
        return input?.value || input?.checked
      },
    }),
    []
  );
}
