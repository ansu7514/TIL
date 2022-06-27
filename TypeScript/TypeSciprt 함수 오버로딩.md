# TypeScript 함수 오버로딩
## 🧐 함수 오버로딩이란?
- 동일한 이름의 **매개 변수만 다른** 여러 버전의 함수를 만드는 것을 함수 오버로딩이라고 한다.
- 파라미터의 형태가 다양한 여러 케이스에 대응하는 같은 이름을 가진 함수를 만드는 것이다.
- 함수의 **다형성**을 지원한다.
- `function` 키워드로만 함수를 오버로딩 할 수 있으며 `arrow function`으로는 오버로딩을 할 수 없다.
  
## 📝 함수 오버로딩 사용 방법
```javascript
    function double(str: string): string;
    function double(num: number): number;
    function double(arr: boolean[]): boolean[];
```
```javascript
    function double(arg) {
        if (typeof arg === 'string') {
            return `${arg}${arg}`;
        } else if (typeof arg === 'number') {
            return arg * 2;
        } else if (Array.isArray(arg)) {
            return arg.concat(arg);
        }
    };

    const num = double(3); // number
    const str = double('ab'); // string
    const arr = double([true, false]); // boolean[]
```
파라미터만 달라지고, 비슷한 로직이 반복되는 경우에 사용할 수 있다.  
코드의 중복을 줄이고 재사용성을 높이기 위해서는 **Function Overloading**을 사용해야 한다.  
  
## ✔️ 함수 오버로딩을 위해 해야하는 2가지
1. **선언** : 함수가 어떤 파라미터 타입을 다룰 것인지 선언
2. **구현** : 각 파라미터 타입에 대응하는 구체적인 코드를 작성
  
## ‼️ 함수 오버로딩 선언할 때 주의할 점
함수의 이름은 동일해야하며, 매개변수의 순서는 서로 같아야 한다.  
(매개변수가 추가되는 것은 가능하지만, 순서는 필수적으로 지켜주어야 한다.)  
  
## 💡 제너릭과의 차이점
| |타입 추론 시점|용도의 범위|
|---|---|---|
|제너릭|사용되는 시점|제너릭 타입, 인터페이스, 클래스, 함수, 메서드 등|
|함수 오버로딩|타입을 선언하는 시점|함수, 메서드|
  
함수 파라미터에 들어갈 타입을 알고 있고, 파라미터 타입만 변경되고 함수의 로직이 반복 → **함수 오버로딩**  
어떤 타입이 오는지 결정되지 않았으며, 타입을 다양한 용도에서 사용 → **제너릭**