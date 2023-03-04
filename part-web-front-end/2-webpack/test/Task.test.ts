import { jest, expect, test } from '@jest/globals'
import Task from '../src/js/Task'

document.body.innerHTML = `
    <div class="task">
        <button class="btn-done" type="button">
            <i class="fa-solid fa-check"></i>
        </button>
        <p class="title">Test Done</p>
        <button class="btn-delete" type="button">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
`

// -- 

const handleOnDone = jest.fn((data: any, isDone) => console.log(isDone ? 'Done' : 'Undone'))
const handleOnDelete = jest.fn((data: any) => console.log('Deleted'))

const task = new Task({
    element: document.querySelector('.task'),
    onDone: handleOnDone,
    onDelete: handleOnDelete,
})
task.update({ id: 1, title: 'Create Calendar' })

// --

// -- TESTS

test('Create Element', () => {
    const element = Task.elementCreate()
    expect(element).toBeInstanceOf(HTMLElement)
})

test('Update', () => {
    const title = 'Create Schedule'
    task.update({ title: title })

    expect(task.data.title).toBe(title)
})

test('On Done', () => {
    const spyConsoleLog = jest.spyOn(console, 'log')

    const title = 'Create Calendar'
    task.update({ title: title })

    const btnDone = task.elementBtnDone
    btnDone.click() // done

    expect(handleOnDone).toHaveBeenCalledWith({ id: 1, title: 'Create Calendar' }, true)
    expect(spyConsoleLog).toHaveBeenCalledWith('Done')

    spyConsoleLog.mockRestore()

    btnDone.click() // undone
})

test('On Done - Undone', () => {
    const spyConsoleLog = jest.spyOn(console, 'log')
    
    const title = 'Create Calendar'
    task.update({ title: title })

    const btnDone = task.elementBtnDone
    btnDone.click() // done
    btnDone.click() // undone

    expect(handleOnDone).toHaveBeenCalledWith({ id: 1, title: 'Create Calendar' }, false)
    expect(spyConsoleLog).toHaveBeenCalledWith('Done')
    
    spyConsoleLog.mockRestore()
})

test('On Delete', () => {
    const spyConsoleLog = jest.spyOn(console, 'log')

    const btnDelete = task.elementBtnDelete
    btnDelete.click()
    
    expect(handleOnDelete).toHaveBeenCalledWith({ id: 1, title: 'Create Calendar' })
    expect(spyConsoleLog).toHaveBeenCalledWith('Deleted')
    
    spyConsoleLog.mockRestore()
})

// --