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
