# Item 17. 변경 관련된 오류 방지를 위해 readonly 사용하기
`readonly number[]`는 타입이며, `number[]`과는 구분되는 특징을 가지고 있다.

- 배열의 요소를 읽을 수 있지만, 쓸 수는 없다.
- length를 읽을 수 있지만, 바꿀 수는 없다. (배열 변경 불가)
- 배열을 변경하는 pop을 비롯한 다른 메서드를 호출할 수 없다.

`number[]`는 `readonly number[]`보다 기능이 많기 때문에, `readonly number[]`의 서브 타입이 된다.  
따라서, 변경 가능한 배열을 `readonly` 배열에 할당할 수 있지만 그 반대는 불가능하다.  
  
```typescript
    const a: number[] = [1, 2, 3];
    const b: readonly number[] = a;
    const c: number[] = b;
       // ~ 'readonly number[]' 타입은 'readonly'이므로
       //   변경 가능한 'number[]' 타입에 할당될 수 없다.
```
  
매개변수를 `readonly`로 선언하면 다음과 같은 현상이 발생한다.
- 타입스크립트는 매개변수가 함수 내에서 변경이 일어나는지 체크한다.
- 호출하는 쪽에서는 함수가 매개변수를 변경하지 않는다는 보장을 받게 된다.
- 호출하는 쪽에서 함수에 `readonly` 배열을 매개변수로 넣을 수 있다.

자바스크립트와 타입스크립트에서는 명시적으로 언급하지 않는 한, **함수가 매개변수를 변경하지 않는다**고 가정한다.  
그러나 이러한 암묵적인 방법은 타입 체크에 문제를 이르킬 수 있기 때문에, **명시적인 방법**을 사용하는 것이 좋다.  
  
만약 함수가 매개변수를 변경하지 않는다면, `readonly`로 선언해야 한다.  
더 넓은 타입으로 선언 가능하며, 의도치 않는 변경을 방지하고 이로 인한 단점은 상대적으로 적기 때문이다.  
  
만약 함수가 매개변수를 변경하지 않고도 제어가 가능하다면 `readonly`로 선언하면 된다.
### ✔️ 단, 어떤 함수를 readonly로 만들면, 그 함수를 호출하는 다른 함수도 모두 readonly로 만들어야 한다.
  
> 다른 라이브러리에 있는 함수를 호출하는 경우라면, 타입 선언을 변경할 수 없으므로 <i>타입 단언문 (as number[])</i>을 사용해야 한다.  

```typescript
    function parseTaggedText(lines: string[]): string[][] {
        const paragraphs: string[][] = [];
        const currPara: string[] = [];

        const addParagraph = () => {
            if (currPara.length) {
                paragraphs.push(currPara);      // 별칭 발생
                currPara.length = 0 ;           // 배열을 비움
            }
        };

        for (const line of lines) {
            if (!line) {
                addParagraph();
            } else {
                currPara.push(line);
            }
        }
        addParagraph();
        return paragraphs;
    }

    // result : [ [], [], [] ]
```
위 코드는 별칭과 변경을 동시에 사용하면서 문제가 발생했다.  
`currPara`의 배열의 참조가 삽입되었고, `currPara`에 새 값을 채우거나 지울 경우 동일한 객체를 참조하고 있는 `paragraphs` 요소에도 변경된다.  
  
```typescript
    paragraphs.push(currPara);
    currPara.length = 0 ;           // 배열을 비움
```
이 코드가 새 단락을 `paragraphs`에 삽입하고 바로 삭제한다.  
따라서 `currPara`를 `readonly`로 선언하여 이런 동작을 방지할 수 있지만 몇 가지 오류가 발생한다.
  
```typescript
    function parseTaggedText(lines: string[]): string[][] {
        const paragraphs: string[][] = [];
        const currPara: readonly string[] = [];
        // let currPara: readonly string[] = [];

        const addParagraph = () => {
            if (currPara.length) {
                paragraphs.push(currPara);
                            // ~~~~~~~~~~ 'readonly string []' 형식의 인수는
                            //            'string[]' 형식의 매개변수에 할당될 수 없습니다.
                currPara.length = 0 ;           // 배열을 비움
                      // ~~~~~~ 읽기 전용 속성이기 때문에 'length'에 할당할 수 없습니다.
                // currPara = [];
            }
        };

        for (const line of lines) {
            if (!line) {
                addParagraph();
            } else {
                currPara.push(line);
                      // ~~~~ 'readonly stirng[]' 형식에 'push' 속성이 없습니다.
                // currPara = currPara.concat([line]);
            }
        }
        addParagraph();
        return paragraphs;
    }
```
`currPara`를 `let`으로 선언하고 변환이 없는 매서드를 사용함으로써 두 개의 오류를 수정할 수 있다.  
하지만 여전히 `paragraphs`에 대한 오류가 남아있는데 이러한 오류를 바로 잡는 방법은 세 가지가 있다.
1. `currPara` 복사본 만들기
2. `paragraphs`를 `readonly string[]`의 배열로 변경하기
   - 여기서 괄호가 중요한데, `readonly stirng[][]`은 `readonly` 배열의 변경 가능한 배열이 아니라 변경 가능한 배열의 `readonly` 배열이기 때문
3. `readonly` 속성을 제거하기 위해 단언문 사용하기

### ⚠️ `readonly`는 얕게 동작한다는 것에 유의하며 사용해야 한다.
이런 비슷한 경우가 객체에 사용되는 **Readonly 제너릭**에도 해당된다.  
```typescript
    interface Outer {
        inner: {
            x: number;
        }
    }

    const o: Readonly<Outer> = { inner: { x: 0 } };
    o.inner = { x: 1 };
 // ~~~~~~~ 읽기 전용 속성이기 때문에 'inner'에 할당할 수 없습니다.
    o.inner.x = 1;          // 정상
```
현재 *깊은(deep) readonly* 타입이 기본으로 지원되지 않지만, 제네릭을 만들면 사용할 수 있다.  
하지만 제네릭은 까다롭기 때문에 **라이브러리를 사용하는 것이 좋다**.  
> 인덱스 시그니처에도 readonly를 사용할 수 있다.  
> 읽기는 허용하지만 쓰기를 방지하는 효과를 가진다.  

## 📝 요약
- 만약 함수가 매개변수를 수정하지 않는다면 **readonly**로 선언하는 것이 좋다.
  - readonly 매개변수는 인터페이스를 명확하게 하며, 매개변수가 변경되는 것을 방지한다.
- `readonly`를 사용하면 변경하면서 발생하는 오류를 방지할 수 있고, 변경이 발생하는 코드를 쉽게 탐지 가능하다.
- `readonly`는 얕게 동작한다는 것을 명심해야 한다.