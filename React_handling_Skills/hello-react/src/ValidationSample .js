import './ValidationSample.css'
import { useState, useRef } from "react";

const ValidationSample = () => {
    const [form, setForm] = useState({
        password: '',
        clicked: false,
        validatied: false
    });
    const {password, clicked, validatied} = form;

    // ref 생성
    const pwInput = useRef(); 

    const onChange = (e) => {
        setForm({
            password: e.target.value
        });
    };

     const onClick = (e) => {
        setForm({
            clicked: true,
            validatied: password === '0000'
        });

        // 특정 DOM에 적용하고자 할 때
        pwInput.current.focus();
     };

     return (
         <div>
             <input
                type='password'
                value={password}
                onChange={onChange}
                className={clicked ? (validatied ? 'success' : 'failure') : ''}
                ref={pwInput}
             />
             <button onClick={onClick}>검증하기</button>
         </div>
     )
}

export { ValidationSample };