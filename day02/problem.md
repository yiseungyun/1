## 💥 문제

```typescript
function processData(data: any) {
  return data.map((item: any) => {
    return item.value;
  });
}

const result = processData([
  { value: 10 },
  { value: 20 },
  { value: 30 },
]);

console.log(result); // [10, 20, 30]
```

- any 타입이 남용되고 있어 타입스크립트를 쓰는 이점이 사라지고 있다.
- data 매개변수와 item의 타입을 구체적으로 명시해야 한다.
- processData 함수가 어떤 타입의 인자를 받아 어떤 타입을 반환하는지 함수 전체의 타입을 설계해봐야한다.
- value가 없는 요소가 들어올 경우를 고려한다면 어떻게 방어할 수 있을지도 고민해보면 좋다.