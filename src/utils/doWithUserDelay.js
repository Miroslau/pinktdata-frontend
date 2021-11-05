export function doWithUserDelay(callback, field, delay = 300) {
  if (field) {
    clearTimeout(field);
  }
  return setTimeout(callback, delay);
}
