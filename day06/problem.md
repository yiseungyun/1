## 💥 문제

```typescript
function getLength(input: string | string[]) {
  if (typeof input === "string") {
    return input.length;
  } else {
    return input.map((s) => s.length);
  }
}

const a = getLength("hello"); 
const b = getLength(["hi", "world"]);
```

- getLength의 매개변수 input은 string | string[] 타입을 가진다.
- getLength를 호출해서 변수 a, b에 할당할 때 타입을 number | number[]으로 추론한다.
- 타입스크립트에서 input의 유니온 타입만 보고 전체 리턴 타입을 추론하게 되어 잘못된 추론을 하고 있다.
- string이 전달되면 해당 문자열 길이를 반환하고, string[]이 전달되면 배열에 있는 문자열의 길이를 배열로 저장해서 반환하기 때문에 이에 맞는 타입으로 추론되어야한다.