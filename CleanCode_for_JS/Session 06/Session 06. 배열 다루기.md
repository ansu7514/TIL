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
