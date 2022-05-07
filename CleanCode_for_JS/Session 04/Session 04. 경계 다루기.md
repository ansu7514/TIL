# Session 04. 경계 다루기
## 1. min - max
```javascript
  function genRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // 상수
  const MIN_NUMBER = 1;
  const MAX_NUMBER = 45;
  
  genRandomNumber(MIN_NUMBER, MAX_NUMBER);
```
누가 봐도 (최소, 최대)를 받고 있다는 사실을 명시적으로 알 수 있다.<br>
이럴 경우, 함수의 구현부를 보지 않고도 대충 파악할 수 있다.<br>
하지만 팀마다 포함여부에 따라 `min`과 `max`의 기준(경계)가 애매해질 수 있다.
```javascript
  const MAX_AGE = 20;
  
  function insAdult(age) {
    if (age > 20) {
      
    }
  }
```
이상/이하와 초과/미만에 대해서 모호하지 않게 정의를 미리해주어야지 헷갈리지 않을 수 있다.<br>
### 📝 정리
  1. 최소값과 최대값을 다룬다.
  2. 최소값과 최대값 포함 여부를 결정한다. (이상-초과 / 이하-미만)
  3. 혹은 네이밍에 최소값과 최대값 포함 여부를 표현한다.
<br>

## 2. begin - end
```javascript
  function reservationDate(beignDate, endDate) {
    // ...some code
  }
  
  reservationDate('YYYY-MM-DD', 'YYYY-MM-DD');
```
사소하지만 시작날짜와 끝날짜의 변수 설정을 해주고, (시작, 끝)으로 함수를 설정하는 것이 효과적이다.<br>
<br>

## 3. first-last
연속성이 없다면 `min`과 `max`가 아닌 `first`와 `last`를 사용한다.
```javascript
  const students = ['포코', '존', '현석'];
  
  function getStudents(first, last) {
    // ...some code
  }
  
  getStudents('포코', '현셕');
```
위의 예시처럼 시작과 끝은 존재하나 규칙이나 연속성이 보장되어 있지 않다.<br>
dom 요소 속에서의 `first_child`와 `last_child`가 유사한 예제라고 할 수 있다.<br>
