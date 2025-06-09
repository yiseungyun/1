## 💥 문제

```typescript
type Response =
  | { status: "success"; data: string }
  | { status: "error"; error: string }
  | { status: "timeout" };

function handleResponse(res: Response) {
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

- handleResponse 함수는 Response 타입의 매개변수가 들어온다.
- Response는 status가 success, error, timeout로 3가지가 있다.
- timeout 상태 처리가 누락되어 있어 switch 문에서 모든 케이스를 빠짐없이 처리하고 있지 않다.
- Response 타입이 변경되더라도 놓친 케이스가 있을 때 컴파일 타임에 오류를 발생시켜 놓친 상태를 바로 알 수 있게 해야한다.