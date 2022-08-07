import { HTMLInputTypeAttribute, Reducer } from "react";

export enum AppStrAction {
  SetAppState = "SetAppState",
  OnChange = "OnChange",
}

export interface OptionType {
  buttons: { title: string }[];
  formTitle: string;
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
  itemId?: string;
  type: HTMLInputTypeAttribute;
  value?: string;
  checked?: boolean;
}

export interface ConfigType {
  itemId: string;
  label: string;
  type: HTMLInputTypeAttribute;
  value?: string;
}

export interface AppState {
  inputs: Input[];
  configs: ConfigType[] | null;
  options: OptionType | null;
  error: null | string;
}

export const initialAppState: AppState = {
  inputs: [
    {
      itemId: "config",
      type: "textarea",
      value: `[
    {
       "label":"count",
       "type":"number"
    },
    {
       "label":"is checked",
       "type":"checkbox"
    },
    {
       "label":"caption",
       "type":"text"
    },
    {
       "label":"description",
       "type":"textarea"
    },
    {
      "itemId": "1",
      "label": "radio1",
      "type": "radio",
      "value": "radio1"
    },
    {
      "itemId": "1",
      "label": "radio2",
      "type": "radio",
      "value": "radio2"
    },
    {
      "itemId": "2",
      "label": "radio3",
      "type": "radio",
      "value": "radio3"
    },
    {
      "itemId": "2",
      "label": "radio4",
      "type": "radio",
      "value": "radio4"
    },
    {
      "label": "Date",
      "type": "date"
    },
    {
      "buttons": [{"title": "Ok"}, {"title": "Cancel"}, {"title": "Apply"}],
      "formTitle": "form title"
   }
  ]`,
    },
  ],
  configs: null,
  options: null,
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
      const { itemId, value, checked, type } = action.payload;
      if (state.inputs.some((input) => input.itemId === itemId)) {
        return {
          ...state,
          inputs: state.inputs.map((input) => {
            if (input.itemId === itemId) {
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
