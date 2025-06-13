function getLength(input: string): number;
function getLength(input: string[]): number[];
function getLength(input: string | string[]) {
  if (typeof input === "string") {
    return input.length;
  } else {
    return input.map((s) => s.length);
  }
}

const a = getLength("hello");
const b = getLength(["hi", "world"]);