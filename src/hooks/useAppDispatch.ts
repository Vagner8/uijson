import { Dispatch, useMemo } from "react";
import { AppReducerActions, AppStrAction, OnChange } from "state";
import { SetAppState } from "../state";

export function useAppDispatch(appDispatch: Dispatch<AppReducerActions>) {
  return useMemo(
    () => ({
      setAppState(payload: SetAppState["payload"]) {
        appDispatch({ type: AppStrAction.SetAppState, payload });
      },

      onChange(payload: OnChange["payload"]) {
        appDispatch({ type: AppStrAction.OnChange, payload });
      },
    }),
    [appDispatch]
  );
}
