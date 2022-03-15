import { useState } from 'react';

const IterationSample = () => {
    const [state, setState] = useState({
        names: ['눈사람', '얼음', '눈', '바람'],
        name: ''
    });
    const {names, name} = state;

    const onChange = (e) => {
        // state 안 값이 2개 이상이면
        // newForm 생성해야함
        const newFrom = {
            ...state,
            name: e.target.value
        };

        setState(newFrom);
    };

    const insert = () => {
        setState({
            names: names.concat(name),
            name: ''
        });
    };

    const remove = (index) => {
        const { names } = state;

        setState({
            // 요약
            // names: [
            //     ...names.slice(0, index),
            //     ...names.slice(index + 1, names.length)
            // ]
            names: names.filter((item, i) => i !== index)
        });
    };

    const nameList = names.map(
        (name, index) => (
            <li 
                key={index}
                onDoubleClick={() => {
                    remove(index)
                }}
            >{name}</li>
        )
    );

    return (
        <div>
            <input
                onChange={onChange}
                value={state.name}
            />
            <button onClick={insert}>추가</button>
            <ul>
                {nameList}
            </ul>
        </div>
    )
}

export { IterationSample };