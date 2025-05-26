function wrapInArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

const numberArray = wrapInArray(123);
const stringArray = wrapInArray("hello");

const first = numberArray[0].toFixed();