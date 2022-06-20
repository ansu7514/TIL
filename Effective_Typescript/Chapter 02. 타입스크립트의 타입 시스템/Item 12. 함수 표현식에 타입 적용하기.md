# Item 12. 함수 표현식에 타입 적용하기
자바스크립트에서는 함수 `문장(statement)`과 함수 `표현식(expression)`을 다르게 인식한다.<br>
```javascript
    function rollDice1(sides: number): number { /* ... */ };        // 문장
    const rollDice2 = function(sides: number): number { /* ... */}; // 표현식
    const rollDice3 = (sides: number): number => { /* ... */ };     // 표현식
```
#### 타입스크립트에서는 **함수 표현식**을 사용하는 것이 좋다.
함수의 매개변수부터 반환값까지 전체를 함수 타입으로 선언하여 함수 표현식에 재사용할 수 있는 장점이 있기 때문이다.<br>
```javascript
    type DiceRollFn = (sides: number) => number;
    const rollDice: DiceRollFn = sides => {
        return sides
    };
```
타입스크립트에서는 sides의 타입을 `number`로 인식하고 있다.<br>
```javascript
    type BinaryFn = (a: number, b: number) => number;
    const add: BinaryFn = (a, b) => a + b;
    const sub: BinaryFn = (a, b) => a - b;
    const mul: BinaryFn = (a, b) => a * b;
    const div: BinaryFn = (a, b) => a / b;
```
함수 타입의 선언은 불필요한 코드의 반복을 줄인다.<br>
반복되는 함수 시그니처 또한 하나의 함수 타입으로 통합할 수 있다.<br>
<br>
`fetch` 함수는 특정 리소스에 HTTP 요청을 보낸며, response.json() 또는 response.text()를 사용해 응답의 데이터를 추출한다.<br>
그러나 만약 존재하지 않는 API라면 응답이 `JSON` 형식이 아닐 수 있다.<br>

#### 따라서, 상태 체크를 수행해 줄 함수를 사용해야 한다.

```javascript
    declare function fetch(
        input: RequestInfo, init?: RequestInit
    ): Promise<Response>;

    // 함수 타입
    async function checkedFetch(input: RequestInfo, init?: RequestInit) {
        const response = await fetch(input, init);
        if (!response.ok) {
            // 비동기 함수 내에서 거절된 프로미스로 변환한다.
            throw new Error('Request failed: ' + response.status);
        }
        return response;
    }

    // 함수 표현식
    const checkedFetch: typeof fetch = async (input, init) => {
        const response = await fetch(input, init);
        if (!response.ok) {
            throw new Error('Request failed: ' + response.status);
        }
        return response;
    }
```
함수 문장을 함수 표현식으로 바꿨으며 함수 전체 타입(typeof fetch)을 적용했다.<br>
이는 타입스크립트가 `input`과 `init`의 타입을 추론할 수 있게 해준다.<br>
<br>
따라서, 함수의 매개변수에 타입을 선언하는 것보다 **함수 표현식 전체 타입**을 정의하는 것이 코드가 간결해진다.<br>
<br>
## 📝 요약
- 함수 표현식 전체에 타입 구문을 적용하는 것이 좋다.
- 만약 같은 타입 시그니처를 반복적으로 작성한 코드가 있다면 함수 타입을 분리해 내거나 이미 존재하는 타입을 찾아보도록 해야 한다.
- 다른 함수의 시그니처를 참조하기 위해서는 `typeof fn`을 사용하면 된다.