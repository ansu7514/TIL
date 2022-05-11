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
