import { ConfigType, OptionType } from "state"

export const isString = (value?: string | boolean): value is string | undefined => {
  return typeof value === 'string'
}

export function isConfigType(obj: any): obj is ConfigType {
  return "label" in obj
}

export function isOptionType(obj: any): obj is OptionType {
  return "buttons" in obj
}