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
