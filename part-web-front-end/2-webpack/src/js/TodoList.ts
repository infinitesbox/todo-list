import InputBox from './InputBox'
import Task from './Task'
import Pagination from './Pagination'

export default class TodoList
{
    element: HTMLElement = null
    elementTasks: HTMLElement = null

    inputBox: InputBox  = null
    tasks: Array<Task> = []
    pagination: Pagination = null

    data: any = {
        tasks: [],
        pagination: {
            pagesTotal: 0,
            pagesCurrent: 0,
        }
    }

    constructor(arg: any)
    {
        this.element = arg.element

        this.inputBox = new InputBox({
            element: this.element.querySelector('.input-box'),
            onEnter: (text: string) => this.handleInputBoxOnEnter(text),
        })

        this.elementTasks = this.element.querySelector('.tasks')

        this.pagination = new Pagination({
            element: this.element.querySelector('.pagination'),
            onPrev: () => this.handlePaginationOnPrev(),
            onNext: () => this.handlePaginationOnNext(),
            data: this.data.pagination,
        })
    }

    handleInputBoxOnEnter(text: string)
    {
        if (text) 
        {
            // update view

            const elementTask = Task.elementCreate()
            const elementLi = document.createElement('li')
            elementLi.appendChild(elementTask)
            this.elementTasks.appendChild(elementLi)

            const task = new Task({
                element: elementTask,
                onDone: (data: any, isDone: boolean) => this.handleTaskOnDone(data, isDone),
                onDelete: (data: any) => this.handleTaskOnDelete(data),
            })
            task.update({
                title: text,
            })

            this.tasks.push(task)

            this.pagination.reset({
                pagesTotal: 1,
                pagesCurrent: 1,
            })
        }
    }

    handleTaskOnDone(data: any, isDone: boolean)
    {
        console.log('on done update server side ...')
        console.log(data, isDone)
    }

    handleTaskOnDelete(data: any)
    {
        console.log('on delete update server side ...')
        console.log(data)
    }

    handlePaginationOnPrev()
    {
        console.log('on prev')
    }

    handlePaginationOnNext()
    {
        console.log('on next')
    }
}