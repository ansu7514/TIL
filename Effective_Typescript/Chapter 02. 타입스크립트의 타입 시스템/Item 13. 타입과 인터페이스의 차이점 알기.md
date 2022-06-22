# Item 13. 타입과 인터페이스의 차이점 알기
```javascript
    type TState = {
        name: string;
        capital: string;
    }

    interface IState = {
        name: string;
        capital: string;
    }
```
타입스크립트에서 명명된 타입을 정의하는 방법에는 **타입 방법**과 **인터페이스 방법**이 있다.<br>
> 명명된 타입을 정의할 때 클래스를 사용할 수도 있지만,<br>
> 클래스는 값으로도 쓰일 수 있는 자바스크립트 런타임 개념이므로 사용하지 않는다.<br>
<br>

### ⭕ 타입과 인터페이스 공통점
```javascript
    const wyoming: TState {
        name: 'Wyoming',
        capital: 'Cheyenne',
        population: 500_000
     // ~~~~~~~~~~ ... 형식은 'TState'에 할당할 수 없다.
     //            개체 리터럴은 알려진 속성만 지정할 수 있으며
     //            'TState' 형식에 'population'이 없다.
    }
```
추가 속성을 함께 할당할 경우, 동일한 오류가 발생한다.<br>
인덱스 시그니처는 인터페이스와 타입에서 모두 사용할 수 있으며 함수 타입도 정의할 수 있다.<br>
```javascript
    // 인덱스 시그니처
    type TDict = { [key: string]: string };
    interface IDict = {
        [key: string]: string;
    }

    // 함수 타입
    type TFn = (x: number) => string;
    interface IFn = {
        (x: number): string;
    }

    const toStrT: TFn = x = > '' + x;       // 정상 
    const toStrI: IFn = x = > '' + x;       // 정상 
```
이런 단순한 함수 타입에는 타입 별칭이 더 나은 선택이지만, 함수 타입에 추가적인 속성이 있을 경우, 둘 중 어떤 것을 선택하든 차이가 없다.<br>
또한, 타입 별칭과 인터페이스는 모두 제너릭이 가능하다.<br>
<br>

### ❌ 타입과 인터페이스 차이점
```javascript
    type AorB = 'a' | 'b';

    type Input = { /* ... */ };
    type Output = { /* ... */ };
    interface VariableMap {
        [name: string]: Input | Output;
    }
```
인터페이스는 타입을 확장할 수 있지만, **유니온을 할 수 없다**.<br>
그런데 유니온 타입을 확장이 필요한 경우가 있다.<br>
이러한 타입은 **인터페이스로 표현할 수 없다**.<br>
<br>

#### `type` 키워드는 일반적으로 `interface`보다 쓰임새가 많다.
인터페이스로 튜플과 비슷하게 구현하면 튜플에서 사용할 수 있는 `concat` 같은 메서드를 사용할 수 없다.<br>
그러므로 튜플은 타입 키워드로 구현하는 것이 좋다.<br>

```javascript
    interface IState {
        name: string;
        capital: string;
    }
    interface IState {
        population: number;
    }

    const wyoming: IState {
        name: 'Wyoming',
        capital: 'Cheyenne',
        population: 500_000
    };  // 정상
```
#### 반면, 인터페이스에는 <i>보강(argument)</i>이 가능하다.

위 예제처럼 속성을 확장하는 것을 <b>선언 병합(declaration merging)</b>이라고 한다.<br>
선언 병합은 주로 타입 선언 파일에서 사용된다.<br>
<br>
## 📝 요약
- 타입과 인터페이스의 차이점과 공통점을 이해해야 한다.
- 한 타입을 `type`과 `interface` 두 가지 문법을 사용해서 작성하는 방법을 터득해야 한다.
- 프로젝트에서는 한 가지 일관된 스타일을 확립하고, 보강 기법이 필요한지 고려한다.