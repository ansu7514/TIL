# Item 04. 구조적 타이핑에 익숙해지기
자바스크립트는 본질적으로 덕 타이핑(duck typing) 기반이다.<br>
> 덕 타이핑이란?<br>
> 객체가 어떤 타입에 부합하는 변수와 메서드를 가질 경우 객체를 해당 타입에 속하는 것으로 간주하는 방법이다.<br>
<br>
타입스크립트는 매개변수 값이 요구사항을 만족한다면 타입이 무엇인지 신경 쓰지 않는 동작을 그대로 모델링 한다.<br>
그러나 타입 체커의 타입에 대한 이해도가 사람과 다르기 때문에 가끔 예상치 못한 결과가 나오기도 한다.<br>
<br>

```javascript
  interface Vector2D {
    x: number;
    y: number;
  }

  function calculateLength(v: Vector2D) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }
```
이제 이름이 들어간 벡터를 추가한다.<br>
```javascript
  interface NameVector {
    name: string;
    x: number;
    y: number;
  }

  const v: NameVector = { x: 3, y: 4, name: 'Zee' };
  calculateLength(v);		// 정상, 결과는 5
```
`Vector2D`와 `NameVector`의 관계를 전혀 선언하지 않았고 `NameVector`를 위한 별도의 `calculateLength`를 선언하지 않았다.<br>
그럼에도 타입스크립트 타입 시스템은 **자바스크립의 런타임 동작을 모델링**한다.<br>
여기서 **구조적 타이핑**이라는 용어가 사용된다.<br>
<br>
하지만 이러한 구조적 타이핑 때문에 문제가 발생하기도 한다.<br>
```javascript
  interface Vector3D {
    x: number;
    y: number;
    z: number;
  }

  function normalize(v: Vector3D) {
    const length = calculateLength(v);
    return {
      x: v.x / length;
      y: v.y / length;
      z: v.z / length;
    };
  }

  // > normalize({ x: 3, y: 4, z: 5 })
  // { x: 0.6, y: 0.8, z: 1 }
```
벡터의 길이를 1로 만드는 정규화 함수지만 이 함수는 1보다 조금 더 긴 길이 (1.41) 결과를 출력한다.<br>
위에서 `calculateLength`는 2D 벡터를 기반으로 연산하는데 3D 벡터로 연산되어 z가 정규화에서 무시되었기 때문이다.<br>
#### ⭐ 타입은 언제나 확장이 가능하다 ⭐
<br>

## 📝 요약
- 자바스크립트는 덕 타이핑 기반이며 타입스킄립트는 이를 모델링하기 위해 **구조적 타이핑**을 사용한다.<br>
	어떤 인터페이스에 할당 가능한 값이라면 타입 선언에 명시적으로 나열된 속성들을 가지고 있을 것이며, **타입은 열려 있다**.
- 클래스 역시 구조적 타이핑의 규칙을 따른며 클래스의 인터페이스가 예상과 다를 수 있다.
- 구조적 타이핑 사용할 경우 유닛 테스트를 손쉽게 할 수 있다.