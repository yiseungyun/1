## 📝 문제 분석
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
### 👀 코드 이해 
- `getUserDisplayName` 함수는 user를 전달하면 user의 닉네임, 이름을 return 하고, 만약 둘 다 없다면 "Anonymous"를 반환한다.
- `User`는 id, name, nickname, email, loginType를 가지지만, 모두 옵셔널로 정의되어 해당 속성이 있을 수도 있고 없을 수도 있다.
- user1은 일반 로그인을 한 유저로 loginType, name 속성만 가진다.
- user2는 게스트 로그인을 한 유저로 loginType 속성만 가진다.
- user1, user2는 User라는 타입으로 정의되고, getUserDisplayName의 매개변수로 둘 다 전달되어 호출되고 있다.
  - user1은 name 속성이 있기 때문에 name이 출력된다.
  - user2는 name 속성이 없기 때문에 Anonymous로 출력된다.

### 💥 문제 정의
**User 타입의 모든 속성이 옵셔널인 문제가 있다.**

> User 타입의 속성 모두가 있을 수 있고, 없을 수도 있다. 이렇게 되면 예상치 못한 유저 정보가 들어올 때의 케이스를 명확히 표현하지 못한다.

**loginType 별로 유저를 다시 정의한다.**

- `social`: 소셜 로그인을 했을 때 타입으로 위 코드에 나와있지 않다. 그러나 loginType과 email 주소를 가진다고 가정한다.
- `guest`: 게스트 로그인을 했을 때 타입으로, user2가 이에 해당한다. 해당 유저는 loginType 속성만 가지므로 해당 속성에 대해서만 정의해준다.
- `normal`: 일반 로그인을 했을 때 타입으로, user1가 이에 해당한다. 해당 유저는 loginType과 name 속성을 가지므로 이 두 속성을 정의해준다.
- 세 가지 유저 모두 닉네임을 설정할 수 있다면 닉네임 속성을 옵셔널로 지정한다. (위 코드에서 닉네임이 들어오지 않는 경우가 있기 때문에 옵셔널로 정의하고, 추후 사용자가 닉네임 설정을 할 수 있게 한다.)

```typescript
interface SocialUser {
  loginType: "social";
  email: string;
  nickname?: string;
}

interface GuestUser {
  loginType: "guest";
  nickname?: string;
}

interface NormalUser {
  loginType: "normal";
  name: string;
  nickname?: string;
}

type User = SocialUser | GuestUser | NormalUser;
```

이와 같이 타입을 3가지로 분류하고 User라는 타입이 3가지 타입을 가질 수 있게 정의한다.

```typescript
// 기존의 getUserDisplayName 함수
function getUserDisplayName(user: User) {
  return user.nickname || user.name || "Anonymous";
}

// 수정된 getUserDisplayName 함수
function getUserDisplayName(user: User) {
  if (user.loginType === "guest") {
    return "Anonymous";
  }

  if (user.nickname) {
    return user.nickname;
  }

  if (user.loginType === "normal") {
    return user.name;
  }

  if (user.loginType === "social") {
    return user.email;
  }

  return "Anonymous";
}
```
- 수정된 `getUserDisplayName` 함수는 로그인 타입에 따라 유저의 이름을 어떻게 보여줄지 명확히 정의한다.
- 게스트 로그인의 경우 익명임을 나타내지만, 그게 아닌 닉네임이 설정된 경우라면 닉네임을 반환한다.
- 닉네임을 설정하지 않았다면 로그인 타입에 따라 name, email을 반환해주고, 예외가 생길 때는 익명으로 표시한다.

**변경된 부분**

> 기존 코드의 문제는 User 타입의 속성이 모두 옵셔널로 지정되어 예상치 못한 유저가 들어올 때 처리가 제대로 되지 않는 문제가 있었다. 

- `User` 타입을 3가지로 분리하여 각 로그인 타입에 따라 필요한 정보만 가지도록 설계했다.
- `getUserDisplayName` 함수는 loginType을 기준으로 분기하고 nickname이 설정되었다면 우선 반환하도록 했다.


---

## 🪴 학습 정리

### Narrowing(타입 좁히기)
> 조건문, 타입 가드 등을 이용해 `변수의 정확한 타입 범위를 좁히는 것`이다. 타입 범위를 좁혀 해당 타입에만 존재하는 속성 또는 메서드에 접근할 수 있도록 해준다.

- 유니온 타입을 사용하게 되면, 타입마다 가능한 속성이 다르게 된다.
  - 위 코드에서도 `type User = SocialUser | GuestUser | NormalUser;` 이렇게 유저가 3가지 타입으로 정의된다. 
  - 3가지 타입은 각각 속성이 다르기 때문에 타입스크립트는 어떤 타입인지 알 수 없다.
- 타입스크립트는 유니온 타입 중 어떤 타입인지 모르기 때문에 속성 접근을 막게 된다.
  - Narrowing을 통해 타입을 좁혀준다.

**Narrowing 방법**
|방법|설명|예시|
|:-:|:-:|:-:|
|typeof|기본 타입 구분|typeof x === "string"|
|in 연산자|객체 속성 존재 여부 체크|"name" in user|
|instanceof|클래스 인스턴스 체크|x instance of Date|
|Discriminated Union|공통된 식별자를 기준으로 타입을 좁힘|user.loginType === "guest"|
|사용자 정의 타입 가드|타입을 직접 체크하는 함수 정의|isGuestUser(user): user is GuestUser|

**Narrowing이 중요한 이유**
- 유니온 타입의 안전한 사용을 보장한다.
- 잘못된 속성 접근을 사전에 방지한다.
- 타입별로 다른 처리를 명확하게 할 수 있다.

### 옵셔널 속성 최소화의 중요성
> 옵셔널 속성은 속성 이름 뒤에 `?`를 붙이면 해당 속성은 있어도 되고 없어도 되는 값으로 간주된다. 

**옵셔널이 필요한 이유**
- 점진적 정보 
  - 객체가 생성되는 초기 단계에서 모든 속성이 존재하지 않을 수 있다.
  - 이후 추가되는 속성을 관리할 때 옵셔널로 표시할 수 있다.
- 조건부 속성
  - 어떤 상황에서만 존재하는 값이 있을 수 있다.
- 외부 API에 유연한 대응
  - 외부 API로부터 응답 받을 때 필드가 항상 존재하지 않을 수 있다.
  - 일부 피드가 누락될 수 있기 때문에 누락될 수 있는 필드를 옵셔널로 표시할 수 있다.

**옵셔널 속성의 문제점**
- 모든 속성을 옵셔널로 지정하게 되면 타입스크립트의 의미가 약화된다.
  - 모든 속성이 없어도 되기 때문에 빈 객체도 가능해진다.
  - 타입을 검사하는 의미가 사라지고, 타입이 무슨 의미인지 파악하기 어려워진다.
- 런타임 오류 가능성이 증가한다.
  - 옵셔널로 지정된 속성이 있는데, 해당 속성이 들어오지 않는 경우인데 값에 접근해 조작하면 에러가 발생한다.
  - 옵셔널 체이닝이나 속성이 없을 때 기본 값을 지정하는 방식으로 신경써야한다.
- Narrowing이 반복된다.
  - 옵셔널이 많아지면 코드 곳곳에서 타입 체크를 자주 사용해야한다.

**옵셔널 잘 설계하기**
- 값이 논리적으로 필수라면 `?`를 붙이지 않고 필수 속성으로 표시한다.
- 값이 일시적으로 없을 수 있다면, 옵셔널로 지정한다.
- 옵셔널이 아닌 유니온 타입과 Discriminated Union으로 대체 가능하다.
  - 위 문제에서처럼 로그인 타입에 따라 속성 존재 유무가 달라진다면, 옵셔널보다 `타입 분리`가 더 안전하고 명확하다.
- `Partial<T>`를 남용하지 않는다.
  - Partial를 사용하면 모든 속성이 옵셔널 된다.
  - Partial를 업데이트용 객체와 같은 특정 목적에서만 사용한다.
  - 예를 들어 특정 객체 타입을 `Partion<User>`로 설정하면 User 객체의 속성이 옵셔널로 설정된다. 그렇기 때문에 이 타입은 User 타입을 가지는 객체에서 특정 속성을 수정하는 경우에 사용되는 특수한 목적 외에는 사용을 지양한다.
- 기본값을 설정해서 옵셔널을 제거한다.
  - 옵셔널을 사용할 때는 기본 값이나 옵셔널 체이닝을 함께 고려해야 안전하다.
  