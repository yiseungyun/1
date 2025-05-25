## 💥 문제
```typescript
function wrapInArray(value: any): any[] {
  return [value];
}

const numberArray = wrapInArray(123);  
const stringArray = wrapInArray("hello");  
 
const first = numberArray[0].toFixed();
```

- 매개변수 value 타입을 기반으로 반환 타입도 자동으로 결정되게 한다.
- wrapInArray를 다양한 타입으로 테스트할 수 있어야한다.
- numberArray[0]의 타입이 number로 추론되어 .toFixed()가 오류없이 동작해야 한다.