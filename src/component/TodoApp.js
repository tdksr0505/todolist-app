import Header from './Header';
import InputField from './InputField';
import TodoList from './TodoList';
import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';
const SubmitArea = styled.div`
    margin-bottom: 20px;
    text-align: center;
    input {
        height: 30px;
        border-radius: 10px;
        border: 2px solid #0072ff;
        width: 98%;
        font-size: 20px;
        padding: 5px;
    }
`;
const Container = styled.div`
    width: 800px;
    display: block;
    margin: auto;
`;
class TodoApp extends React.Component {
    constructor() {
        super();
        const todos = this._createTodoList();
        this.state = {
            todos: todos,
        };
    }

    render() {
        const { todos } = this.state;

        return (
            <Container>
                <Header appName="Todo List" todosCnt={todos.filter((todo) => !todo.completed).length} />
                <SubmitArea>
                    <InputField
                        placeholder="輸入代辦清單"
                        inputType="create"
                        onSubmitTodo={(title) =>
                            this.setState({
                                todos: this._createTodo(todos, title),
                            })
                        }
                    />
                </SubmitArea>
                <TodoList
                    todos={todos}
                    onUpdateTodo={(id, title) =>
                        this.setState({
                            todos: this._updateTodo(todos, id, title),
                        })
                    }
                    onToggleTodo={(id) =>
                        this.setState({
                            todos: this._toggleTodo(todos, id),
                        })
                    }
                    onDeleteTodo={(id) =>
                        this.setState({
                            todos: this._deleteTodo(todos, id),
                        })
                    }
                />
            </Container>
        );
    }
    _createTodoList() {
        let todosTitleAry = [
            'Email team for update',
            'Send out meeting request',
            'Prepare a desk for next meeting',
            'Update project plan',
            // 'Create a meeting agenda',
            // 'Answer tech team queries',
            // 'Book conference room',
        ];
        let todos = [];
        let start_id = new Date().getTime();
        todosTitleAry.forEach((elem) => {
            let obj = {
                id: start_id++,
                title: elem,
                completed: false,
            };
            todos.push(obj);
        });
        return todos;
    }
    _createTodo(todos, title) {
        todos.push({
            id: new Date().getTime(),
            title,
            completed: false,
        });
        return todos;
    }

    _updateTodo(todos, id, title) {
        const target = todos.find((todo) => todo.id === id);
        if (target) target.title = title;
        return todos;
    }

    _toggleTodo(todos, id) {
        console.log(todos);
        const target = todos.find((todo) => todo.id === id);
        if (target) target.completed = !target.completed;
        return todos;
    }

    _deleteTodo(todos, id) {
        const idx = todos.findIndex((todo) => todo.id === id);
        if (idx !== -1) todos.splice(idx, 1);
        return todos;
    }
}
export default TodoApp;
