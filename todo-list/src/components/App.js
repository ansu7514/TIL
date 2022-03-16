import React, { Component, useState } from 'react';
import { PageTemplate } from './PageTemplate';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

const App = (e) => {
    const [state, setState] = useState({
        input: '',  // input 값
        // 일정 데이터 초기값
        todos: [
            { id: 0, text: '리액트 공부하기', done: true },
            { id: 1, text: '컴포넌트 스타일링 해보기', done: false },

        ]
    });

    // 일정 데이터 안에 들어가는 id 값
    let id = 1;
    const getId = () => {
        return ++id;
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setState({
            input: value
        });
    }

    // 새 데이터 추가
    const handleInsert = () => {
        const { todos, input } = state;

        // 새 데이터 객체 만들기
        const newTodo = {
            text: input,
            done: false,
            id: this.getId()
        };

        // 배열 안에 새 데이터 insert
        setState({
            todos: [...todos, newTodo],
            input: ''
        });
    }

    const { input, todos } = state;

    return (
        <PageTemplate>
            <TodoInput onChange={handleChange} onInsert={handleInsert} value={input} />
            <TodoList todos={todos} />
        </PageTemplate>
    );
}

export default App;