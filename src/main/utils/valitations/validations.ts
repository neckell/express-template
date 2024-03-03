export const isNullOrEmpty = (value: any) =>
  value === null ||
  value === '' ||
  value === undefined ||
  value === 'undefined' ||
  (Array.isArray(value) && value.length === 0) ||
  (Object.getPrototypeOf(value) === Object.prototype && Object.keys(value).length === 0)
