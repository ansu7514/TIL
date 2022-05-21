# Session 07. 객체 다루기
## 1. Shorthand Properties
```javascript
  // Shorthand Properties Before
  const firstName = 'poco';
  const lastName = 'jang';
  
  const person = {
    firstName = 'poco',
    lastName = 'jang',
    getFullName: function () {
      return this.firstName + ' ' + this.lastName;
    },
  };
  
  // Shorthand Properties After
  const firstName = 'poco';
  const lastName = 'jang';
  
  const person = {
    firstName,
    lastName,
    getFullName () {
      return this.firstName + ' ' + this.lastName;
    },
  };
```
간결한 자바스크립트는 좀 더 코드를 이해하기 쉽게 만든다.<br>
현재 자바스크립트의 문법을 정확하게 이해하고 구분해서 간결하게 사용할 수 있도록 코드를 작성해야 한다.<br>
<br>

## 2. Computed Property Name
```javascript
  const handleChange = (e) => {
    setState({
      [e.target.name]: e.target.value,
    });
  };
```
[ 대괄호 ] 를 사용하게 된다면 속성도 동적으로 넣을 수 있다.<br>
이러한 것들을 <b>Computed value</b>라고 한다.<br>
```javascript
  const noop = createAction('INCREMENT');
  
  const reducer = handleActions(
    {
      [noop]: (state, action) => ({
        couter: state.counter + action.payload;
      }),
    },
    { counter: 0 },
  );
```
이러한 것들은 복잡하고 귀찮은 행위들을 단순하게 변환시켜준다.<br>
<br>

## 3. Lookup Table
<b>Lookup Table</b>이란 배열 데이터 구조에서 `key`와 `value`로 관리된 배열이 나열된 것을 의미한다.<br>
```javascript
  // 기존 if문 반복
  function getUserType1(type) {
    if (type === 'ADMIN') {
      return '관리자';
    } else if (type === 'INSTRUCTOR') {
      return '강사';
    } else if (type === 'STUDENT') {
      return '수강생';
    } else (type === 'ADMIN') {
      return '해당 없음';
    };
  };
  
  // Lookup Table
  function getUserType2(type) {
    const UESR_TYPE = {
      ADMIN: '관리자',
      INSTRUCTOR: '강사',
      STUDENT: '수강생',
    };
    
    return USER_TYPE[type] || '해당 없음';
  };
```
Object Lookup Table로 변환할 경우 훨씬 깔끔하고 알아보기 쉽운 코드를 작성할 수 있다.<br>
> ✔️ TIP<br>
> javascript에서 상수는 Snake Case로 표현하는 규약이 있다.<br>
<br>

## 4. Object Destructuring
비교적 최신 문법이지만 편리해서 많은 사람들이 사용 중이다.<br>
```javascript
  function Person({ name, age, location }) {
    this.name = name;
    this.age = age;
    tihs.location = location;
  };
  
  // 기존
  const poco = new Person('poco', 30, 'korea');
  
  // 객체구조분해할당
  const poco = new Person({
    location: 'korea',
    name: 'poco',
    age: 30
  });
```
위 코드는 강제된 매개변수들의 순서가 가장 큰 문제이다.<br>
하지만 객체로 설정하여 변수명을 설정할 경우 원치 않은 변수는 전달하지 않아도 되며, 순서에 맞지 않아도 매개변수를 전달 할 수 있다.<br>
코드를 명시적으로 개선할 수 있기 때문에 객체구조분해할당을 적극적으로 사용하는 것이 좋다.<br>
<br>

## 5. Object.freeze
의미 그대로 객체를 동결한다는 것을 의미한다.<br>
```javascript
  const STATUS = Object.freeze({
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAIL: 'FAIL',
  });
  
  STATUS.PENDING = 'P2';
  console.log(STATUS.PENDING);    // PENDING
  Object.isFrozen(STATUS);        // true
```
Object.freeze는 deep freezen이 되지 않는다는 단점을 가진다.<br>
이러한 부분은 freezen을 중첩으로 사용하여 해결할 수 있다.<br>
<br>
