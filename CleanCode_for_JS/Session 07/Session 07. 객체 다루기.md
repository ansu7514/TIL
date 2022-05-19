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
> javascript에서 상수는 snake case로 표현하는 규약이 있다.<br>
