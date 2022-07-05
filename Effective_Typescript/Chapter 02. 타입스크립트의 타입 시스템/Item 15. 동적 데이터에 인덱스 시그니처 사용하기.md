# Item 15. 동적 데이터에 인덱스 시그니처 사용하기
타입스크립트에서는 타입에 *인덱스 시그니처*를 명시하여 매핑을 표현할 수 있다.  
```typescript
    type Rocket = {[property: string]: string};
    const rocket: Rocket = {
        name: 'Falcon 9',
        variant: 'v1.0',
        thrust: '4,940 kN',
    };  // ok
```
`[property: string]: string`이 **인덱스 시그니처**이며, 3가지 의미를 가진다.  

- **키의 이름** : 키의 위치만 표시하는 용도이며, 타입 체커에서는 사용하지 않는다.
- **키의 타입** : `string`이나 `number` 또는 `symbol`의 조합이어야 하지만 보통은 `string`을 사용한다.
- **값의 타입** : 어떤 값이든 가능하다.

다만, 타입 체크가 수행된다면 단점이 드러나게 된다.

- 잘못된 키를 포함해 모든 키를 허용한다.
  - ex) `name` 대신 `Name`을 사용해도 유효한 Rocket 타입으로 인정된다.
- 특정 키가 필요하지 않는다. {}도 유효한 Rocket 타입이 된다.
- 키마다 다른 타입을 가질 수 없다.
- 타입 스크립트 언어 서비스를 모두 사용하지는 못한다.

### 🤔 결과적으로 인덱스 시그니처는 부정확하므로 다른 방법을 찾아야 한다.

## Record 사용하기
`Record`는 키 타입에 유연성을 제공하는 제너릭 타입이다.  
특히, `string`의 부분 집합에서 사용할 수 있다.  
```typescript
    type Vec3D = Record<'x' | 'y' | 'z' , number>;
    // Type Vec3D = {
    //     x: number;
    //     y: number;
    //     z: number;
    // }
```
  
## 매핑된 타입 사용하기
매핑된 타입은 키마다 별도의 타입을 사용해 준다.  
```typescript
    type Vec3D = {[k in 'x' | 'y' | 'z']: number};
    // Type Vec3D = {
    //     x: number;
    //     y: number;
    //     z: number;
    // }
```
<br>

## 📝 요약
- 런타임 때까지 객체 속성을 알 수 없는 경우에만 인덱스 시그니처를 사용해야 한다.
- 안전한 접근을 위해 인덱스 시그니처 값 타입에 undefined를 추가하는 것을 고려해야 한다.
- 가능하다면 인터페이스, Record, 매핑된 타입 같은 인덱스 시그니처보다 정확한 타입을 사용하는 것이 좋다.