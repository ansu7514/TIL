# Session 06. 배열 다루기
## 1. Javascript의 배열은 객체다
```javascript
  const arr = [1, 2, 3];
  
  arr[3] = 'test';
  arr['property'] = 'string value';
  arr['obj'] = {};
  arr[{}] = [1, 2, 3];
  arr['func'] = function() {
    return 'hello';
  };
```
> ✔ <b>결과값</b><br>
> [ 1, 2, 3, 'test', property: 'string value', obj: {}, '[object Obejct]': [ 1, 2, 3 ], func: [함수] ]

Javascript 배열의 내부 동작은 <b>객체와 유사한 부분</b>이 많다는 것을 알 수 있다.<br>
Javascript에 내장되어 있는 `Array.isArray()`를 사용해서 배열의 사실성을 확인할 수 있다.<br>
따라서, Javascript의 배열은 객체스러운 점이 많고 객체로 취급되는 경우가 많이 때문에 주의가 필요하다.<br>
<br>

## 2. Array.length
`Array.length`는 무심코 쉽게 사용하지만 조심스럽게 사용해야 한다.<br>
```javascript
  const arr = [1, 2, 3];
  arr.length = 10;
  
  console.log(arr.length);    // 10
  console.log(arr)            // [1, 2, 3, , , , , , , , ]
```
Javascript 배열은 객체처럼 사용되기 때문에 자연스럽게 빈 공간이 생기는 문제가 발생된다.<br>
```javascript
  function clearArray(array) {
    array.length = 0;
    
    return array;
  };
  
  const arr = [1, 2, 3];
  
  console.log(clearArray(arr));     // []
```
위처럼 배열 길이를 <b>0</b>으로 설정하여 배열을 비우도록 설정할 수도 있다.<br>
<br>

## 3. 배열의 요소에 접근하기
배열의 요소는 `element`라고 부르며, 배열의 하나하나의 단위를 의미한다.<br>
배열의 요소를 직접 지정해서 사용하는 것보다 `forEach문`이나 반복문을 사용해서 접근하는 것이 안정적이다.<br>
<br>

## 4. 유사 배열 객체
```javascript
  const arrayLikeObject = {
    0: 'HELLO',
    1: 'WORLD',
    length: 2,
  };
  
  const arr = Array.from(arrayLikeObject);
  console.log(arr);                               // [ 'HELLO', 'WORLD' ]
  console.log(Array.isArray(arr));                // true
  console.log(Array.isArray(arrayLikeObject));    // false
```
### 🚩 자바스크립트 배열은 객체라는 것을 다시금 알려주는 코드
유사 배열 객체는 다양한 케이스에서 만날 수 있다.<br>
그 중 가장 대표적인 사례로는 `arguments`가 있다.<br>
```javascript
  function generatePriceList() {
    return arguments.map((arg) => arg + '원');
  }
  
  generatePriceList(100, 200, 300, 400);
```
아무런 인자를 받지 않는 함수에 가변적인 함수를 넣었을 때, <b>`arguments`</b>라는 유사 객체 배열로 다룰 수 있다.<br>
자바스크립트의 고차 함수인 `map`이나 `forEach` 등으로 `arguments`를 실행시킬 경우에는 오류가 발생한다.<br>
`arguments`는 유사 객체 배열이기 때문에 배열로 변경해야지만 사용할 수 있다.<br>
<br>

## 5. 불변성 (immutable)
```javascript
  const originArray = [ '123', '456', '789' ];
  const newArray = originArray;
  
  originArray.push(10);
  originArray.push(11);
  originArray.push(12);
  originArray.unshift(0);
  
  originArray;            // [ 0, '123', '456', '789', 10, 11, 12]
  newArray;               // [ '123', '456', '789']
```
원본 배열만 수정되고 새로운 배열은 수정되지 않았다.
자바스크립트는 순수함수나 불변성을 유지하는 코드를 작성하는 것이 좋다.<br>
### 📝 불변성을 유지하는 법
  1. 배열을 복사한다.
  2. 새로운 배열을 반환하는 메서드들을 활용한다. (ex) map)
<br>

## 6. for 문 배열 고차 함수로 리팩터링
```javascript
  const price = [ '2000', '1000', '3000', '5000', '4000' ];
  
  function getWonPrice(priceList) {
    let tmep = [];
    
    // for 문
    for (let i = 0; i < priceList.length; i++) {
      temp.push(priceList[i] + '원');
    };
    
    // 고차 함수 map
    return priceList.map((price) => price + '원');
  }
```
<br>

## 7. 배열 메서드 체이닝 활용하기
고차 함수로 변환해도 로직이 증가한다는 아쉬움을 가질 수 있다.<br>
이를 해결하기 위해서, <b>메서드 체이닝</b>을 활용할 수 있다.<br>
```javascript
  const price = [ '2000', '1000', '3000', '5000', '4000' ];
  
  const suffixWon = (price) => price + '원';
  const isOverOneThousand = (price) => Number(price) > 1000;
  const ascendingList = (a, b) => a - b;
  
  // 고차 함수 형식
  function getWonPrice(priceList) {
    const isOverList = priceList.filter(isOverOneThousand);
    const sortList = isOverList.sort(ascendingList);
    
    return sortList.map(suffixWon);
  };
  
  // 메서드 체이닝 형식
  function getWonPrice(priceList) {
    return priceList
      .filter(isOverOneThousand)      // filter로 원하는 조건에 맞는 배열 리스트 만들기
      .sort(ascendingList)            // sort로 정렬
      .map(suffixWon);                // 배열 요소를 다시 정리
  };
```
기존 고차 함수 형식보다 메서드 체이닝 형식으로 훨씬 명확한 코드를 작성할 수 있다.<br>
메서드 체이닝을 활용하게 된다면 자료구조의 `Queue` 형식처럼 사용할 수 있다.<br>
<br>

## 8. map VS forEach
개발자 중에서 보통 `map`만 사용하거나 `forEach`만 사용하는 경우가 많다.<br>
하지만 `map`과 `forEach`는 차이점을 가지고 있고, 구분해서 사용해주어야 한다.<br>
```javascript
  const prices = [ '1000', '2000', '3000' ];
  
  const newPricesForEach = prices.forEach((price) => return price + '원');
  const newPricesMap = prices.map((price) => return price + '원');
  
  newPricesForEach;   // undefined
  newPricesMap;       // [ '1000', '2000', '3000' ]
```
즉, `forEach`는 <b>매 요소마다 함수를 실행</b>만 시켜주는 역할을 하며, `map`은 <b>매 요소를 새로운 배열로 반환</b>시켜주는 역할을 한다.<br>
이 둘을 분리하는 이유는 위와 같은 역할을 명시하기 위해서 사용하므로 잘 구분해서 사용하는 것이 중요하다.<br>
<br>

## 9. Continue & Break
`Continue`와 `Break`는 자주 실수하는 부분 중 하나로, 특정 레이블이나 흐름을 제어하여 반복을 컨트롤하는 역할을 한다.<br>
```javascript
const orders = [ 'first', 'second', 'third' ];
  orders.forEach(function(order) {
    if (order === 'second') {
      break;
    };
    
    console.log(order);
  });
```
위와 같이 사용하게 되면 끝까지 배열을 실행하지 못하기 때문에 에러가 발생하게 된다.<br>
이러할 경우에는 `try-catch문`을 사용하는 것이 가장 효과적이며, 또는 `for문`을 사용하면 된다.<br>
