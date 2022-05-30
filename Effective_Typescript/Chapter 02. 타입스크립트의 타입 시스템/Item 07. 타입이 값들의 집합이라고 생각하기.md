# Item 07. 타입이 값들의 집합이라고 생각하기
타입스크립트에서는 타입을 **값들의 집합**이라고 생각해야 한다.<br>
그 타입은 프로그래머가 정의할 수 있으며 그 수는 무한히 많다.<br>
또한 타입은 타입 공간에 존재하며 값의 공간과는 분리되어 있다.<br>
<br>

**가장 작은 집합**은 공집합으로 값들이 없는 집합을 의미하며 `never`라는 타입이다.<br>
해당 타입으로 선언될 경우 값을 할당할 수 없다.<br>
<br>

반대로 **가장 큰 집합**은 `unknown`이다.<br>
어떠한 값이든 할당할 수 있으며, 전체 집합이라고 할 수 있다.<br>
```javascript
  let unknownValue: unknown;
  function doSomethingWithNumber(value:number) {}
  
  doSomethingWithNumber(unknownValue);            // 에러 발생
  doSomethingWithNumber(unknownValue as any);     // 에러 발생 안함
```
`unknown` 타입은 `any` 타입과 비슷하다고 느낄 수 있다.<br>
하지만 `any`는 타입체커를 무시하며, `unknown`은 타입체커를 거친다는 차이점이 있다.<br>
<br>

```javascript
  type A = 'A';
  type B = 'B';
  type Twelve = 12;
```
`literal` 타입은 **유닛 타입**이라고도 불리며 원소가 하나로만 이루어진 집합이다.<br>
<br>

```javascript
  type ABType = A | B;
  type ABLiteral = 'A' | 'B';
  type NumberOrString = number | string;
```
집합을 더하면 합집합이 되며 이를 `union` 타입이라고 한다.<br>
<br>

## 📝 요약
- 값들의 집합을 타입이라고 한다.
- unknown과 any는 본질적으로 다른 타입이다.
- 부분 집합이다 / 할당 가능하다 / 상속받았다는 동일한 의미를 가지고 있다.