export default class Task
{
    element: HTMLElement = null
    elementBtnDone: HTMLButtonElement = null
    elementTitle: HTMLElement = null
    elementBtnDelete: HTMLButtonElement = null

    onDone: (data: any, isDone: boolean) => void = null
    onDelete: (data: any) => void = null

    // 1 done
    // 2 deleted
    eventTransitionEndStatus: number = 0

    data: any =  {
        id: 0,
        title: null,
    }

    constructor(arg: any)
    {
        this.element = arg.element
        this.element.addEventListener('transitionend', () => this.handleDeleteTransitionEnd())
        
        this.elementBtnDone = this.element.querySelector('.btn-done')
        this.elementBtnDone.addEventListener('click', () =>this.handleOnDone())

        this.elementTitle = this.element.querySelector('.title')
        
        this.elementBtnDelete = this.element.querySelector('.btn-delete')
        this.elementBtnDelete.addEventListener('click', () =>this.handleOnDelete())

        this.onDone = arg.onDone
        this.onDelete = arg.onDelete
    }

    static elementCreate(): HTMLElement
    {
        let element = document.createElement('div')
        element.className = 'task'
        element.innerHTML = `
            <button class="btn-done" type="button">
                <i class="fa-solid fa-check"></i>
            </button>
            <p class="title">Test Done</p>
            <button class="btn-delete" type="button">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `      
        return element
    }

    update(data: any): void
    {
        this.data = {
            ...this.data,
            ...data
        }
        this.elementTitle.textContent = this.data.title
    }

    handleOnDone(): void
    {
        if(this.onDone)
        {
            this.eventTransitionEndStatus = 1
            if (!this.element.classList.contains('done'))
            {
                // better to do with Worker
                this.onDone(this.data, true)
                this.element.classList.add('done')
            }
            else
            {
                // better to do with Worker
                this.onDone(this.data, false)
                this.element.classList.remove('done')
            }
        }
    }

    handleOnDelete(): void
    {
        if(this.onDelete)
        {
            // better to do with Worker
            this.onDelete(this.data)
            this.eventTransitionEndStatus = 2
            this.element.classList.add('deleted')
        }
    }

    handleDeleteTransitionEnd(): void
    {
        const elementParent = this.element.parentElement
        if(elementParent && this.eventTransitionEndStatus === 2)
        {  
            elementParent.removeChild(this.element)
            // remove li
            const elementParentParent = elementParent.parentElement
            elementParentParent.removeChild(elementParent)
        }
    }
}