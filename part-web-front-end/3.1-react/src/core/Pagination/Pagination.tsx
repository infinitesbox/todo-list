import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import './sass/main.sass'
import './sass/custom.sass'

interface PaginationProps 
{
    data: any
    onPrev?: () => any
    onNext?: () => any
}

interface PaginationState
{
    data: {
        pagesTotal: number,
        pagesCurrent: number,
    }
    isPrevDisabled: boolean,
    isNextDisabled: boolean,

}

export default class Pagination extends React.Component<PaginationProps, PaginationState>
{
    constructor(props: PaginationProps)
    {
        super(props)

        if (props.data)
        {
            this.state = {
                ...props.data,
                isPrevDisabled: !(props.data.pagesCurrent > 0),
                isNextDisabled: !(props.data.pagesCurrent < props.data.pagesTotal),
            }
        }
        else
        {
            this.state = {
                data: {
                    pagesTotal: 0,
                    pagesCurrent: 0,
                },
                isPrevDisabled: true,
                isNextDisabled: true,
            }
        }
    }

    reset(data: any): void
    {
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                ...data,
            }
        })
        this.update()
    }

    update(): void
    { 
        this.setState({
            ...this.state,
            isPrevDisabled: !(this.state.data.pagesCurrent > 1),
            isNextDisabled: !(this.state.data.pagesCurrent < this.state.data.pagesTotal),
        })
    }

    handleOnPrev(): void
    {
        if(this.props.onPrev)
        {
            // do with worker
            const data = this.props.onPrev()
            this.reset(data)
        }
    }

    handleOnNext(): void
    {
        if(this.props.onNext)
        {
            // do with worker
            const data = this.props.onNext()
            this.reset(data)
        }
    }

    renderGetPrevButtonClassDisabled(): string
    {
        return this.state.isPrevDisabled ? 'disabled' : ''
    }

    renderGetNextButtonClassDisabled(): string
    {
        return this.state.isPrevDisabled ? 'disabled' : ''
    }
    
    render(): JSX.Element
    {
        return (
            <div className="pagination">
                <button className={ 'btn-prev ' +  this.renderGetPrevButtonClassDisabled() } 
                    onClick={ () => this.handleOnPrev() }>
                    <FontAwesomeIcon icon={ solid('chevron-left') } />
                </button>
                <button className={ 'btn-next ' + this.renderGetNextButtonClassDisabled() } 
                    onClick={ () => this.handleOnNext() }>
                    <FontAwesomeIcon icon={ solid('chevron-right') } />
                </button>
            </div>
        )
    }
}