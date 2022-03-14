import PropType from 'prop-types';

const MyComponent = (props) => {
    return (
        <div>
            안녕하세요, 제 이름은 {props.name}입니다.
        </div>
    )
}

MyComponent.defaultProps = {
    name: '안수현',
}

// props 타입 지정
MyComponent.propType = {
    name: PropType.string
}

export default MyComponent;