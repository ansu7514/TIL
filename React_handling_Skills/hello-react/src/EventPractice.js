const EventPractice = () => {
    return (
        <div>
            <h1>이벤트 연습</h1>
            <input
                type="text"
                name="message"
                placeholder="아무거나 입력해보세요"
                onChange={(e) => {
                        // 입력 변화값 콘솔에 출력
                        console.log(e.target.value);
                    }
                }
            ></input>
        </div>
    )
}

export default EventPractice;