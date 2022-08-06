export const isString = (value?: string | boolean): value is string | undefined => {
  return typeof value === 'string'
}