# Session 05. 분기 다루기
## 1. 값식문
다양한 도구나 언어론적으로 생각하여 문법을 무시하거나 까먹는 경우가 있다.<br>
하지만 결국 개발자는 프로그래밍 언어를 사용하고 있기 때문에 문법을 생각해야한다.<br>
이는 컴퓨터를 이해하기 위해 굉장히 중요한 요소이다.<br>
```javascript
  // This JSX:
  ReactDOM.render(
    <div id="msg">Hello World!</div>,
    mountNode
  );
  
  // Is transformed to this JS:
  ReactDOM.render(
    React.createElement('div', { id: 'msg' }, 'Hello World!'),
    mountNode
  );
```
> 참고로 React는 JSX 문법을 사용한다.<br>

React는 바벨을 만날 경우, 아래와 같이  JSX 문법에서 JS로 transfiling하게 된다.<br>
JSX 내부에서 if문은 사용할 수 없지만, <b>삼항연산자</b>는 값으로 귀결되기 때문에 사용할 수 있다.<br>
만약 if문을 사용하고 싶다면 swith문으로 대신 사용할 수 있다.<br>
```javascript
  function ReactComponent() {
    return (
      <div>
        {(() => {
          if (conditionOne) return <span>One</span>;
          if (conditionTwo) return <span>Two</span>;
          else conditionOne;
          return <span>Three</span>;
        })()}
        
        // 값식문 사용 시
        {conditionOne && <span>One</span>}
        {conditionTwo && <span>Two</span>}
        {!conditionTwo && <span>Three</span>}
      </div>
    )
  }
```
#### { 중괄호 } 안에는 값과 식만 들어가야 한다.
<br>

## 2. 삼항 연산자 다루기
삼항 연산자를 사용할 때 숏코딩에 집중하는 것 보다 <b>일관성</b>에 집중하는 것이 중요하다.<br>
#### 조건 ? 참(식) : 거짓(식)
#### ✔ 3개의 피연산자를 필수적으로 사용해야 한다.
```javascript
  function example1() {
    return condition1 ? value1
      : condition2 ? value2
      : condition3 ? value3
      : value4;
  }
  
  function example2() {
    if (condition1) { return value1; }
    else if (condition2) { return value2; }
    else if (condition3) { return value3; }
    else { return value4; }
  }
```
사실 위와 같은 경우에는 `switch문`이 제일 효과적이다.<br>
```javascript
  const welcomeMessage = (isLogin) => {
    const name = isLogin ? getName() : '이름없음';
    return 안녕하세요 ${name};
  }
```
이름이 없는 `null` 상황에 대응하기 위해서 위와 같은 삼항 연산자를 사용하였다.<br>
<br>

## 3. Truthy & Falsy
```javascript
  if (10) {
    // true로 해석되어 실행됨
  }
  
  if (0) {
    // false로 해석되어 실행되지 않음
  }
```
<br>

## 4. 단축평가
```javascript
  // AND
  true && true && '도달 O';     // '도달 O'
  true && false && '도달 X';    // false
  
  // OR
  false || false || '도달 O';   // '도달 O'
  true || true || '도달 X';     // true
```
논리연산자, 삼항연산자 등을 활용하여 평가로 사용하고 있다.<br>
```javascript
  const getActiveUser1(user, isLogin) {
    if (isLogin) {
      if (user) {
        if (user.name) {
          return user.name
        } else {
          return '이름없음'
        }
      }
    }
  };
  
  const getActiveUser2(user, isLogin) {
    if (isLogin && user) {
      return user.name || '이름없음';
    }
  };
```
`getActiveUser1` 코드를 `getActiveUser1` 코드처럼 줄여서 사용할 수 있다.<br>
가장 먼저 체크해야하는 변수를 앞에 놓아서 불필요한 평가를 줄일 수 있다.<br>
<br>

## 5. else if 피하기
```javascript
  const x = 1;
  
  if (x >= 0) {
    console.log('x는 0과 같거나 크다.');
  } else if (x > 0) {
    console.log('x는 0보다 크다.');
  } else {
    console.log('Else');
  }
  // x는 0과 같거나 크다. 
```
위와 같은 코드에서 `else if문`을 제거하면 다음과 같은 동일한 코드를 얻을 수 있다.<br>
```javascript
  const x = 1;
  
  if (x >= 0) {
    console.log('x는 0과 같거나 크다.');
  } else {
    if (x > 0) {
      console.log('x는 0보다 크다.');
    }
  }
  // x는 0과 같거나 크다.
```
`else if문`의 사용을 줄이는 것이 가독성에도 좋고, 조건을 파악하기도 쉽다.<br>
따라서, 사용을 지향하고 만약 사용할 일이 있다면 `switch문`을 사용하는 것이 좋다.<br>
<br>

## 6. else 피하기
```javascript
  function getActiveUserName(user) {
    if (user.name) {
      return user.name;
    }
    return '이름없음';
  }
```
`if`와 `else`를 동시에 사용하게 될 경우 단순성 뿐만 아니라 반전된 기능을 주는 함수처럼 사용하게 된다.<br>
즉, 참일 때 반환과 거짓일 때 반환이 명백히 정해진 함수가 되기 때문이다.<br>
이럴 경우 2가지 이상의 기능을 가진 경우에 문제가 발생할 수 있다.<br>
```javascript
  // 성인이 아닌 경우도 return 값을 받아야 한다.
  function getHelloCustmer() {
    if (user.age < 20) {
      report(user);
    } else {
      return '안녕하세요';
    }
  };
```
위와 같은 함수의 경우 20세 이하에게는 '안녕하세요' 값을 반환할 수 없다는 문제점을 가진다.<br>
이런 경우에도 `else문`을 제거하여 return 값을 반환 시킬 수 있다.<br>
<br>

## 7. Early Retrun
```javascript
  function loginService(isLogin, user) {
    if (!isLogin) {
      if (checkToken()) {
        if (!user.nickName) {
          return registerUser(user);
        } else {
          refreshToken();
          
          return '로그인 성공';
        } else {
          throw new Error('No Token');
        };
      };
    };
  };
```
```javascript
  // Early return
  function loginService(isLogin, user) {
    if (!isLogin) {
      return
    };

    if (!checkToken()) {
      throw new Error('No Token');
    };
    
    if (!user.nickName) {
      throw new Error('No Token');
    };
    
    refreshToken();
    
    return '로그인 성공';
  };
```
Early return을 사용함으로써 함수를 미리 종료하고 사고하기 편하다는 장점을 가진다.<br>
사실 로직적으로는 큰 변화를 가지지는 않으며 어느 부분을 실행 중인지 명확하게 확인할 수 있다.<br>
<br>

## 8. 부정조건문 지양하기
```javascript
  // 숫자일 때만 출력
  if (!isNaN(3)) {
    console.log('숫자입니다');   // 숫자입니다
  }
```
`isNaN`을 사용하게 될 경우 부정을 2번 사용하게 되어 한 번에 이해하기 어려워진다.<br>
때문에 새로운 함수나 변수로 체크하는 것이 이해하기에 간결한 코드로 제작할 수 있다.<br>
```javascript
  function isNumber(num) {
    return !Number.isNaN(num) && typeof num === 'number'
  };
  
  if (isNumber(3)) {
    console.log('숫자입니다');   // 숫자입니다
  }
```
하지만 이러한 경우에는 불필요한 연산을 많이 해야하는 경우가 발생하여 지향하지는 않는다.<br>
> 부정 조건 예외🚨
> 1. Early Retrun
> 2. Form Validation
> 3. 보안 혹은 검사하는 로직
<br>

## 9. Default Case 고려하기
```javascript
  function som(x, y) {
    x = x || 1;
    y = y || 1;
    
    return x + y;
  }
```
x나 y의 값이 빈 값일 경우를 대비하여 default value 값을 설정하는 것이 좋다.<br>
<br>

## 10. 명시적인 연산자 사용 지향하기
연산자 우선 순위를 암기해서 사용하기 보다는 시각적으로 판단하기 쉽게 <b>( 괄호 )</b>를 사용하는 것이 효과적이다.<br>
증감연산자를 사용하기 보다는 <b>명시적으로 작성하는 습관</b>을 가지는 것이 좋다.<br>
<br>

## 11. Nullish coalescing operator
> ⚠ 해당 문법은 비교적 최근 문법이기 때문에 예전 브라우저에서는 작동하지 않을 수도 있다.

```javascript
  function createElement(type, height, width) {
    const element = document.createElement(type || 'div');
    
    element.style.height = String(height || 10) + 'px';
    element.style.width = String(width || 10) + 'px';
    
    return element;
  }
  
  const el = createElement('div', 0, 0);
  el.style.height;        // '10px'
  el.style.width;         // '10px'
```
숫자 <b>0</b>은 `false`에 해당될 수 있기 때문에 자연스럽게 10이라는 값이 출력되고 있다.<br>
이럴 경우 가장 편리하게 사용할 수 있는 것이 바로 <b>null 병합 연산자</b>이다.<br>
```javascript
  function createElement(type, height, width) {
    const element = document.createElement(type ?? 'div');
    
    element.style.height = String(height ?? 10) + 'px';
    element.style.width = String(width ?? 10) + 'px';
    
    return element;
  }
```
위와 같은 경우에는 `null`과 `undefined`만 `false`로 반환하여 의도대로 함수를 사용할 수 있다.<br>
또한, 우선순위가 낮기 때문에 우선순위를 잘 확인할 수 있도록 <b>( 괄호 )</b>를 사용하는 것이 좋다.<br>
### 📝 정리
  1. null 병합 연산자는 굉장히 사용하기 편리하지만 실수를 유도하기 쉽기 때문에 신중하게 사용해야 한다.
<br>

## 12. 드모르간의 법칙
```javascript
  const isValidUser = true;     // 서버에서 받아온 값이라고 가정
  const isValidToken = true;
  
  if (!(isValidUser && isValidToken)) {
    console.log('로그인 실패!');
  }
```
위와 같은 코드에서 if문에 새로운 기획이나 확인 요소를 넣게 되면 코드가 복잡해진다.<br>
이럴 경우 다음과 같은 <b>드모르간의 법칙</b>을 사용하는 것이 좋다.<br>
```javascript
  if (!(A && B)) {
    // 성공
  }
  
  if (!A || !B) {
    // 훨씬 깔끔해짐
  }
```
### 😎 핵심
#### true is not true && false is not false
