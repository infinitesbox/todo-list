import { jest, expect, test } from '@jest/globals'
import Pagination from '../src/js/Pagination'

document.body.innerHTML = `
    <div class="pagination">
        <button class="btn-prev">
            <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button class="btn-next">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    </div>
`

const handleOnPrev = jest.fn(() => console.log('On Prev'))
const handleOnNext = jest.fn(() => console.log('On Next'))

const pagination = new Pagination({
    element: document.querySelector('.pagination'),
    onPrev: handleOnPrev,
    onNext: handleOnNext,
})

test('Create Element', () => {
    const element = Pagination.elementCreate()
    expect(element).toBeInstanceOf(HTMLElement)
})

test('Update', () => {
    pagination.reset({
        pagesTotal: 10,
        pagesCurrent: 1, 
    })
    pagination.update()

    expect(pagination.elementBtnPrev.classList.contains('disabled')).toBe(true)
    expect(pagination.elementBtnNext.classList.contains('disabled')).toBe(false)
})

test('On Prev', () => {
    const spyConsoleLog = jest.spyOn(console, 'log')

    pagination.reset({
        pagesTotal: 10,
        pagesCurrent: 2,
    })

    const btnPrev = pagination.elementBtnPrev
    btnPrev.click() // done

    expect(pagination.elementBtnPrev.classList.contains('disabled')).toBe(false)
    expect(spyConsoleLog).toHaveBeenCalledWith('On Prev')

    spyConsoleLog.mockRestore()
})

test('On Next', () => {
    const spyConsoleLog = jest.spyOn(console, 'log')

    const btnNext = pagination.elementBtnNext
    btnNext.click() // done

    expect(pagination.elementBtnNext.classList.contains('disabled')).toBe(false)
    expect(spyConsoleLog).toHaveBeenCalledWith('On Next')

    spyConsoleLog.mockRestore()
})