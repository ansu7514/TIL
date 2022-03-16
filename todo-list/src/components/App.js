import React, { Component } from 'react';
import { PageTemplate } from './PageTemplate';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

const App = () => {
    return (
        <PageTemplate>
            <TodoInput/>
            <TodoList/>
        </PageTemplate>
    );
}

export default App;