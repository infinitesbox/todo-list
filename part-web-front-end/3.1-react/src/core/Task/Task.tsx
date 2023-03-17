import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import './sass/main.sass'
import './sass/custom.sass'

interface TaskProps 
{
    data: {
        id: number,
        title: string,
        isDone: boolean,
    }
    onDone?: (data: any) => void
    onDelete?: (data: any) => void
}

interface TaskState
{
    data: {
        id: number,
        title: string,
        isDone: boolean,
    }
    eventTransitionEndStatus: number,
    isDeleted: boolean,
}

export default class Task extends React.Component<TaskProps, TaskState>
{
    constructor(props: TaskProps)
    {
        super(props)
        this.state = {
            data: this.props.data,
            eventTransitionEndStatus: 0,
            isDeleted: false,
        }
    }

    handleOnDone(): void
    {
        this.setState(
            {
                ...this.state,
                data: {
                    ...this.state.data,
                    isDone: !this.state.data.isDone,
                }
            }, 
            () => this.props.onDone ? this.props.onDone(this.state.data) : {}
        )
    }

    handleOnDelete(): void
    {
        this.setState({
            ...this.state,
            isDeleted: true,
        })
    }

    handleOnDeleteTransitionEnd()
    {
        if (this.state.isDeleted)
        {
            this.setState(
                {
                    ...this.state,
                    eventTransitionEndStatus: 2,
                },
                () => this.props.onDelete ? this.props.onDelete(this.state.data) : {} 
            )
        }
        else
        {
            this.setState({
                ...this.state,
                eventTransitionEndStatus: this.state.data.isDone ? 1 : 0,
            })
        }
    }

    renderGetDoneClassDisabled(): string
    {
        return this.state.data.isDone ? 'done ' : ' '
    }

    renderGetDeletedClassDisabled(): string
    {
        return this.state.isDeleted ? 'deleted ' : ' '
    }
    
    render(): JSX.Element
    {
        return (
            <div className={ 'task ' + this.renderGetDoneClassDisabled() + this.renderGetDeletedClassDisabled()  }
                onTransitionEnd={ () => this.handleOnDeleteTransitionEnd() }>
                <button className="btn-done" type="button" onClick={ () => this.handleOnDone() }>
                    <FontAwesomeIcon icon={ solid('check') } />
                </button>
                <p className="title">{ this.state.data.title }</p>
                <button className="btn-delete" type="button" onClick={ () => this.handleOnDelete() }>
                    <FontAwesomeIcon icon={ solid('xmark') } />
                </button>
            </div>
        )
    }
}