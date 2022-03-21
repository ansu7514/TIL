# Componenet Life Cycle

![image](https://user-images.githubusercontent.com/54002821/159257241-c4c381e6-968e-44ee-94b4-0c4307d571c6.png)

## ✔ 마운트 (Mount)
- DOM이 생성되고 웹 브라우저상에 나타나는 것을 마운트라고 한다.
- 마운트 할때 호출하는 메서드
  - <b>constructor</b> : 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드
  - <b>getDerivedStateFromProps</b> : props에 있는 값을 state에 동기화하는 메서드
  - <b>render</b> : 준비한 UI를 렌더링 하는 메서드
  - <b>componentDidMount</b> : 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드
 
 ## ✔ 업데이트 (Update)
 - 컴포넌트를 업데이트 하는 경우
  - <b>props</b>가 바뀔 때
  - <b>stat</b>가 바뀔 때
  - <b>부모 컴포넌트</b>가 리렌더링될 때
  - <b>this.forceUpdate</b>로 강제로 렌더링을 트리거 할 때
- 업데이트할 때 호출되는 메서드
  - <b>getDerivedStateFromProps</b> : 마운트 과정에서도 호출하며, porps가 바뀌어서 업데이트할 때도 호출
  - <b>shouldComponentUpdate</b> : 컴포넌트가 리렌더링의 여부를 결정하는 메서드, 여기서 false를 반환하면 아래 매서드를 호출하지 않음
  - <b>render</b> : 컴포넌트를 리렌더링
  - <b>getSnapshotBeforUpdate</b> : 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드
  - <b>componentDidUpdate</b> : 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드

## ✔ 언마운트 (Unmount)
- 마운트의 반대 과정으로 컴포넌트를 DOM에서 제거하는 것을 언마운트라고 한다.
- 언마운트할 때 호출하는 메서드
  - <b>componentWillUnmount</b> : 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메서드
