# Item 18. 매핑된 타입을 사용하여 값을 동기화하기
불필요한 작업을 피하기 위해, 필요할 때만 다시 UI 컴포넌트를 그려야 한다.  
이런 종류의 최적화는 *리액트 컴포넌트*에서는 일반적인데, 렌더링 시 이벤트 핸들러 `Prop`이 새 화살표 함수로 설정된다.  
> 리액트의 `useCallback` 훅은 렌더링할 때마다 새 함수를 생성하지 않도록 하는 또 다른 기법이다.  

이러한 최적화에는 2가지 방법이 있다.

## ✅ 보수적(conservative) 접근법
```typescript
    function shouldUpdate(
        oldProps: ScatterProps,
        newProps: ScatterProps
    ) {
        let k: keyof ScatterProps;
        for (k in oldProps) {
            if (oldProps[k] !== newProps[k]) {
                if (k !== 'onClick') return true;
            }
        }
        return false;
    }
```
만약 새로운 속성이 추가될 경우, `shouldUpdate` 함수는 값이 변경될 때 UI를 다시 생성할 것이다.  
이러한 방법을 **보수적 접근법** 또는 **실패에 닫힌 접근법**이라고 한다.  
#### ✔️ 이러한 접근법은 차트가 정확하다는 장점이 있지만, 너무 자주 그려지는 단점을 가지게 된다.

## ✅ 실패에 열린 접근법
```typescript
    function shouldUpdate(
        oldProps: ScatterProps,
        newProps: ScatterProps
    ) {
        return (
            oldProps.xs !== newProps.xs ||
            oldProps.ys !== newProps.ys ||
            oldProps.xRange !== newProps.xRange ||
            oldProps.yRange !== newProps.yRange ||
            oldProps.color !== newProps.color
            // (no check for onClick)
        );
    }
```
위 코드는 UI를 불필요하게 다시 그리는 단점을 해결했지만, 다시 그려야하는 경우를 누락하는 경우도 발생할 수 있다.  
이는 *우선, 망치지 말 것(first, do no harm)* 이라는 원칙을 어기기 때문에 일반적으로 사용되지는 않는다.  
  
따라서 앞선 두 가지 최적화 방법 모두 이상적이지 않으며, 직접 수정하는 것이 효율적이다.👍
### 여기서 핵심은 매핑된 타입과 객체를 사용하는 것이다.

```typescript
    const REQUIRES_UPDATE: {[k in keyof ScatterProps]: boolean} = {
        xs: true,
        ys: true,
        xRange: true,
        yRange: true,
        color: true,
        onClick: false,
    };

    function shouldUpdate(
        oldProps: ScatterProps,
        newProps: ScatterProps
    ) {
        let k: keyof ScatterProps;
        for (k in oldProps) {
            if (oldProps[k] !== newProps[k] && REQUIRES_UPDATE[k]) {
                return true;
            }
        }
        return false;
    }
```
나중에 `ScatterProps`에 새로운 속성을 추가하는 경우, `REQUIRES_UPDATE` 정의에 오류가 발생하게 된다.  
이런 방식은 오류를 정확하게 잡을 수 있다.  
  
매핑된 타입은 한 객체가 또 다른  객체와 정확히 같은 속성을 가질게 할 때 이상적이다.  
매핑된 타입을 사용할 경우, 타입스크립트가 코드에 제약을 강제하도록 할 수 있다.

## 📝 요약
- 매핑된 타입을 사용해서 관련된 값과 타입을 동기화하도록 한다.
- 인터페이스에 새로운 속성을 추가할 경우, 선택을 강제하도록 매핑된 타입을 고려해야 한다.