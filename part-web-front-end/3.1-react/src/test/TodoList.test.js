import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import TodoList from '../core/TodoList/TodoList'

describe('TodoList Component', () => {

    it('should be available', () => {
        const { container } = render(<TodoList />)
        expect(container.querySelector('.todo-list')).toBeInTheDocument()
    })
})
