# Item 08. 타입 공간과 값 공간의 심벌 구분하기
타입스크립트의 심벌은 타입공간이나 값 공간 중의 **한 곳**에 존재한다.<br>
```javascript
  // type
  interface Cylinder {
    radius: number;
    height: number;
  };
  
  // value
  cont Cylinder = (radius: number, height: number) => ({ radius, height });
```
`interface Cylinder`에서 `Cylinder`는 타입으로 쓰인다.<br>
`const Cylinder`는 이름은 같지만 값으로 쓰이며, 서로 아무런 관련이 없다.<br>
하지만, 이러한 상황에서 가끔 오류를 야기한다.<br>
```javascript
  function calculateVolume(shape: unknown) {
    if (shpae instanceof Cylinder) {
      shape.radius
        //  ~~~~~~ '{}' 형식에 'radius' 속성이 없습니다.
    }
  }
```
#### ✔ 타입 선언(:) 또는 단언문(as) 다음에 오는 심벌 ⇒ `TYPE`
#### ✔ = 다음에 나오는 모든 것 ⇒ `VALUE`
<br>

`class`와 `enum`은 상황에 따라 타입과 값 두 가지 모두 가능한 예약어이다.<br>
연산자 중에서도 타입에서 쓰일 때와 값에서 쓰일 때 다른 기능을 하는 것들이 있는데, 그 중에 하나가 `typeof`이다.<br>
```javascript
  type T1 = typeof p;       // 타입은 Person
  type T2 = typeof email;   // 타입은 (p: Person, subject: string, body: string) => Response
  
  const v1 = typeof p;      // 값은 "object"
  const v2 = typeof email;  // 값은 "function"
```
타입의 관점에서 `typeof`는 값을 읽어서 타입스크립트 타입을 반환한다.<br>
값의 관점에서 `typeof`는 자바스크립트 **런타임의 typeof 연산자**가 된다.<br>
<br>

## 📝 요약
- 타입스크립트 코드를 읽을 때 타입인지 값인지 구분하는 방법을 터득해야 한다.
- ⭐ **모든 값은 타입을 가지지만, 타입은 값을 가지지 않는다.** ⭐
- `class`나 `enum` 같은 키워드는 타입과 값 두 가지로 사용될 수 있다.
- `typeof`, `this` 그리고 많은 다른 연산자들과 키워드들은 타입 공간과 값 공간에서 다른 목적으로 사용될 수 있다.