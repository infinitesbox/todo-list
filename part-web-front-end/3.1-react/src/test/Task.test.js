import { render, fireEvent, act } from '@testing-library/react'
import Task from '../core/Task/Task'

describe('Task Component', () => {

    const data = {
        id: 1,
        title: 'Create Calendar',
        isDone: false,
    }
  
    it('renders task title correctly', () => {
        const { getByText } = render(<Task data={ data } />)
        expect(getByText('Create Calendar')).toBeInTheDocument()
    })
  
    it('calls onDone callback when done button is clicked', () => {
        const onDoneMock = jest.fn()
        const { container } = render(<Task data={ data } onDone={ onDoneMock } />)
        const doneButton = container.querySelector('.btn-done')
        fireEvent.click(doneButton)

        expect(onDoneMock).toHaveBeenCalledWith({ ...data, isDone: !data.isDone })
    })
  
    it('calls onDelete callback when delete button is clicked', async () => {
        const onDeleteMock = jest.fn()
        const { container } = render(<Task data={ { ...data, isDone: false } } 
            onDelete={ onDeleteMock } />)
        const deleteButton = container.querySelector('.btn-delete')
        fireEvent.click(deleteButton)

       expect(onDeleteMock).not.toHaveBeenCalled()
    })
  
    it('adds "done" class when task is marked as done', () => {
        const { container } = render(<Task data={{ ...data, isDone: true }} />)
        const taskDiv = container.querySelector('.task')

        expect(taskDiv).toHaveClass('done')
    })
  
    it('adds "deleted" class when task is marked as deleted', () => {
        const { container } = render(<Task data={ data } />)
        const deleteButton = container.querySelector('.btn-delete')
        fireEvent.click(deleteButton)
        const taskDiv = container.querySelector('.task')
        
        expect(taskDiv).toHaveClass('deleted')
    })
    
})