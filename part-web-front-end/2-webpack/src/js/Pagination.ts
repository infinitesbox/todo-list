export default class Pagination
{
    element: HTMLElement = null
    elementBtnPrev: HTMLButtonElement = null
    elementBtnNext: HTMLButtonElement = null

    onPrev: () => any = null
    onNext: () => any = null

    data: any = {
        pagesTotal: 0,
        pagesCurrent: 0,
    } 

    constructor(arg: any)
    {
        this.element = arg.element

        this.elementBtnPrev = this.element.querySelector('.btn-prev')
        this.elementBtnPrev.addEventListener('click', () => this.handleOnPrev())
        
        this.elementBtnNext = this.element.querySelector('.btn-next')
        this.elementBtnNext.addEventListener('click', () => this.handleOnNext())

        this.onPrev = arg.onPrev
        this.onNext = arg.onNext

        this.data = {
            ...this.data,
            ...arg.data,
        }

        this.update()
    }

    static elementCreate(): HTMLElement
    {
        let element = document.createElement('div')
        element.className = 'pagination'
        element.innerHTML = `
            <button class="btn-prev disabled">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button class="btn-next disabled">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        `      
        return element
    }

    reset(data: any): void
    {
        this.data = {
            ...this.data,
            ...data,
        }
        this.update()
    }

    update(): void
    {
        this.elementBtnPrev.classList.add('disabled')
        this.elementBtnNext.classList.add('disabled')
 
        if(this.data.pagesCurrent > 1)
            this.elementBtnPrev.classList.remove('disabled')
        else
            this.elementBtnPrev.classList.add('disabled')

        if(this.data.pagesCurrent < this.data.pagesTotal)
            this.elementBtnNext.classList.remove('disabled')
        else
            this.elementBtnNext.classList.add('disabled')
    }

    handleOnPrev(): void
    {
        if(this.onPrev)
        {
            // do with worker
            const data = this.onPrev()
            this.reset(data)
        }
    }

    handleOnNext(): void
    {
        if(this.onNext)
        {
            // do with worker
            const data = this.onNext()
            this.reset(data)
        }
    }

    // --- Update
}