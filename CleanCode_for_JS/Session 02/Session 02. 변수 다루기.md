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
`const`는 재할당만 금지이며, 객체나 배열 조작에는 문제가 없다.
<br>
