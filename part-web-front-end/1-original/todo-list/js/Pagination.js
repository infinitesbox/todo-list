class Pagination
{
    element = null
    elementBtnPrev = null
    elementBtnNext = null

    onPrev = null
    onNext = null

    data = {
        pagesTotal: 0,
        pagesCurrent: 0,
        pagesItemsMax: 10, 
    } 

    constructor(arg)
    {
        this.element = arg.element

        this.elementBtnPrev = this.element.querySelector('.btn-prev')
        this.elementBtnPrev.addEventListener('click', (event) => this.handleOnPrev(event))
        
        this.elementBtnNext = this.element.querySelector('.btn-next')
        this.elementBtnNext.addEventListener('click', (event) => this.handleOnNext(event))

        this.onPrev = arg.onPrev
        this.onNext = arg.onNext

        this.data = {
            ...this.data,
            ...arg.data,
        }

        this.update()
    }

    static elementCreate()
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

    reset(data)
    {
        this.data = {
            ...this.data,
            ...data,
        }
        this.update()
    }

    update()
    {
        if(this.data.pagesTotal == 0)
        {
            this.elementBtnPrev.classList.add('disabled')
            this.elementBtnNext.classList.add('disabled')
            return
        }
 
        if(this.data.pagesCurrent > 1)
            this.elementBtnPrev.classList.remove('disabled')
        else
            this.elementBtnPrev.classList.add('disabled')

        if(this.data.pagesCurrent < this.data.pagesTotal)
            this.elementBtnNext.classList.remove('disabled')
        else
            this.elementBtnNext.classList.add('disabled')
    }

    handleOnPrev(event)
    {
        if(this.onPrev)
        {
            // do with worker
            const data = this.onPrev()
            this.data = {
                ...this.data,
                ...data,
            }
            this.update()
        }
    }

    handleOnNext(event)
    {
        if(this.onNext)
        {
            // do with worker
            const data = this.onNext()
            this.data = {
                ...this.data,
                ...data,
            }
            this.update()
        }
    }

    // --- Update
    
}