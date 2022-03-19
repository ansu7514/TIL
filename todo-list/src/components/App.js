import React, { useState } from 'react';
import { PageTemplate } from './PageTemplate';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

const App = (e) => {
    const [state, setState] = useState({
        input: '',  // input 값
        // 일정 데이터 초기값
        todos: [
            { id: 0, text: '리액트 공부하기', done: true },
            { id: 1, text: '컴포넌트 스타일링 해보기', done: false }
        ]
    });
    const { input, todos } = state;

    // input 데이터 받기
    const handleChange = (e) => {
        const { value } = e.target;
        setState({
            input: value,
            todos: [...todos]
        });
    };

    // 새 데이터 추가
    const handleInsert = () => {
        const { todos, input } = state;

        // 새 데이터 객체 만들기
        const newTodo = {
            text: input,
            done: false,
            id: ++todos.id
        };

        // 배열 안에 새 데이터 insert
        setState({
            input: '',
            todos: [...todos, newTodo]
        });
    }

    // check box 이벤트
    const handleToggle = (id) => {
        // id로 배열의 인덱스 find
        const { todos } = state;
        const index = todos.findIndex(todo => todo.id === id);

        // 찾은 데이터의 done 값을 반전
        const toggled = {
            ...todos[index],
            done: !todos[index].done
        };

        // 데이터 수정
        setState({
            input: '',
            todos: [
                ...todos.slice(0, index),
                toggled,
                ...todos.slice(index + 1, todos.length)
            ]
        });
    };

    // todo 제거 이벤트
    const handleRemove = (id) => {
        const { todos } = state;
        const index = todos.findIndex(todo => todo.id === id);

        // 선택한 todo 제거
        setState({
            input: '',
            todo: [
                ...todos.slice(0, index),
                ...todos.slice(index + 1, todos.length)
            ]
        });
    }

    return (
        <PageTemplate>
            <TodoInput onChange={handleChange} onInsert={handleInsert} value={input} />
            <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
        </PageTemplate>
    );
}

export default App;