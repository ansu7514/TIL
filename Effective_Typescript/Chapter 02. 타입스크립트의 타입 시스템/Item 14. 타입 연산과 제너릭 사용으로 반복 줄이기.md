# Item 14. 타입 연산과 제너릭 사용으로 반복 줄이기
개발자가 지켜야 할 원칙 중에서, **DRY (don't repeat yourself) 원칙**이 있다.  
타입스크립트에서는 타입의 중복도 해당 원칙에 포함된다.  
  
타입 간에 매핑하는 방법을 익히면, 타입 정의에서도 DRY 원칙을 따를 수 있다.  
반복을 줄이는 방법은 다음과 같다.

## 💡 타입에 이름 붙이기
```typescript
    function distance(a: {x: number, y: number}, b: {x: number, y: number}) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }
```
```typescript
    interface Point2D {
        x: number;
        y: number;
    }
    function distance(a: Point2D, b: Point2D) { /* ... */ }
```
위 코드는 상수를 사용해서 반복을 줄이는 기법을 동일하게 타입 시스템에 적용한 것이다.  

## 💡 인덱싱을 사용하기
```typescript
    interface State {
        userId: string;
        pageTitle: string;
        recentFiles: string[];
        pageContents: string;
    }

    interface TopNavState {
        userId: string;
        pageTitle: string;
        recentFiles: string[];
    }
```
위 예시에서 `TopNavState`를 `State`에 구성하기보다는, `State`의 부분 집합으로 `TopNavState`를 정의하는 것이 바람직해보인다.  
이 방법은 `State`를 하나의 인터페이스로 유지할 수 있도록 한다.  
```typescript
    type TopNavState = {
        userId: State['userId'];
        pageTitle: State['pageTitle'];
        recentFiles: State['recentFiles'];
    };

    type TopNavState = {
        [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k]
    };
```  
`State`를 인덱싱하여 속성의 타입에서 중복을 제거할 수 있지만, 중복 제거가 완벽하게 되지는 않는다.  
*매핑된 타입*을 사용하면 이러한 문제를 해결할 수 있다.  