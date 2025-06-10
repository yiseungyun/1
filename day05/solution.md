## 📝 문제 분석

```typescript
type ApiResponse =
  | { status: "success", data: string }
  | { status: "error", error: string }
  | { status: "timeout" };

function handleResponse(res: ApiResponse) {
  switch (res.status) {
    case "success":
      console.log(res.data);
      break;
    case "error":
      console.log(res.error);
      break;
  } 
}
```

### 👀 코드 이해 
- `handleResponse` 함수의 매개변수는 `ApiResponse` 타입을 가진다.
- ApiResponse 타입은 status가 3가지가 들어올 수 있다.
  - success, error, timeout
- `handleResponse`는 status가 success, error일 때만 처리해준다.

### 💥 문제 정의
**ApiResponse에 정의된 status: timeout은 처리해주지 않고 있다.**
- ApiResponse에서 status는 3가지 종류가 있다.
  - handleResponse 함수는 status가 success, error일 때는 처리해준다.
  - status가 timeout일 때는 함수 내부의 switch 문에서 처리를 하고 있지 않다.
- status가 timeout일 때 처리해주지 않아도 컴파일 오류는 발생하지 않는다.

**handleResponse 함수에서 timeout 케이스도 처리해준다.**
```typescript
function handleResponse(res: ApiResponse) {
  switch (res.status) {
    case "success":
      console.log(res.data);
      break;
    case "error":
      console.log(res.error);
      break;
    case "timeout":
      console.log("Request timed out");
      break;
  } 
}
```

- timeout 케이스도 추가해서 처리해준다.

> 타입스크립트는 switch 문에서 모든 유니온 타입 멤버를 처리했는지 자동으로 검사하지 않기 때문에, status가 timeout일 때 처리를 해주지 않아도 컴파일 에러가 발생하지 않는다.

**never 타입을 통해 체크를 해야한다.**
> switch 문의 완전성을 강제하지 않아 컴파일 에러가 발생하지 않는다. 어떤 타입을 놓치고 있는지 타입스크립트에서 알 수 없기 때문에 `never` 타입으로 체크해야 한다.

```typescript
default:
  const _exhaustive: never = res;
  return _exhaustive;
```

- `_exhaustive`의 타입을 `never`로 지정한다.
- 위 문제에서 status가 success, error, timeout 3가지를 처리해주도록 수정했다.
  - 그러나 status가 추가되거나 하는 경우 컴파일 시점에 에러를 잡을 수 있어야한다.
  - 해당 에러를 잡기 위해 `_exhaustive` 타입을 `never`로 지정한다.
  - 처리되지 않은 케이스일 경우 res가 `_exhaustive`에 할당되며 `_exhaustive`의 타입은 `never`기 때문에 컴파일 에러가 발생한다.

> status 종류별로 처리해주고 있다면 switch 문의 default 분기는 실행되지 않는다. 그러나 특정 status를 처리해주지 않으면 default 분기가 실행되고 never 타입으로 지정한 _exhaustive에 res가 할당된다. never 변수에는 어떤 값도 할당되면 안되기 때문에 default가 실행되면 타입 오류가 발생하게 된다.

**변경된 부분**

> ApiResponse 타입이 가질 수 있는 모든 status에 대해 switch 문에서 처리를 해주지 않고 있었다. 그러나 컴파일 시점에서 오류를 잡아낼 수 없었다. 

- status가 timeout일 때를 처리하여 `모든 가능한 status 케이스`에 대해 처리해주었다.
- switch 문의 default를 추가하여 `예상하지 못한 타입`이 들어오게 되면 처리할 수 있게 했다.
  - default 분기에서 _exhaustive를 `never` 타입으로 지정하여, 처리되지 않은 케이스가 있을 때 에러를 발생시킨다.
  - never 타입의 변수는 어떤 값도 할당되면 안되기 때문에 타입 오류를 발생시킨다.
  - default 문을 통해 처리해주지 않은 status가 있는지 확인한다.

---

## 🪴 학습 정리

### never
> `never`는 어떤 값도 할당될 수 없는 타입이다. 무언가 할당되면 타입 에러가 발생한다.

```typescript
function throwError(): never {
  throw new Error("에러 발생");
}
```

- 이 함수는 항상 예외를 던지는 함수이기 때문에 정상적으로 값을 반환하지 않는다.
- 반환 타입을 `never`로 정의하게 된다.

**never를 사용하는 이유**
- 모든 가능한 케이스를 다 처리했는지 검사할 때 사용한다.
- 처리하지 않는 경우가 있으면, 컴파일러가 오류를 발생시켜 미처리 케이스를 알아차리게 도와준다.

> never는 해당 코드에 도달하면 안된다는 것을 컴파일 시점에 체크하기 위해 사용한다. 타입 안전성과 버그 방지 목적으로 중요한 역할을 한다.

**never와 null은 무엇이 다를까?**
- `never`는 절대 할당되어서는 안되고, 런타임에 등장해서는 안되는 타입이다.
- `null`은 실제 할당 가능한 값이고, 런타임에서도 존재한다.


### Exhaustiveness Check
> `Exhaustiveness Check`는 모든 가능한 케이스를 다 다뤘는지 검사하는 것이다. 즉, 모든 유니온 멤버를 다 처리해주지 않으면 컴파일 에러를 만들 수 있는 매커니즘이다.

```typescript
type ApiResponse =
  | { status: "success", data: string }
  | { status: "error", error: string }
  | { status: "timeout" };

function handleResponse(res: ApiResponse) {
  switch (res.status) {
    case "success":
      console.log(res.data);
      break;
    case "error":
      console.log(res.error);
      break;
  }
}
```

- handleResponse 함수의 매개변수로 들어오는 타입은 Response로 정의되어있다.
- status가 timeout이 들어올 수 있는데, 함수에서 처리해주고 있지 않다.
- timeout 케이스를 빠뜨렸지만 컴파일러는 에러를 내지 않는다.
- 이를 방지하기 위해 default 분기에서 never 체크를 한다.

```typescript
default:
  const _exhaustive: never = res;
  return _exhaustive;
```

- timeout 케이스를 처리하지 않았을 때, 컴파일러가 경고를 준다.
- timeout 케이스 뿐만 아니라 switch 문에서 처리하지 않은 케이스가 전달되면, default에서 오류가 발생한다.