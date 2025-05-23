## 📝 문제 분석

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

### 👀 코드 이해 

- `processData` 함수는 data를 전달받으면, data를 순회하며 해당 데이터의 value 속성을 반환하는 함수다.
- data의 타입은 any이고, data 중 하나인 item의 속성도 any다.
- `processData`를 호출하는 부분을 보면 매개변수로 value 속성을 가지는 객체들로 이루어진 배열을 전달한다.
- `processData`는 배열을 순회하며 배열의 요소가 가지는 value 값을 출력해준다.

### 💥 문제 정의
**data의 타입이 any라 데이터는 어떤 타입이라도 들어올 수 있다.**

> data는 value 속성을 포함하는 객체 배열이라면 `processData` 함수는 잘 동작하지만, 만약 그렇지 않은 타입의 데이터가 들어오게 되면 해당 함수는 문제가 생긴다.

예를 들어 `processData`에 [{value: 10}, {}] 배열을 전달하면 2번째 아이템은 value 속성이 없어서 접근할 수 없게 된다.

**data로 들어갈 수 있는 타입을 명확하게 정의한다.**

```typescript
function processData(data: any) {
  return data.map((item: any) => {
    return item.value;
  });
}
```

- 전달되는 데이터는 위 코드에서 `[{ value: 10 }, { value: 20 }, { value: 30 }]`이므로 이에 맞춰 타입을 설계한다.
- 해당 배열을 순회하며 item에 접근할 때도 any로 정의해줬으므로 item의 타입도 명확하게 정의해준다.

```typescript
interface Data {
  value: number
}

function processData(data: Data[]) {
  return data.map((item) => item.value);
}
```

- value 속성을 가진 객체 배열이 전달되므로 Data[]와 같이 타입을 명시하면 된다.
- data를 순회할 때 item에 any로 타입을 명시해주었는데, data에 타입을 명확히 명시하였기 때문에 item은 Data라고 자동 추론이 되어 타입스크립트가 알아서 타입 검사를 해주게 된다.

**코드 이해를 위해 리턴 타입도 명시해준다.**
> 리턴 타입을 명시하지 않아도 타입스크립트에서 별도의 에러는 발생하지 않는다. 그러나 리턴 타입을 명시하면 다른 사람이 함수를 보고 어떤 타입을 반환하는지 바로 알 수 있으므로 추가해두면 코드 이해에 도움이 된다.

```typescript
function processData(data: Data[]): number[] {
  return data.map((item) => item.value);
}
```

**외부에서 들어온다면 value 속성이 없는 데이터가 들어오는 경우가 있다.**
> 개발하며 함수를 사용하는 사람이 value 속성을 넣은 채로 항상 보낸다면, 위 수정 코드는 문제가 없다. 그러나 이 함수에 전달되는 데이터가 외부에서 들어오는 경우라면, value 속성이 없이 전달될 때 어떻게 처리해야할지 고민해야한다.

Data[]로 data 타입을 정의하는 것은 항상 이러한 데이터 형식이 들어올 거라는 `낙관적인 가정`이다. 

```typescript
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
``` 

- `isValidData` 함수는 data: unknown으로 설정되어있는데, 타입스크립트는 data를 unknown으로 판단한다.
- `data is Data[]`로 리턴 타입을 명시해주면, data를 Data[]로 판단할 수 있다.
  - 즉, 함수가 true를 반환하면 타입스크립트는 data를 Data[] 타입으로 간주해도 된다는 뜻이다.
  - `isValidData` 함수는 boolean을 반환하지만, data is Data[]를 명시하게 되면 data가 Data[] 타입이라는 사실을 보장하는 것을 추론할 수 있다.

> `타입 가드`를 이용해서 타입스크립트가 타입을 좁혀 추론할 수 있다. 함수의 리턴 타입에 특정 값을 원하는 타입으로 작성하면, 해당 함수가 true를 반환할 때 해당 타입으로 추론할 수 있게 해준다.

**변경된 부분**

> 기존 코드에서는 any 타입을 사용해 어떤 형식의 데이터가 들어와도 일관되게 처리했다. 그렇기 때문에 value 속성이 없는 데이터가 들어오게 되면 문제가 발생할 수 있었다.

- data가 value 속성을 가지는 것을 타입으로 정의하고, item에는 별도로 타입을 정의하지 않아도 추론이 가능하게 했다.
- 더 나아가 외부에서 데이터가 들어오게 되면 value 속성이 항상 있다는 것을 보장할 수 없기 때문에, 이러한 점을 고려해서 data 타입을 `unknown`으로 지정했다.
  - unknown으로 지정하면 타입스크립트는 해당 값의 형태를 알 수 없다고 판단하기 때문에, 사용하기 전 타입 검사를 해야한다.
  - `isValidData` 함수를 통해 사용자 정의 타입 가드를 사용하여 데이터가 예상한 구조인지 확인해서 타입을 좁힌다.

---

## 🪴 학습 정리

### any와 unknown의 차이

**any**
> any는 모든 타입을 허용하는 것으로, `타입 검사를 생략`한다는 의미다.

- 타입 검사를 생략하기 때문에, 완전히 타입 검사를 생략한다.
- 타입스크립트는 아무런 타입 추론을 하지 않는다.

```typescript
function logLength(data: any) {
  console.log(data.length);
}

logLength(123);
```

- 위 코드에서 `logLength` 함수는 매개변수 data의 length 속성을 출력한다.
- 그러나 data의 타입이 any로 지정되어 타입 검사를 하지 않기 때문에 컴파일 시점에 타입 검사를 하지 않는다.
- 매개변수 data가 length 속성을 가지지 않는다면, 런타임 오류가 발생하게 된다.

**unknown**
> unknown은 모든 타입을 수용하는 것으로, `정확한 타입을 알 수 없다`는 의미다.

- 사용 전 타입 검사가 필요하다.
- 타입 가드를 이용해 타입을 좁히면 타입 추론이 가능해진다.

unknown은 직접 사용이 불가능하고, 타입 체크 후에만 접근이 가능하기 때문에 타입 안정성이 유지된다.

```typescript
function logLength(data: unknown) {
  if (typeof data === "string" || Array.isArray(data)) {
    console.log(data.length);
  } else {
    console.log("잘못된 데이터 타입");
  }
}

logLength(123);
```

- data를 any로 지정해주었을 때는 컴파일 시점에 오류를 찾지 못하여 런타임 오류가 발생했다.
- data를 unknown으로 지정하고, data가 string이거나 배열이라면 length를 출력할 수 있게 했다.

> 위 코드에서 data를 `unknown`으로 지정해주었는데, `any`로 지정해도 동작은 할 수 있다. 그러나 any를 사용하면 더 이상 타입 체크를 안하기 때문에 타입 체크를 하지 않았을 때도 오류가 발생할 수 있는 것을 알아차릴 수 없게 된다. 

### 타입 가드
> 타입 가드란 런타임에 어떤 값의 타입을 체크하여, 그 이후 코드 블록에서 해당 값을 더 구체적인 타입으로 좁히는 방법이다. 즉, 어떤 값이 특정 타입임을 조건문으로 확인하면 그 블록 안에서는 해당 타입으로 간주할 수 있는 것이다.

**타입 가드가 필요한 이유**
- 변수 타입이 unknown, string | number와 같은 경우, 바로 사용할 수 없다.
- 타입을 안전하게 좁혀주어야한다.

**타입 가드 종류**

- `typeof` 연산자: typeof를 통해 타입이 어떤 타입인지 조건문으로 확인해 처리할 수 있다.
- `instanceof` 연산자: 클래스 기반 객체를 판별할 때 사용한다.
- `in` 연산자: 속성이 존재하는지 확인할 수 있다.
- `사용자 정의 타입 가드`: 직접 타입을 체크하고 추론한다.

**사용자 정의 타입 가드**
> 함수의 리턴 타입에 `parameter is Type` 형식을 사용하여, 조건이 참일 경우 그 값의 타입을 확정할 수 있도록 만드는 함수다. 

```typescript
function 함수(parameter: unknown): parameter is 원하는타입 {
  return true or false;
}
```

- 리턴 타입이 `parameter is Type`일 때, 함수가 true를 반환하면 타입스크립트는 이후 코드에서 parameter를 Type으로 간주한다.
- 반대로 false를 반환하면 조건문 바깥에서는 타입이 좁혀지지 않는다.

> **타입 가드를 통해 타입을 좁혀야하는 이유는?**
>
> 넓은 타입에서 더 구체적으로 타입을 확정지어 나가는 것이 타입을 좁히는 것이다. 타입을 좁히지 않으면 잘못된 사용이 일어나도 컴파일러가 이를 막아주지 못한다. 또한 타입을 좁히지 않으면 추론도 못하게 된다. 어떤 타입인지 명확하게 알려줘서 정확한 타입 정보에 기반한 안전한 코드를 만들어야한다.

