## 💥 문제

```typescript
type User = {
  id: number;
  name: string;
  email?: string;
};

function freezeUser(user: User): Readonly<User> {
  return Object.freeze(user);
}

const user = freezeUser({ id: 1, name: "Alice" });

user.name = "Bob";
```

- Readonly<User>를 사용하여 객체 속성을 읽기 전용으로 만들었지만, user.name에 값을 넣을 때 오류가 발생하지 않는다.
- user.name = "Bob"을 실행할 때 정상적으로 오류가 발생해야한다.
- User 타입에서 email 속성만 뽑아 새로운 타입인 UserContact를 만들어야한다.
- User 타입의 key를 기반으로 각 필드 존재 여부를 Boolean으로 매핑하는 타입 UserFieldFlags를 만들어야한다.
