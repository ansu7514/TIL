# Session 03. 타입 다루기
## 1. 타입 검사
### 1-1. typeof
```javascript
  typeof '문자열'      // 'string'
  typeof true          // 'boolean'
  typeof undefined     // 'undefined'
  typeof 123           // 'number'
  typeof Symbol()      // 'symbol'
```
`typeof`는 <b>문자열</b>로 반환하는 것이 특징이며 함수처럼 사용할 수 있다.
```javascript
  function myFunction() {}
  class MyClass {}
  
  typeof myFunction    // 'function'
  typeof MyClass       // 'function'
```
함수형을 분별할 수 있지만, `function`과 `class`가 모두 `function`형으로 출력되어 위험하다.
```javascript
  const str = new String('문자열')
  typeof str      // 'object'
```
또한 REFERENCE, 즉 object 형(Array, function, Date)는 `typeof`로 분별하기가 굉장히 어렵다.
```javascript
  typeof null     // 'object'
```
가장 큰 문제는 `null`을 object 형으로 반환하는 것이다.<br>
이것은 언어적인 오류이며 javascript가 수정할 수 없다고 판단하여 수정하지 않고 있다.

#### 따라서, `typeof`가 만능은 아니다.

------

### 1-2. instanceof
`instanceof`란 객체의 prototype 체인을 검사하는 것이다.
```javascript
  function Person (name, age) {
    this.name = name;
    this.age = age;
  };
  
  const p = {
    name: 'poco',
    age: 99
  };
  
  const poco = new Person ('poco', 99);
  poco instanceof Person    // true
  p instanceof Person       // false
```
`instanceof`는 이 객체에 대해 확인을 하기 용이한 도구이다.
```javascript
  const arr = [];
  const func = function() {};
  cosnt date = new Date();
  
  arr instanceof Array        // true
  func instanceof Function    // true
  date instanceof Date        // true
  
  arr instanceof Object        // true
  func instanceof Object       // true
  date instanceof Object       // true
```
위의 예시 모두 REFERENCE이기 때문에 최상위가 object이다.<br>
때문에 `instanceof`로 타입검사를 하는 것이 어렵다.<br>

------

### 1-3. prototype
```javascript
  Object.prototype.toString.call('')  // '[object String]'
  
  const arr = [];
  const func = function() {};
  cosnt date = new Date();
  
  Object.prototype.toString.call(arr)   // '[object Array]'
  Object.prototype.toString.call(func)  // '[object Function]'
  Object.prototype.toString.call(date)  // '[object Date]'
```
REFERENCE는 결국 object의 prototype을 타기 때문에 위처럼 사용할 수 있으며,<br>
<b>REFERENCE 객체</b>까지 감지할 수 있다는 장점이 있다.<br>
<br>

## 2. undefined & null
`undefined`는 생성하고 아무것도 <b>정의하지 않은 것</b>을 의미하며, `null`은 <b>없다</b>는 것을 명시적으로 의미한다.
```javascript
  !null           // true
  !!null          // false
  
  null === false  // false
  !null === true  // true
  
  null + 123      // 0 + 123 = 123
```
```javascript
  let varb;
  
  typeof varb;          // 'undefined'
  
  !undefined            // true
  undefined == null     // true
  undefined === null    // false
  !undefined === !null  // true
  
  undefined + 10        // NaN (Not a Number)
```
`varb`를 선언하긴 했지만 값은 정의되지 않고 할당되지 않았다.<br>

> 숫자적으로 undefined은 NaN으로, null는 0으로 출력되며<br>
> type적으로 undefined은 undefined로, null은 object로 출력된다.

#### 🚨 `undefined`와 `null`은 결굴 값이 없거나 정의되지 않은 값을 의미하며 쓰임을 조심해야한다.
<br>

## 3. eqeq 줄이기
`eqeq`란 javascript에서 <b>동등연산자(==)</b>를 의미한다.<br>
`===`는 Strict equality로 <b>엄격한 검사</b>를 할 수 있는 동등연산자이다.
```javascript
  '1' == 1    // true
  1 == true   // true
  
  '1' === 1   // false
  1 === true  // false
```
동등연산자를 사용할 경우, typecasting(형변환)이 발생하게 된다.<br>
따라서, <b>엄격한 동등연산자</b>를 사용하는 것을 추천한다.<br>
안전하게 가기 위해서는 수동으로 형변환을 해서 사용하는 것이 좋다.<br>
<br>

## 4. 형변환 주의하기
```javascript
  '1' == 1                // true
  
  11 + ' 문자와 결합'     // '11 문자와 결합'
  !!'문자열'              // true
  !!''                    // false
```
느슨한 검사라고 생각하지만 암묵적으로는 <b>형 변환</b>이 발생하고 있는 것이다.<br>
따라서 명시적으로 형변환하는 것이 좋은 방법이다.<br>
<br>

## 5. isNaN
사람(10진수)와 컴퓨터(2진수) 간의 간극을 javascript는 IEEE 754로 해결하려고 하고 있다.<br>
IEEE는 <b>부동소수점</b>을 사용해서 해당 문제를 해결하려고 한다.<br>
```javascript
  typeof 123 !== 'number'       // false
  isNaN(123)                    // false (숫자가 숫자가 아니다. 즉, 숫자이다.)
  
  isNaN(123 + '테스트')         // true
  Number.isNaN(123 + '테스트')  // false
```
> isNaN(is Not A Number) ⇒ 숫자가 아니다.<br>

`isNaN`은 느슨한 검사를 하는 것이고 `Number.isNaN`은 엄격한 검사를 하는 것이다.
#### 따라서 `Number.isNaN` 사용하는 것이 훨씬 더 좋은 방법!!
