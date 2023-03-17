import { render, fireEvent } from '@testing-library/react'
import InputBox from '../core/InputBox/InputBox'

describe('InputBox Component', () => {

    it('calls onEnter function when Enter key is pressed', () => {
        const onEnterMock = jest.fn()
        const { getByRole } = render(<InputBox onEnter={ onEnterMock } />)

        const inputBox = getByRole('textbox')
        fireEvent.keyDown(inputBox, { key: 'Enter', keyCode: 13 })

        expect(onEnterMock).toHaveBeenCalledWith(inputBox.value)
        expect(inputBox.value).toBe('')
    })

})