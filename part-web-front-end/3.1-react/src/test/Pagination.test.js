import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Pagination from '../core/Pagination/Pagination'

describe('Pagination Component', () => {

    it('should render with default props', () => {
        const { container } = render(<Pagination />)
        expect(container.querySelector('.pagination')).toBeInTheDocument()
    })

    it('the Prev Button should be disabled by default', () => {
        const { container } = render(<Pagination />)
        expect(container.querySelector('.btn-prev')).toHaveClass('disabled')
    })

    it('the Next Button should be disabled by default', () => {
        const { container } = render(<Pagination />)
        expect(container.querySelector('.btn-next')).toHaveClass('disabled')
    })

    it('the Prev Button should not be disabled by default', () => {
        const { container } = render(<Pagination data={ { pagesTotal: 10, pagesCurrent: 3 } } />)
        expect(container.querySelector('.btn-prev')).not.toHaveClass('disabled')
    })

    it('the Next Button should not be disabled by default', () => {
        const { container } = render(<Pagination data={ { pagesTotal: 10, pagesCurrent: 1 } } />)
        expect(container.querySelector('.btn-next')).not.toHaveClass('disabled')
    })

    it('should call onPrev callback when Prev Button is clicked', () => {
        const onPrevMock = jest.fn()
        const { container } = render(<Pagination onPrev={ onPrevMock } />)
        fireEvent.click(container.querySelector('.btn-prev'))
        expect(onPrevMock).toHaveBeenCalled()
    })

    it('should call onNext callback when Next Button is clicked', () => {
        const onNextMock = jest.fn()
        const { container } = render(<Pagination onNext={ onNextMock } />)
        fireEvent.click(container.querySelector('.btn-next'))
        expect(onNextMock).toHaveBeenCalled()
    })
    
})
