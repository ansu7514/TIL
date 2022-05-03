# Session 02. 변수 다루기
## 1. ⚠ var를 지양하자 ⚠
- ES 2015부터 `let`, `const`가 생성되었음
  - var : <b>함수 스코프</b>
  - let & const : <b>블록 단위 스코프</b>, TDZ (Temporal Dead Zone)
  
```javascript
  var name = '이름 1';
  var name = '이름 2';
  var name = '이름 3';
  
  console.log(name); // '이름 3' 출력됨 
```
값은 다르지만 변수명이 똑같기 때문에 마지막에 선언된 변수로 출력되었다.<br>
이로 인하여 위험성을 가질 수 있다.
```javascript
  let name = '이름3';
  let name = '이름3';
  let name = '이름3';
  
  const name = '이름3';
  const name = '이름3';
  const name = '이름3';
  // 이미 선언 했기 때문에 에러 발생
```
`let`과 `const`의 차이점은 <b>재할당</b>에서 온다.
```javascript
  let name = '이름 1';
  name = '이름 2';  // 오류 발생 안함
  
  const name = '이름 1';
  name = '이름 2';  // 오류 발생
```
<br>

## 2. function scope & block scope
### function scope와 block scope의 차이점
```javascript
  var global = '전역';
  
  if (global === '전역') {
    // 무조건 실행
    var global = '지역';
    
    console.log(global);  // '지역'으로 출력
  };
  console.log(global);  // '지역'으로 출력
```
`var`는 함수 단위 스코프이기 때문에 `if문` 밖에서도 '지역'으로 출력된다.<br>
따라서 블록 단위 스코프로 변환하기 전까지 불안 요소를 가지게 된다.
```javascript
  let global = '전역';
  
  if (global === '전역') {
    let global = '지역';
    
    console.log(global);  // '지역'으로 출력
  };
  console.log(global);  // '전역'으로 출력
```
이렇게 `let`으로 선언할 경우 좀 더 안전하게 코딩할 수 있다.<br>
안전한 코드를 작성하기 위해서는 `let`과 `const`를 사용해야 하며, 특히, <b>`const`</b>를 사용하는 것이 좋다.
```javascript
  const person = {
    name: 'jang',
    age: '30',
  };
  
  // 에러 발생
  // person = {
  //  name: 'jang2',
  //  age: '30',
  // };
  
  person.name = 'lee';
  person.age = '22';
```
`const`는 재할당만 금지이며, 객체나 배열 조작에는 문제가 없다.<br>
<br>

## 3. 전역 공간 사용 최소화
### 전역 공간을 사용하지 말아야 할 이유
- 경험에 의해
- 누군가 혹은 자바스크립트 생태계의 추천
- 강의 혹은 책을 통해
- 회사 혹은 멘토의 권유
- Lint
### 전역공간이란?
`global` 또는 `window`라고도 하며, `global`과 `window`로 나뉨<br>
브라우저에서는 `window`가, Node.js에서는 `global`이 최상위이다.<br>
#### 즉, 최상위 공간이 전역이며, 브라우저 & Node 환경으로 구분된다.

```javascript
  // index1.js
  var globalVar = 'global';
  console.log(globalVar); // global;
  console.log(window.globalVar);  // global;
  
  var setTimeout = 'setTimeout';
  
  // 에러 없이 함수도 생성 가능
  // 문제가 많은 코드
  fuction setTimeout() {
    console.log('function');
  }
```
```javascript
  // index2.js
  console.log(globalVar); // global;
  console.log(window.globalVar);  // global;
  
  // index1.js의 setTimeout으로 인해 에러 발생
  setTimeout(() => {
    console.log('1초');
  }, 1000);
```
index1.js와 index2.js가 함께 있을 경우, 파일을 나눴지만 코드(스코프)가 나뉘지 않는 현상이 발생.<br>
#### 🚨 var를 사용할 경우, 전역 공간을 본인도 모르게 더럽힐 수 있다!
```javascript
  cosnt array = [10, 20, 30];
  
  for (var index = 0; index < array.length; index++) {
    const element = array[index];
  }
```
위처럼 코드를 작성하게 될 경우, 전역 환경에 `index`가 출력되므로 `let`과 `const`로 바꾸는 것이 좋다.<br>
### 결과적으로 전역 공간을 더럽히지 않아야 한다.
#### 이유는⁉️ 어디서나 접근이 가능하며 런타임 환경에서 분리되어 있지 않아서 스코프 분리에 위험성을 가지기 때문
### 해결 방안
  1. 전역변수 사용하지 않고 지역변수 사용하기
  2. window, global을 조작하지 않기
  3. `const`, `let` 사용하기
  4. IIFE (즉시 실행 함수), Module, closure
 <br>
 
## 4. 임시변수 제거하기
### 임시변수란?
Scope 안에서 전역변수처럼 활용되는 변수
```javascript
  function getelements() {
    const result = {};  // 임시 객체
    
    result.title = document.querySelector('.title');
    result.text = document.querySelector('.text');
    result.value = document.querySelector('.value');
    
    return result;
  }
```
```javascript
  function getelements() {
    return {
      title: document.querySelector('.title'),
      text: document.querySelector('.text'),
      value: document.querySelector('.value'),
    }
  }
```
위보다는 아래가 명확하고 깔끔한 코드이다.<br>
근본적으로 부작용이 일어날 수 있지만, 예시 함수의 역할에서는 훨씬 효과적인 형태이다.
#### 임시변수가 생성될 경우 계속 접근해서 뭔가 만들고 넣고 지우고를 반복하게 된다.
### 임시변수 생성 해결책‼️
  1. 함수 나누기
  2. 바로 반환하기
  3. 고차함수(map, filter, reducer) 등 사용하기
  4. 선언형으로 함수 작성하기
<br>

## 5. 호이스팅 주의하기
### 호이스팅이란?
<b>런타임 시기</b>에 선언과 할당이 분리된 것을 의미<br>
호이스팅은 `var`로 선언한 변수가 초기화가 제대로 되어 있지 않았을 때 `undefined`로 최상단에 끌어올려 줄 수 있는 것을 의미<br>
`let`과 `const`를 사용하면 이러한 현상은 잘 나타나지 않지만, `var`를 사용할 경우 자주 발생한다.
```javascript
  var global = 0;
  
  function outer() {
    console.log(global);  // undefined
    var global = 5;
    
    function inner() {
      var global = 10;
      console.log(global);  // 10
    }
    inner();
    
    global = 1;
    
    consoel.log(global);  // 1
  }
```
첫 번째의 경우가 바로 <b>호이스팅이 동작한 사례</b>이다.<br>
두 번째의 경우, `var`는 함수 스코프이기 때문에 `inner()` 함수 속 변수 값 10을 가지게 된다.<br>
세 번째의 경우에는 재할당을 했기 때문에 변수 값 1을 가지게 된다.<br>
```javascript
  var sum;
  
  console.log(typeof sum);  // function
  
  function sum() {
    return 1 + 2;
  }
```
위와 같이, 함수도 호이스팅이 가능하다.
### 변수 선언 ⇒ 할당 ⇒ 초기화 완료 ⇒ 정확한 분리 발생
```javascript
  cosnt sum = function() {
    return 1 + 2;
  };
  
  console.log(sum()); // 3
```
따라서, `const`를 사용해서 만든 후 함수를 할당하는 방식을 추천🙌<br>
이런 것을 바로 <b>함수 표현식</b>이라고 한다.<br>
<br>

## 6. 최총 요약 📝
### `var`의 사용은 지양하고, `let`, `const`를 지향해야한다.
