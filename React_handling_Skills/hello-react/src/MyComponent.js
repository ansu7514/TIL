import PropType from 'prop-types';
import React, { useState } from "react";

const MyComponent = (props) => {
    // state 설정
    const [number] = useState(0);

    return (
        <div>
            <p>안녕하세요, 제 이름은 {props.name}입니다.</p>
            <p>저는 {props.age}살 입니다.</p>
            <p>숫자 : {number}</p>
        </div>
    )
}

MyComponent.defaultProps = {
    name: '안수현',
}

// props 타입 지정
MyComponent.propType = {
    name: PropType.string,
    // 필수적으로 존재해야 하며, 숫자이다.
    age: PropType.number.isRequired
}

export default MyComponent;