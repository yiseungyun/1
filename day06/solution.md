## 📝 문제 분석
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

### 👀 코드 이해 
- `getLength` 함수는 문자열과 문자열 배열을 받는다.
  - 문자열이면 문자열의 길이를 반환하고, 문자열 배열이면 문자열 배열에 있는 모든 문자열의 길이를 배열로 반환한다.
- input 타입이 string | string[] 유니온 타입으로 정의되어 있어 전체 리턴 타입은 nubmer | number[]로 통합해서 추론한다.

### 💥 문제 정의

**리턴 타입이 number | number[]로 통합해서 추론된다.**
- getLength 함수는 문자열이나 문자열 배열이 전달되기 때문에 number | number[]이 리턴 타입인 것은 맞다.
- 그러나 확실하게 문자열이 전달될 때는 리턴 타입이 number, 문자열 배열이 전달될 때는 number[]로 리턴 타입이 추론되지는 않는다.

> 만약 getLength 함수에 문자열 배열을 전달하여 number[] 타입의 반환 값을 받아도, 이 값은 배열이기 때문에 map 함수를 사용하려해도 타입 추론이 number | number[]로 되기 때문에 타입 오류가 발생하는 문제가 있다.

**함수 오버로드를 사용한다.**
> `함수 오버로드`는 다양한 입력 타입에 따라 다른 출력 타입을 가지도록 명시적으로 선언한다.

```typescript
function getLength(input: string): number;
function getLength(input: string[]): number[];
```
- getLength 함수 위에 input이 string일 때와 string[]일 때를 선언해준다.
- 이 코드는 선언부로 컴파일러에게 알려주는 정보이다.

```typescript
function getLength(input: string | string[]) {
  if (typeof input === "string") {
    return input.length;
  } else {
    return input.map((s) => s.length);
  }
}
```

**변경된 부분**

> getLength 함수에 전달되는 타입은 string | string[]으로 타입스크립트에서 리턴 타입을 number | number[]로 추론했다. 그러나 반환 받은 값이 배열일 때 map 함수를 호출하려고 해도, number | number[]로 추론하여 타입 오류가 발생하게 되는 문제가 있었다. 

- 함수 오버로드를 사용해 getLength에 전달되는 타입에 따라 리턴 타입을 알려준다.
  - getLength에 string 타입이 전달되면 리턴 타입은 number다.
  - getLength에 string[] 타입이 전달되면 리턴 타입은 number[]다.
- 리턴 타입을 명확하게 추론하기 때문에 getLength를 호출해서 반환 받은 값은 number일 때와 number[]일 때 각각 알맞게 처리해도 타입 오류가 발생하지 않는다.

---

## 🪴 학습 정리

### 함수 오버로드
> `함수 오버로드`는 함수가 다양한 입력 타입에 따라 다른 타입의 출력을 가지도록 명시적으로 선언하는 기능이다.

타입스크립트에서 함수 오버로드는 실제로 하나의 구현만 있고, 여러 개의 타입 시그니처를 위에 선언해서 타입 시스템이 더 잘 추론할 수 있게 한다.

**함수 오버로드를 명시적으로 작성하는 이유**
> 타입스크립트의 정적 타입 시스템은 선언만 보고 판단하기 때문에, string | string[]과 같이 포괄적인 유니온 타입만 보면, 리턴 타입도 포괄적으로 number | number[]로 추론한다.

타입스크립트는 코드를 실행하지 않고 타입을 추론해야하므로, 함수 내부에서 분기만으로 정확한 추론을 기대하기 어렵다.

**오버로드 시그니처 순서**
> 시그니처는 구체적인 타입에서 포괄적인 타입 순서로 선언해야한다.

```typescript
// 잘못된 예시
function example(x: string | number): void;
function example(x: string): void; // 해당 선언은 무시

// 올바른 예시
function example(x: string): void;
function example(x: string | number): void;
```

오버로드는 처음 선언된 것부터 위에서 아래로 검사하므로, 너무 포괄적인 타입이 위에 있으면 나머지가 무시된다.

**오버로드가 필요한 경우**
- 입력값에 따라 반환 타입이 다른 경우
- 반환값을 기반으로 메서드 체이닝할 때
- 입력/출력 타입 간의 명확한 대응 관계가 있을 때
