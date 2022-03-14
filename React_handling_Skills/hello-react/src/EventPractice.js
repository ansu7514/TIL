import React, { useState } from "react";

const EventPractice = () => {
    const [message, setState] = useState('');

    return (
        <div>
            <h1>이벤트 연습</h1>
            <input
                type="text"
                name="message"
                placeholder="아무거나 입력해보세요"
                onChange={(e) => {
                        // state에 input 입력값 담기
                        setState(e.target.value);
                        console.log(message);
                    }
                }
            ></input>
        </div>
    )
}

export default EventPractice;