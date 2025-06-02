## 📝 문제 분석
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

### 👀 코드 이해 
- `updateUser` 함수는 기존의 유저 정보를 업데이트하는 역할을 한다.
- 업데이트하는 항목은 updates 매개 변수로 전달되고, name, email, phone 속성이 들어올 수 있다.

### 💥 문제 정의
**User 타입이 변경되면 updates 타입도 바꿔야하는 문제가 있다.**
> User의 일부 속성을 업데이트하기 때문에, User의 속성을 업데이트하기 위해 전달하는 updates의 타입을 기존 User 타입을 바탕으로 생성된 재사용 가능한 타입을 사용하는 것이 좋다.

**기존 타입을 재사용하기 위해 Pick을 사용한다.**

`Pick<T, K>`: 특정 속성만 선택해서 새로운 타입 만들기
- Pick은 T 타입에서 K에 명시된 속성만 추출해서 새로운 타입을 만든다.
- T: 원본 타입, K: 가져올 속성 이름

```typescript
type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
};

type ContactInfo = Pick<User, "email" | "phone">;
```

- User 타입에서 email, phone 속성만 선택해서 새로운 타입을 만든다.
- 유저의 전체 정보가 필요없고, 연락처 정보만 추출한다.

**기존 타입을 재사용하되 속성을 옵셔널로 바꾸기 위해 Partial를 사용한다.**

`Partial<T>`: 모든 속성을 옵셔널로 바꾸기
- Partial은 T 타입의 모든 속성을 선택적으로 만든다.
- 모든 속성에 ?가 붙는다.

**Pick, Partial를 사용해 updates 타입을 개선한다.**

```typescript
type UpdateUser = Partial<Pick<User, "name" | "email" | "phone">>;
```
- User 타입의 name, email, phone 속성을 Pick을 통해 가져온다.
- 3가지 속성을 전부 변경할 수도 있지만 이 중 하나만 선택할 수 있으므로 옵셔널로 지정하기 위해 Partial를 사용한다.

**Pick 대신 Omit을 사용할 수 있다.**
> Pick은 타입에서 특정 속성을 고르는 것이라면, Omit은 타입에서 특정 속성을 제외하고 가져온다.

User 정보에서 id 속성만 제외하고 업데이트한다면 Omit으로 더 간단하게 사용할 수 있다.
```typescript
type UpdateUser = Partial<Omit<User, "id">>;
```

**변경된 부분**
> User 타입의 일부 속성을 변경하는 함수에서 변경하는 부분을 전달하는 변수인 updates의 타입을 하드코딩으로 정의했다. User 타입이 변경되는 경우 해당 타입도 변경해야하는 번거로움이 존재했다.

- 기존 User 타입을 활용하여 Partial + Pick이나 Partial + Omit으로 타입을 재사용하였다. 
- 원본 타입이 변경되어도 자동으로 반영될 수 있도록 하여 유지보수성을 개선하였다.
- Partial를 사용해 일부 필드만 선택적으로 업데이트할 수 있도록 하여, 함수 사용의 유연성을 확보했다.

---

## 🪴 학습 정리

### Partial<T>
> T 타입의 모든 속성을 선택적으로 만든다.

**Partial를 사용하는 경우**
- 객체의 일부만 업데이트할 경우
- 기본값이 있고 선택적으로 전달되는 객체를 받을 때
- 예) PATCH API, 선택적 폼 데이터

### Pick<T, K>
> T 타입에서 특정 속성 K만 선택하여 새로운 타입을 만든다.

**Pick을 사용하는 경우**
- 특정 필드만 명시적으로 사용하는 타입이 필요할 때
- 전체 타입이 크거나 민감할 때, 필요한 필드만 추출해서 사용
- 예) 일부 필드 공개 or 필요

### Omit<T, K>
> T 타입에서 특정 속성 K를 제외한 나머지로 구성된 타입을 만든다.

**Omit을 사용하는 경우**
- 어떤 필드는 제외하고 나머지를 그대로 사용하고 싶을 때
- 예) 생성용 객체에서 id, timestamp를 제거

