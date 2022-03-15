import React, { useState } from "react";

const EventPractice = () => {
    const [form, setForm] = useState({
        username: '',
        message: ''
    });
    const {username, message} = form;

    const onChange = (e)=> {
        const newForm = {
            ...form,
            [e.target.name]: e.target.value
        };

        setForm(newForm);
    }

    const onClick = () => {
        alert(username + " : " + message);
        setForm({
            username: '',
            message: ''
        })
    }

    return (
        <div>
            <h1>이벤트 연습</h1>
            <input
                type="text"
                name="username"
                placeholder="유저명"
                value={username}
                onChange={onChange}
            />
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