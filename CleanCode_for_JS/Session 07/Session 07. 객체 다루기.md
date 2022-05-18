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
