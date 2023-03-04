import { jest, expect, test } from '@jest/globals'
import TodoList from '../src/js/TodoList'

document.body.innerHTML = `
    <div class="todo-list">
        <div class="input-box">
            <div class="wrapper">
                <input type="text">
                <div class="icon">
                    <i class="fa-solid fa-note-sticky"></i>
                </div>
            </div>
        </div>
        <ul class="tasks"></ul>
        <div class="pagination">
            <button class="btn-prev">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button class="btn-next">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    </div>
`

const todoList = new TodoList({
    element: document.querySelector('.todo-list'),
})

test('Check Element', () => {
    const element = todoList.element
    expect(element).toBeInstanceOf(HTMLElement)
})

test('Check InputBox', () => { 
    const inputBox = todoList.inputBox

    const input = inputBox.elementInput
    input.value = 'Create a calendar'

    // Simulate Event (Synchronously)
    const event = new KeyboardEvent('keydown', { keyCode: 13 })
    input.dispatchEvent(event)

    const task = todoList.tasks[0]

    expect(task.data.title).toBe('Create a calendar')
})


