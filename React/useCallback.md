# useCallback이란?
**useCallback**은 특정 함수를 새로 만들지 않고 재사용하고 싶을 때 사용한다.  
React 공식 문서에서는 useCallback을 다음과 같이 정의한다.

### 메모제이션된 함수를 반환하는 함수이다.

> 인라인 콜백과 그것의 의존성 값의 배열을 전달하세요. useCallback은 콜백의 메모제이션된 버전을 반환할 것입니다.
> 그 메모제이션된 버전은 콜백의 의존성이 변경되었을 때만 변경됩니다.
> 이것은, 불필요한 렌더링을 방지하기 위해 참조의 동일성에 의존적인 최적화된 자식 컴포넌트에 콜백을 전달할때 유용합니다.
> - React Hooks useCallback 문서

## 🤔 useCallback을 사용하는 이유
하위 컴포넌트에 전달하는 콜백 함수가 inline 함수로 사용되거나, 컴포넌트 내에서 함수를 생성하고 있다면 새로운 함수가 만들어지게 된다.  
예를 들면, `Counter` 안에 `icreament` 함수들은 컴포넌트가 리렌더링 될 때마다 새로 만들어지게 된다.  
  
함수를 재선언하는 것은 CPU, 큰 메모리도 차지하지 않지만, 한 번 만든 함수를 재사용하고, 필요할때만 재생성 하는 것은 중요하다.  
```javascript
    import React, { useState } from 'react';

    const CounterButton = function ({ onClicks, count }) {
        console.log("카운터 버튼 렌더링");
        return <button onClick={onClicks}>{count.num}</button>;
    };

    export default function Counter() {
        const [count1, setCount1] = useState({ num: 0 });
        const icreament1 = () => {
            setCount1({ num: count1.num + 1 });
        };

        const [count2, setCount2] = useState({ num: 0 });
        const icreament2 = () => {
            setCount2({ num: count2.num + 1 });
        };

        return (
            <div className="App">
                <div>{count1.num}</div>
                <div>{count2.num}</div>
                <CounterButton onClicks={icreament1} count={count1}></CounterButton>
                <CounterButton onClicks={icreament2} count={count2}></CounterButton>
            </div>
        );
    }
```
버튼을 클릭하면 `CounterButton` 컴포넌트가 2번 렌더링 되게 된다.  
원인을 알아보기 위해서는 React의 렌더링 과정을 알아봐야 한다.

- ✅ React가 리렌더링을 하는 조건
  - props가 변경되었을 때
  - state가 변경되었을 때
  - 부모 컴포넌트가 렌더링되었을 때
  - forceUpdate()를 실행하였을 때

따라서 위 예제는 props, state, 부모 컴포넌트의 변화가 있었기 때문에 **React가 리렌더링** 되게 된다.  

1. 첫 렌더링이 되고, `icreament` 함수와 `const state`가 생성되어 렌더링된다.
2. 버튼을 클릭하게 되면 `icreament` 함수가 작동하게 되고 `setState`로 인해 `state`가 변경된다.
3. `state`가 변경됐으니, 부모 컴포넌트는 리렌더링 되고, 변경된 `props`를 전달한다.
4. 자식 컴포넌트는 `props`를 받아 다시 뿌려준다.

이러한 과정을 통해서 `CounterButton`는 2번 렌더링 되게 된다.  

## 💡 useCallback 사용
```javascript
    import { useCallback } from 'react';

    // before
    const icreament1 = () => {
        setCount1({ num: count1.num + 1});
    }
    // after
    const icreament1 = useCallback(() => {
        setCount1({ num: count1.num + 1});
    }, [count1]);
```
`useCallback`의 첫번째 인자로는 인라인 콜백과 의존성 값의 배열을 받게 된다.  
```javascript
    useCallback(fn, deps);
```
의존성 배열인 `deps`에 변경을 감지해야할 값을 넣어주게 되면 `count1`이 변경될 때마다 콜백 함수를 새로 생성하게 된다.  
  
`useCallback`의 첫번째 인자로는 최적화를 위해 `useCallback`을 사용한다고 했지만, 눈에 띄는 큰 변화는 없다.  
하지만 최적화된 자식 컴포넌트에 props로 콜백 함수를 내려줄 때 유용할 수 있다.  