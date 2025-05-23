interface Data {
  value: number
}

function isValidData(data: unknown): data is Data[] {
  return (
    Array.isArray(data) &&
    data.every(
      item =>
        typeof item === "object" && item !== null &&
        "value" in item &&
        typeof (item as any).value === "number")
  );
}

function processData(data: unknown) {
  if (isValidData(data)) {
    return data.map((item) => item.value);
  }

  return [];
}

const result = processData([
  { value: 10 },
  { value: 20 },
  { value: 30 },
]);

console.log(result); // [10, 20, 30]