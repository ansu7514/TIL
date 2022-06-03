# Item 09. 타입 단언보다는 타입 선언 사용하기
타입스크립트에서 변수에 값을 할당하고 타입을 부여하는 방법에는 **타입 선언**과 **타입 단언**이 있다.<br>

```javascript
  interface Person { name: string };

  const alice: Person = { name: 'Alice' };    // 타입은 Person
  const bob = { name: 'Bob' } as Person;      // 타입은 Person
```
`alice: Person`은 변수에 **타입 선언**을 붙여서 그 값이 선언된 타입임을 명시한다.<br>
`as Person`은 **타입 단언**을 수행하며 타입스크립트가 추론한 타입이 있어도 Person 타입으로 간주한다.<br>

```javascript
  const alice: Person = {};
     // ~~~~~ 'Person' 유형에 필요한 'name' 속성이 '{}' 유형에 없습니다.
  const bob = {} as Person;       // 오류 없음
```
타입 단언보다는 타입 선언을 사용하는 것이 좋다.<br>
타입 선언은 할당되는 값이 **해당 인터페이스를 만족하는지 검사**하기 때문이다.<br>
타입 단언은 강제로 타입을 지정했으니 타입 체커에게 오류를 무시하라고 하기 때문에 오류를 표시하지 못한다.<br>

#### ⭐ 타입 단언이 꼭 필요한 경우가 아닐 경우, 안전성 체크가 가능한 타입 선언을 사용하는 것이 좋다. ⭐
<br>

> ✔ **CHECK**<br>
> `const bob = <Person>{ }` 코드는 단언문의 원래 문법이며 `{ } as Person` 과 동일하다.<br>
> 하지만 `const bob = <person>{ }` 같은 코드는 <Person>이 .tsx 파일에서 컴포넌트 태그로 인식되어 현재는 잘 사용하지 않는다.<br>
<br>

```javasript
  // 잘못된 사용
  const people = ['alice', 'bob', 'jan'].map(name => ({ name }));
  // Person[]을 원했지만 결과는 { name: string }[] 이다.
  
  // 올바른 사용
  const people = ['alice', 'bob', 'jan'].map(
    (name): Person => ({ name })
  );  // 타입은 Person[]
```
여기서 소괄호는 매우 중요한 의미를 가진다.<br>
`(name): Person`은 name의 타입이 없고, 반환 타입이 Person이라고 명시하는 것이다.<br>
하지만 `(name: Person)`은 name에 타입이 Person임을 명시하고 반환 타입이 없기 때문에 오류가 발생한다.<br>
<br>

타입 단언은 타입 체커가 추론한 타입보다 작서앚가 판단하는 타입이 더 정확할 때 의미가 있다.<br>
예를 들어, 타입스크립트는 DOM에 접근할 수 없기 때문에 타입 단언을 사용하는 것이 효과적이다.<br>
<br>

## 📝 요약
- 타입 단언(as Type)보다 <b>타입 선언(: Type)</b>을 사용해야 한다.
- 화살표 함수의 반환 타입을 명시하는 방법을 터득해야 한다.
- 타입스크립트보다 타입을 더 잘 알고 있는 경우에는 타입 단어문을 사용한다.