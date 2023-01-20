class InputBox
{
    element = null
    elementInput = null

    onEnter = null

    constructor(arg)
    {
        this.element = arg.element
        this.elementInput = this.element.querySelector('input')
        this.elementInput.addEventListener('keydown', (event) => this.handleOnEnter(event))

        this.onEnter = arg.onEnter
    }

    static elementCreate()
    {
        let element = document.createElement('div')
        element.className = 'input-box'
        element.innerHTML = `
            <div class="wrapper">
                <input type="text">
                <div class="icon">
                    <i class="fa-solid fa-note-sticky"></i>
                </div>
            </div>
        `      
        return element
    }

    handleOnEnter(event)
    {   
        console.log(event.key, event.keyCode)
        if (event.keyCode === 13)
        {
            if (this.onEnter)
                this.onEnter(this.elementInput.value)
            this.elementInput.value = ''
        }
    }
}