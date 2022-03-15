import React, { useState } from "react";

const EventPractice = () => {
    const [message, setState] = useState('');

    const onChange = (e)=> {
        setState(e.target.value);
    }

    const onClick = () => {
        alert(message);
        setState('');
    }

    return (
        <div>
            <h1>이벤트 연습</h1>
            <input
                type="text"
                name="message"
                placeholder="아무거나 입력해보세요"
                // input 값 관리해야 할 때는 value 필수!
                value={message}
                onChange={onChange}
            />
            <button onClick={onClick}>확인</button>
        </div>
    )
}

export default EventPractice;