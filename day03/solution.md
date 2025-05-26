## 📝 문제 분석
```typescript
function wrapInArray(value: any): any[] {
  return [value];
}

const numberArray = wrapInArray(123);  
const stringArray = wrapInArray("hello");  
 
const first = numberArray[0].toFixed();
```

### 👀 코드 이해 
- `wrapInArray` 함수는 매개변수 value를 받아 배열로 감싸주는 함수다.
- 위 코드에서는 `wrapInArray`로 전달되는 매개변수의 타입은 숫자와 문자열이 있다.
- numberArray 변수는 123 숫자를 wrapInArray를 사용해 [123]으로 변경한 값이 저장된다.
- first 변수는 numberArray인 [123] 배열의 0번째 인덱스 값을 toFixed()를 통해 문자열로 변경한다.

### 💥 문제 정의
**wrapInArray 함수로 들어올 수 있는 매개변수의 타입은 any다.**

- wrapInArray 함수의 매개변수와 리턴 타입 모두 any로 지정되어 타입 검사를 하지 않게 된다. 
- toFixed()는 숫자인 값을 문자열로 변환해주는데, 만약 wrapInArray가 반환하는 값이 ["hello"]라면 "hello".toFixed()를 호출하게 된다.
- `stringArray[0].toFixed()`를 호출하면 런타임 오류가 발생하는데, 타입 추론이 안 되기 때문에 타입 추론이 가능하게 수정해야한다.

**제네릭을 사용하여 현재 매개변수의 타입을 전달할 수 있다.**

```typescript
function wrapInArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

const numberArray = wrapInArray<number>(123);
const stringArray = wrapInArray<string>("hello");
```

- `wrapInArray` 함수는 매개변수로 전달되는 value를 배열 형태로 바꿔주기 때문에, 배열이 매개변수로 전달되는지 그냥 값이 전달되는지도 확인해야한다.
- 제네릭을 사용해 다양한 타입에서 사용할 수 있게 한다.

**타입스크립트는 대부분 자동 추론을 해준다.**

```typescript
const numberArray = wrapInArray(123);
const stringArray = wrapInArray("hello");
```

함수 호출 시에 타입을 별도로 명시해주지 않아도 123, "hello"의 타입이 무엇인지 자동으로 추론해준다.

**변경된 부분**

> `numberArray[0].toFixed();`는 정상적으로 동작하지만, stringArray[0]에서 toFixed()를 호출하면 숫자가 아니기에 런타임 오류가 발생한다. any로 value 타입을 지정해 타입 추론이 되지 않아 코드를 실행해야만 오류를 확인할 수 있었다.

- 제네릭을 사용해 어떤 타입이든 value로 전달하며, 자동 추론이 가능하게 했다.
- 배열로 만드는 함수이기 때문에 배열이 들어오는지도 검사하도록 했다.
- 타입 추론이 가능해지면서, toFixed()를 호출할 때도 타입이 number가 아니면 바로 오류를 확인할 수 있다.

---

## 🪴 학습 정리

### 제네릭
> 제네릭(Generic)은 함수, 클래스, 인터페이스, 타입에서 타입을 변수처럼 다룰 수 있는 문법이다. 정해진 타입이 아닌, 호출 시점에서 타입을 전달받아 그 타입을 그대로 사용하게 해준다.

```typescript
function example<T>(value: T): T {
  return value;
}

example<number>(123);     
example<string>("hello");
```

- example 함수의 매개변수 타입을 지정해두지 않는다.
- example 함수를 호출할 때 타입을 전달하여, 해당 타입을 사용할 수 있게 한다.

**제네릭을 사용하는 이유**
- any를 사용하지 않고도 다양한 타입을 안전하게 다룰 수 있다.
- 같은 로직을 다양한 타입에 재사용할 수 있다.
- 전달된 타입을 기반으로 반환 타입도 자동으로 추론된다.
- any는 타입 검사를 포기하지만, 제네릭은 타입을 유지한 채 유연하게 동작한다.

**타입 제약 없는 제네릭은?**

> 제네릭은 기본적으로 타입을 외부로부터 주입받아 사용한다. 타입 제약 없이 사용되면 타입 안정성을 거의 확보하지 못한다.

```typescript
function logValue<T>(value: T) {
  console.log(value.length);
}
```

- `logValue` 함수의 매개변수로 어떤 타입이든 사용할 수 있다.
- 어떤 타입이 들어올지 모르는데 length 속성에 접근하기 때문에 문제가 발생할 수 있다.

> 위 문제를 해결하기 위해 타입에 제약 조건을 사용하여 해결해줄 수 있다.

### extends 제약 조건
> 제네릭 T가 특정 타입을 확장하도록 강제할 수 있다. T는 반드시 정해진 타입이거나 그 하위 타입이어야한다.

```typescript
function logValue<T extends { length: number }>(value: T): number {
  return value.length;
}
```

- `logValue` 함수는 제네릭을 사용하지만, 매개변수 value가 length 속성을 포함하는 타입이 아니라면 문제가 생긴다.
- T가 반드시 length 속성을 가져야하는 것을 extends로 제한한다.
- 위와 같이 제약 조건을 통해 string, array 등 length를 가지는 타입만 매개변수로 전달된다.
