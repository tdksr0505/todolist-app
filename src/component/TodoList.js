import TodoItem from './TodoItem';
import React from 'react';
import styled from 'styled-components';
const ListArea = styled.div`
    background-color: #96c0fd;
    padding: 40px 30px;
    border-radius: 20px;
    max-height: calc(100vh - 300px);
    overflow-y: scroll;
`;

class TodoList extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { todos, onDeleteTodo, onToggleTodo, onUpdateTodo } = this.props;
        const todoElements = todos.map((todo, idx) => (
            <TodoItem
                key={todo.id}
                title={todo.title}
                completed={todo.completed}
                onDelete={() => onDeleteTodo && onDeleteTodo(todo.id)}
                onUpdate={(title) => onUpdateTodo && onUpdateTodo(todo.id, title)}
                onToggle={() => onToggleTodo && onToggleTodo(todo.id)}
                listScrollDown={this.listScrollDown}
            />
        ));
        return <ListArea id="list_area">{todoElements}</ListArea>;
    }
}
export default TodoList;
