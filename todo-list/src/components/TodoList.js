import { TodoItem } from "./TodoItem";

const TodoList = ({ todos, onToggle }) => {
    const todoList = todos.map(
        (todo) => (
            <TodoItem
                key={todo.id}
                done={todo.done}
                onToggle={() => onToggle(todo.id)}
            >
                {todo.text}
            </TodoItem>
        )
    );

    return (
        <div>
            {todoList}
        </div>
    );
};

export { TodoList };