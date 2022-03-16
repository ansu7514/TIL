import { TodoItem } from "./TodoItem";

const TodoList = ({ todos }) => {
    const todoList = todos.map(
        todo => (
            <TodoItem
                key={todo.id}
                done={todo.done}
            >
                {todo.text} 
            </TodoItem>
        )
    )

    return (
        <div>
            {todoList}
        </div>
    );
};

export { TodoList };