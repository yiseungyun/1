# 타입스크립트 학습 정리

## 🏋️ 학습 개요

### 💥 anypang 💥
모든 타입스크립트 코드의 any를 터뜨리기

### ✨ 학습 목표
> 타입스크립트를 프로젝트에 적용해서 사용했지만, 타입스크립트를 잘 사용하고 있는건 무엇인지에 대한 답을 찾지 못했다. 실제 코드를 보며 문제가 되는 부분을 찾아 타입스크립트를 제대로 사용하는 연습을 하기 위해 시작했다. 또한 타입을 표기하는 단순한 도구가 아닌, 타입을 어떻게 표시할지 충분한 고민을 하며 사용할 수 있는 연습을 할 계획이다.

### 📍 학습 규칙
- 학습하는 날 day* 폴더를 생성하고, 문제와 문제 해결 그리고 해결 코드를 추가한다.
- 충분히 고민 후 해결하고, 학습한 내용은 문제 해결 밑에 정리한다.
- 해결 후 내 생각이 무조건 맞다고 생각하지 않고 AI에게 피드백도 추가로 받는다.

---

## 🔖 학습 정리 모음

### [Day01](./day01/solution.md)
`#옵셔널` `#Discriminated Union` `#Narrowing`
> 모든 속성이 옵셔널로 정의된 타입의 문제점을 해결하기 위해, 유니온 타입과 Discriminated Union(여러 타입을 유니온으로 묶고, 공통된 속성으로 각 타입을 구분)을 활용해 사용자 타입을 구체적으로 설계했다. loginType에 따라 타입을 좁히는 Narrowing을 통해 타입별로 안전하게 속성에 접근할 수 있게 했다.

### [Day02](./day02/solution.md)
`#any` `#unknown` `#타입 가드`
> any로 타입을 표시하면 타입 검사 기능을 우회하여 런타임 오류 위험이 있었다. 이를 해결하기 위해 unknown 타입을 사용하여, 값의 타입을 확인한 후 접근하도록 했다. parameter is Type 형식의 사용자 정의 타입 가드를 통해 안전하게 타입을 좁혔다. 이를 통해 외부에서 어떤 타입의 데이터가 들어와도 데이터의 신뢰성을 검증하고 타입 안정성을 확보할 수 있었다.

### [Day03](./day03/solution.md)
`#제네릭` `#타입추론`
> 매개변수와 반환값의 타입이 any로 지정된 함수는 타입 추론이 불가능해 런타임 오류를 방지할 수 없다. 이를 해결하기 위해 제네릭을 도입해 함수 호출 시점의 타입 정보를 활용하도로 개선했다. 이를 통해 stringArray[0].toFixed()와 같은 잘못된 접근은 컴파일 단계에서 오류로 확인할 수 있다. 또한 wrapInArray 함수는 매개변수로 입력 받는 변수를 배열로 바꾸어주는 함수이기 때문에 전달되는 값이 배열인지 아닌지도 확인하였다. 이를 통해 함수 범용성과 타입 안정성을 높일 수 있었다. 

### [Day04](.//day04/solution.md)
`#유틸리티 타입 재사용` `#Partial` `#Pick` `#Omit`
> User 속성 중 일부를 업데이트할 때 업데이트 되는 속성 타입을 하드코딩하여 User 타입이 변경되면 updates 타입도 변경해야하는 번거로움이 있었다. 이를 해결하기 위해 유틸리티 타입인 Partial, Pick, Omit을 사용해 기존 타입을 기반으로 업데이트 타입을 재사용할 수 있게 했다. Pick으로 업데이트할 항목만 선택했으나, id 속성만 빼고 업데이트할 수 있는 형태였기에 Omit을 사용하도록 했다. 또한 모든 속성이 업데이트 되지 않는 경우가 있어 Partial를 결합해 일부 속성만 업데이트 가능하게 했다. 이를 통해 기존 타입을 기반으로 새로운 타입을 안전하게 구성하고, 코드 일관성과 유지보수성을 높였다.

---

## ✅ 레포지토리 규칙

|태그|설명|
|:-:|:-:|
|feat|새 학습 주제 추가|
|fix|잘못된 코드 수정|
|refactor|기존 코드 개선|
|docs|학습 정리 추가|
|chore|설정, 폴더 구조 정리|