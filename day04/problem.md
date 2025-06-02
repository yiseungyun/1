## 💥 문제

```typescript
type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
};

function updateUser(user: User, updates: { name?: string; email?: string; phone?: string }) {
  return { ...user, ...updates };
}
```

- updateUser 함수에서 updates의 타입 정의를 직접 작성하는 것이 아닌, User 타입을 바탕으로 재사용 가능한 타입을 사용해야한다.
- 업데이트할 수 있는 속성은 모든 속성이 아닌 name, email, phone 속성만 가능하다.
- User 속성을 업데이트하는 함수이므로, User 타입이 바뀌면 updates 타입도 같이 바꿔야하는 문제가 있다.