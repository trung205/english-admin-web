export function cleanObject<T>(obj: T, interfaceRef: T): T {
  const interfaceProperties = Object.keys(interfaceRef) as Array<keyof T>;
  const objectProperties = Object.keys(obj) as Array<keyof T>;

  objectProperties.forEach((property) => {
    if (!interfaceProperties.includes(property)) {
      delete obj[property];
    }
  });

  return obj;
}

export function debounce (fn: any, time: any) {
  let timeoutId: any
  return wrapper
  function wrapper (...args: any) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = null
      fn(...args)
    }, time)
  }
}