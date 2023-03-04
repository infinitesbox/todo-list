import { jest, expect, test } from '@jest/globals'
import InputBox from '../src/js/InputBox'

document.body.innerHTML = `
    <div class="input-box">
        <div class="wrapper">
            <input type="text">
            <div class="icon">
                <i class="fa-solid fa-note-sticky"></i>
            </div>
        </div>
    </div>
`

test('Create Element', () => {
    const element = InputBox.elementCreate()
    expect(element).toBeInstanceOf(HTMLElement)
})

test('Input, On Enter', () => {
    const handleOnInput = jest.fn((text: string) => console.log(text))
    
    const inputBox = new InputBox({
        element: document.querySelector('.input-box'),
        onEnter: handleOnInput
    })

    const input = inputBox.elementInput
    input.value = 'Hello Word!'

    // Simulate Event (Synchronously)
    const event = new KeyboardEvent('keydown', { keyCode: 13 })
    input.dispatchEvent(event)
    
    expect(handleOnInput).toHaveBeenCalledWith('Hello Word!')
})
