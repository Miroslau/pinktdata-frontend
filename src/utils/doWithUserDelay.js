export function doWithUserDelay(callback, field, delay = 500) {
  if (field) {
    clearTimeout(field);
  }
  return setTimeout(callback, delay);
}
