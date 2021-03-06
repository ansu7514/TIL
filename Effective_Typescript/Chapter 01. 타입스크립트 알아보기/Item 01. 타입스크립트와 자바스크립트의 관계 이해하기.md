# Item 01. 타입스크립트와 자바스크립트 관계 이해하기
<h4>타입스크립트는 자바스크립트 상위집합이다</h4>
즉, 자바스크립트 프로그램에 문법 오류가 없다면 유효한 타입스크립트 프로그램이다.<br>
자바스크립트 문법 오류가 없어도 이슈가 있다면 타입 체커에게 지적당할 가능성이 높다.<br>
하지만 <b>문법의 유효성과 동작의 이슈는 독립적</b>이기 때문에 타입스크립트는 여전히 작성된 코드를 파싱하고 자바스크립트로 변환이 가능 하다.<br>
<br>
<img src="https://velog.velcdn.com/images%2Fboram_in%2Fpost%2Fd7cd0fec-72b9-4c66-b22f-8e314be6f15f%2Fimage.png">
자바스크립트 파일이 .js, jsx 확장자를 사용하는 반면 타입스크립트는 .ts, .tsx 를 사용한다.<br>
상위 집합이므로 .js파일에 있는 코드는 이미 타입스크립트라고 할 수 있다.<br>
이러한 특성으로 인해서 ⭐ <b>기존에 존재하는 자바스크립트 코드를 타입스크립트로 migration 하는데 엄청난 이점</b> ⭐을 가진다.<br>
<br>
타입시스템의 목표 중 하나는 런타임에서 오류를 발생시킬 코드를 미리 찾아 내는 것이다.<br>
타입스크립트가 정적 타입 시스템이라는 것은 바로 이런 특징을 가지게 한다.<br>
그러나 타입 체커가 모든 오류를 찾아내지는 않는다.<br>

### 타입스크립트 타입 시스템은 자바스트립트의 런타임 동작을 '모델링'한다.
- 타입스크립트는 자바스크립트 런타임 동작을 모델링하는 타입 시스템을 가지고 있기 때문에 런타임 오류를 발생시키는 코드를 찾아내려 한다.
  그러나 모든 오류를 찾아내리라 기대하면 안 된다. 타입 체커를 통과하면서도 런타임 오류를 발생시키는 코드는 충분히 존재할 수 있다.
- 잘못된 매개변수 개수로 함수를 호출하는 경우처럼, 자바스크립트에는 허용되지만 타입스크립트에서는 문제가 되는 경우도 있다.
