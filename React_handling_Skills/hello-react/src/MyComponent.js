import PropType from 'prop-types';

const MyComponent = (props) => {
    return (
        <div>
            <p>안녕하세요, 제 이름은 {props.name}입니다.</p>
            <p>저는 {props.age}살 입니다.</p>
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