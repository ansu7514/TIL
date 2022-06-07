# Session 08. 함수 다루기
## 1. 함수, 메서드, 생성자
```javascript
  // 함수
  function func() {
    return this;      // this (전역 변수)
  }
  
  // 객체의 메서드
  const obj = {
    method() {
      return this;    // this (호출된 객체)
    }
  }
  
  // 생성자 함수 (Class)
  function Func() {
    return this;      // this (생성될 인스턴스)
  }
```
적어도 함수, 메서드, 생성자는 구별할 수 있어야 한다.<br>
#### ✅ 함수 (1급 객체)
- 변수나, 데이터에 담길 수 있다
- 매개변수로 전달 가능 (콜백 함수)
- 함수가 함수를 반환 (고차 함수)
#### ✅ 메서드
- 객체에 의존성이 있는 함수로 OOP 행동을 의미
#### ✅ 생성자 함수
- 인스턴스를 생성하는 역할로 Class를 의미
<br>

## 2. argument & parameter
```javascript
function example (parameter) {
    console.log(parameter);         // Output = foo
}

const argument = 'foo';

example(argument);
```
함수의 `parameter`는 이름이 있고, 함수의 **정의 부분**에 존재한다.<br>
`argument`는 함수에 들어가는 **실제 값**이다.<br>
#### ✅ Parameter (Formal Parameter)
- 형식을 갖춘, 매개변수를 의미
#### ✅ Argument (Actual Parameter)
- 실제로 사용되는, 인자 혹은 인수를 의미
<br>
