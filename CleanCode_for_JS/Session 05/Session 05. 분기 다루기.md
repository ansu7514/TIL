# Session 05. 분기 다루기
## 1. 값식문
다양한 도구나 언어론적으로 생각하여 문법을 무시하거나 까먹는 경우가 있다.<br>
하지만 결국 개발자는 프로그래밍 언어를 사용하고 있기 때문에 문법을 생각해야한다.<br>
이는 컴퓨터를 이해하기 위해 굉장히 중요한 요소이다.<br>
```javascript
  ReactDOM.render(
    <div id="msg">Hello World!</div>,
    mountNode
  );
  
  ReactDOM.render(
    React.createElement('div',{ id: 'msg' }, 'Hello World!'),
    mountNode
  );
```
> 참고로 React는 JSX 문법을 사용한다.<br>

React는 바벨을 만날 경우, 아래와 같이  JSX 문법에서 JS로 transfiling하게 된다.
