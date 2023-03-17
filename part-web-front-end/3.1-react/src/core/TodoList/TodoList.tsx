import React from 'react'
import InputBox from '../InputBox/InputBox'
import Task from '../Task/Task'

import './sass/main.sass'
import './sass/custom.sass'

interface TodoListProps 
{
    onDone?: (data: any) => void
    onDelete?: (data: any) => void
}

interface TodoListState
{
    data: Array<any>,
}

export default class TodoList extends React.Component<TodoListProps, TodoListState>
{
    constructor(props: TodoListProps)
    {
        super(props)
        this.state = {
            data: [],
        }
    }

    handleInputBoxOnEnter(text: string) : void
    {
        console.log('on enter update server side ...')
        console.log(text)
        const data = this.state.data.slice()
        data.push({
            id: Date.now(),
            title: text,
            isDone: false,
        })
        this.setState({
            ...this.state,
            data: data,
        })
    }

    handleTaskOnDone(data: any): void
    {
        console.log('on done update server side ...')
        console.log(data)
    }

    handleTaskOnDelete(data: any): void
    {
        console.log('on delete update server side ...')
        console.log(data)
        const stateData = this.state.data.filter( task => task.id !== data.id)
        this.setState({
            ...this.state,
            data: stateData,
        })
    }

    renderTasks()
    {
        const tasks = this.state.data.map((task) =>
            <li key={ task.id.toString() }>
                <Task data={ task } 
                    onDone={ (data: any) => this.handleTaskOnDone(data) }
                    onDelete={ (data: any) => this.handleTaskOnDelete(data) } />
            </li>
        );
        return tasks
    }
    
    render()
    {
        return (
            <div className="todo-list">

                <h6>Todo List</h6>

                <InputBox onEnter={ (text: string) => this.handleInputBoxOnEnter(text) } />

                <ul className="tasks">
                    { this.renderTasks() }
                </ul>

            </div>
        )
    }
}