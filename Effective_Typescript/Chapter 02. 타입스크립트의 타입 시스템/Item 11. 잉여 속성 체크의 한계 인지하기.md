# Item 11. 잉여 속성 체크의 한계 인지하기
타입이 명시된 변수에 객체 리터럴을 할당할 경우 타입스크립트는 해당 타입의 속성이 있는지, 그리고 **그 외 속성은 없는지** 확인한다.<br>
```javascript
    interface Room {
        numDoor: number;
        ceilingHeightFt: number;
    }

    const r: Room = {
        numDoor: 1,
        ceilingHeightFt: 10,
        elephant: 'presnset',
    //  ~~~~~~~~~~~~~~~~~~~~~ 개체 리터럴은 알려진 속성만 지정할 수 있으며
    //                        'Room' 형식에 'elephant'가 없다. 
    }
```
`Room` 타입에 `elephant` 속성은 구조적 타이핑 관점에서는 오류가 발생하면 안된다.<br>
하지만 임시 변수를 도입할 경우 `Room` 타입에도 할당이 가능하다.<br>
```javascript
    const obj = {
        numDoor: 1,
        ceilingHeightFt: 10,
        elephant: 'presnset',
    };

    const r: Room = obj;    // 정상
```
`obj` 타입은 { numDoor: number; ceilingHeightFt: number; elephant: string } 으로 추론된다.<br>
따라서 `obj` 타입은 `Room` 타입의 부분 집합을 포함하므로, `Room`에 할당 가능하며 타입 체커도 통과한다.<br>

#### 따라서 잉여 속성 체크 역시 조건에 따라 동작하지 않는 한계를 가지는 것을 알 수 있다.<br>또한 통상적인 할당 가능 검사와 함께 쓰이면 구조적 타이핑이 무엇인지 혼란을 야기할 수 있다.
<br>

타입스크립트는 단순히 런타임에 예외를 던지는 코드에 오류를 표시하는 것 뿐 아니라, 의도와 다르게 작성된 코드도 검사하려고 한다.<br>
```javascript
    interface Options {
        title: string;
        darkMode?: boolean;
    }

    function createWindow(options: Options) {
        if (options.darkMode) {
            sestDarkMode();
        }
        // ..
        createWindow({
            title: 'Spider Solitaire',
            darkmode: true
        //  ~~~~~~~~~~~~~~ 개체 리터럴은 알려진 속성만 지정할 수 있지만
        //                 'Options' 형식에 'darkmode'가 없다.
        })
    }
```
앞의 코드는 런타임에서는 어떠한 오류도 발생하지 않는다.<br>
하지만 타입스크립트에서는 `darkmode`가 아닌 `darkMode`이기 때문에 오류가 발생한다.<br>
<br>

```javascript
    const intermediate = { darkmode: true, title: 'Ski Free' };
    const o: Options = intermediate;    // 정상

    const o = { darkmode: true, title: 'Ski Free' } as Options;
```
타입 구문 없는 임시 변수를 사용할 경우에는 오류가 사라진다.<br>
첫 번째 구문의 경우 객체 리터럴이지만, 두 번째 구문은 객체 리터럴이 아니기 때문에 **잉여 속성 체크가 적용되지 않는다**.<br>
또한, **타입 단언문을 사용할 경우에도 적용되지 않는다**.<br>
<br>
## 📝 요약
- **객체 리터럴**을 변수에 할당하거나 함수에 매개변수로 전달할 때 잉여 속성 체크가 수행된다.
- 잉여 속성 체크는 오류를 찾는 효과적인 방법이지만, 타입스크립트 타입 체커가 수행하는 일반적인 구조적 할당 가능성 체크와 역할이 다르다. 할당의 개념을 정확하게 알아야 잉여 속성 체크와 일반적인 구조적 할당 가능성 체크를 구분할 수 있다.
- 잉여 속성 체크에는 한계가 있다. 임시 변수를 도입하면 잉여 속성 체크를 건너뛸 수 있다.