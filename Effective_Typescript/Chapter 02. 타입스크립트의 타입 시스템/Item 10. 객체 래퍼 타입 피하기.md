# Item 10. 객체 래퍼 타입 피하기
자바스크립트에는 객체 이외에도 기본형 타입(`string, number, boolean, null, undefined, symbol, bigint`)이 있다.<br>
기본형들은 **불변**이며 **메서드를 가지지 않는다**는 점에서 객체와 구분된다.<br>

```javascript
    'primative'.charAt(3)
    // "m"
```
여기서 `charAt`은 `string`의 메서드가 아니라 객체 타입 `String`의 메서드로 사용되었다.<br>
`string` 기본형을 `String` 객체로 래핑한 뒤, 메서드를 호출하고 마지막에 래핑한 객체를 버린다.<br>
<br>

```javascript
    const originalCharAt = String.prototype.charAt;
    String.prototype.charAt = function (ops) {
        console.log(this, typeof this, pos);
        return originalCharAt.call(this, pos);
    };
    console.log('primative'.charAt(3));

    // [String: 'primative'] 'object' 3
    // m
```
메서드 내의 `this`는 `String` 객체 래퍼이다.<br>
`String` 객체는 직접 생성할 수 있으며, `string` 기본형처럼 동작한다.<br>
<br>

하지만 언제나 동일하게 작동하지는 않는다.<br>
대표적으로 `String` 객체는 오직 객체 자신하고만 동일하다.<br>
<br>

이러한 래퍼 타입들 덕분에 기본형 값에 메서드를 사용할 수 있으며, 정적 메서드도 사용할 수 있다.<br>
하지만 `string`을 사용할 때는 특히 유의해야한다.<br>
<br>

```javascript
    // 기본형 string
    function getStringLen(foo: String) {
        return foo.length;
    }

    getStringLen("hello");                  // 정상
    getStringLen(new String("hello"));      // 정상

    // 객체 래퍼 String
    function isGreeting(phrase: String) {
        return [
            'hello',
            'good day'
        ].includes(phrase);
                // ~~~~~~
                // 'String' 형식 인수는 'string' 형식의 매개변수에 할당될 수 없다.
                // 'string'은 기본 개체지만 'String'은 래퍼 객체이다.
                // 가능하면 'string'을 사용해야 한다.
    }
```
### `string`은 `String`에 할당할 수 있지만, `String`은 `string`에 할당할 수 없다.
<br>

## 📝 요약
- 기본형 값에 메서드를 제공하기 위해 객체 래퍼 타입이 어떻게 쓰이는지 이해해야 한다. 직접 사용하거나 인스턴스를 생성하는 것은 피해야 한다.
- 타입스크립트 객체 래퍼 타입은 지양하고, 대신 **기본형 타입을 사용**해야 한다.
  - String → string
  - Number → number
  - Boolean → boolean
  - Symbol → symbol
  - Bigint → bigint