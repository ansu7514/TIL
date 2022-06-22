# Type과 Interface의 공통점과 차이점
## 👌 Type과 Interface의 공통점
### 타입에 대한 이름 지어주기
`Type`과 `Interface`는 모두 타입에 대해 이름을 지어줄 수 있다.<br>
```javascript
// type
type Person = {
  name: string;
  age: number;
};

// interface
interface Person {
  name: string;
  age: number;
}javascript
```

### 제한적으로 여러 타입에 대한 관계 정의
`Type`과 `Interface` 모두 `Interface`에 대한 `extends`와 `Class`에 대한 `implements` 키워드를 사용하여 관계를 정의할 수 있다.<br>
<br>

**‼️ 단, 객체 타입이나 객체 타입 간의 곱 타입 (Intersection Type), 즉 정적으로 모양을 알 수 있는 객체 타입에만 동작한다. ‼️**<br>
따라서 유니온 타입에서는 `extends`와 `implments` 대신 다른 키워드로 관계를 정의해야 한다.<br>

```javascript
type TBase = {
  t: number;
};

interface IBase {
  i: number;
};

// extends
interface I1 extends TBase {};
interface I2 extends IBase {};

// implements
class C1 implements TBase {
  constructor(public t: number) {}
};
class C2 implements IBase {
  constructor(public i: number) {}
};javascript
```

### 이외에도...
위 두가지 이외에도, 제네릭도 비슷한 방식으로 사용할 수 있다.<br>
<br>

## ⚠️ Type과 Interface의 차이점
### 확장하는 방법
```javascript
interface PeopleInterface {
  name: string
  age: number
}

interface StudentInterface extends PeopleInterface {
  school: string
}
```
```javascript
type PeopleType = {
  name: string
  age: number
}

type StudentType = PeopleType & {
  school: string
}
```

### 선언적 확장
`interface`에서 할 수 있는 대부분의 기능들은 `type`에서 가능하지만,<br>
`type`에서는 새로운 속성을 추가하기 위해서 다시 같은 이름으로 선언할 수 없지만, `interface`는 항상 선언적 확장이 가능하다는 차이점이 있다.<br>
```javascript
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

// 같은 interface 명으로 Window를 다시 만든다면, 자동으로 확장이 된다.
const src = 'const a = "Hello World"'
window.ts.transpileModule(src, {})
```
```javascript
type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI
}

// Error: Duplicate identifier 'Window'
```

### interface는 객체에만 사용이 가능하다.
```javascript
interface FooInterface {
  value: string
}

type FooType = {
  value: string
}

type FooOnlyString = string
type FooTypeNumber = number

// 불가능
interface X extends string {}
```

### computed value의 사용
`type`은 가능하지만 `interface`는 불가능하다.<br>
```javascript
type names = 'firstName' | 'lastName'

type NameTypes = {
  [key in names]: string
}

const yc: NameTypes = { firstName: 'hi', lastName: 'yc' }

interface NameInterface {
  // error
  [key in names]: string
}
```

### 성능을 위해서는 interface를 사용하는 것이 좋다.
여러 `type` 혹은 `interface`를 **&**하거나 **extends**할 때를 생각해보자.<br>
<br>
`interface`는 속성간 충돌을 해결하기 위해 단순한 객체 타입을 만든다.<br>
왜냐하면 `interface`는 객체의 타입을 만들기 위한 것이고, 어차피 객체만 오기 때문에 단순히 합치기만 하면 되기 때문이다.<br>
<br>
타입의 경우, 재귀적으로 순회하면서 속성을 머지하는데, 이 경우에 일부 never가 나오면서 제대로 머지가 안될 수 있다.<br>
`type`은 원시 타입이 올 수도 있으므로, 충돌이 나서 제대로 머지가 안되는 경우에는 never가 떨어진다.<br>

```javascript
type type2 = { a: 1 } & { b: 2 } // 잘 머지됨
type type3 = { a: 1; b: 2 } & { b: 3 } // resolved to `never`

const t2: type2 = { a: 1, b: 2 } // good
const t3: type3 = { a: 1, b: 3 } // Type 'number' is not assignable to type 'never'.(2322)
const t3: type3 = { a: 1, b: 2 } // Type 'number' is not assignable to type 'never'.(2322)javascript
```
따라서 타입 간 속성을 머지할 때는 주의를 필요한다.<br>
 
### ⭐ 어차피 객체에서만 쓰는 용도라면, interface를 사용하는 것이 좋다. ⭐
> 타입 합성의 경우, 합성에 자체에 대한 유효성을 판단하기 전에,<br>
> 모든 구성요소에 대한 타입을 체크하므로 컴파일 시에 상대적으로 성능이 좋지 않다.<br>

<br>

## 🤔 결과적으로..
프로젝트에서 TypeScript를 사용할 때 `type`을 쓸지 `interface`를 쓸지 통일하는 것이 좋다.<br>
하지만, 객체나 타입 간의 합성 등을 고려해보았을 때,` interface`를 사용하는 것을 좀 더 추천한다.<br>