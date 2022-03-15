import './ValidationSample.css'
import { useState } from "react";

const ValidationSample = () => {
    const [form, setForm] = useState({
        password: '',
        clicked: false,
        validatied: false
    });
    const {password, clicked, validatied} = form;

    const onChange = (e) => {
        setForm({
            password: e.target.value
        });
    };

     const onClick = (e) => {
        setForm({
            clicked: true,
            validatied: password === '0000'
        })
     };

     return (
         <div>
             <input
                type='password'
                value={password}
                onChange={onChange}
                className={clicked ? (validatied ? 'success' : 'failure') : ''}
             />
             <button onClick={onClick}>검증하기</button>
         </div>
     )
}

export { ValidationSample };