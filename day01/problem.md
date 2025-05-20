## 💥 문제
```typescript
type User = {
  id?: number;
  name?: string;
  nickname?: string;
  email?: string;
  loginType?: "social" | "guest" | "normal";
};

function getUserDisplayName(user: User) {
  return user.nickname || user.name || "Anonymous";
}

const user1: User = {
  loginType: "normal",
  name: "Alice",
};

const user2: User = {
  loginType: "guest",
};

console.log(getUserDisplayName(user1)); // "Alice"
console.log(getUserDisplayName(user2)); // "Anonymous"
```
 
- 위 코드는 다양한 로그인 유형(normal, social, guest)의 유저 데이터를 처리한다.
- 하지만 User 타입 정의 방식에 근본적인 문제가 있다.
- 요구사항에 맞게 타입을 개선하여 각 로그인 방식에 따라 필요한 유저 정보가 달라지는 구조를 반영해야한다.
- getUserDisplayName 함수는 타입 안전하게 동작해야 한다.