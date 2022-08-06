import { HTMLInputTypeAttribute, Reducer } from "react";

export enum AppStrAction {
  SetAppState = "SetAppState",
  OnChange = "OnChange",
}

export interface SetAppState {
  type: AppStrAction.SetAppState;
  payload: Partial<AppState>;
}

export interface OnChange {
  type: AppStrAction.OnChange;
  payload: Input;
}

interface Input {
  id: string;
  type: HTMLInputTypeAttribute;
  value?: string;
  checked?: boolean;
}

export interface ConfigType {
  itemId: string;
  label: string;
  type: HTMLInputTypeAttribute;
}

export interface AppState {
  inputs: Input[];
  configs: ConfigType[] | null;
  error: null | string;
}

export const initialAppState: AppState = {
  inputs: [],
  configs: null,
  error: null,
};

export type AppReducerActions = SetAppState | OnChange;

export const appReducer: Reducer<AppState, AppReducerActions> = (
  state,
  action
) => {
  switch (action.type) {
    case AppStrAction.SetAppState: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case AppStrAction.OnChange: {
      const { id, value, checked, type } = action.payload;
      if (state.inputs.some((input) => input.id === id)) {
        return {
          ...state,
          inputs: state.inputs.map((input) => {
            if (input.id === id) {
              if (type === "checkbox") {
                return {
                  ...input,
                  checked,
                };
              }
              return {
                ...input,
                value,
              };
            }
            return input;
          }),
        };
      }
      return {
        ...state,
        inputs: [...state.inputs, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};
