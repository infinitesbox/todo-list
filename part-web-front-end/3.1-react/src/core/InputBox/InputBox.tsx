import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import './sass/main.sass'
import './sass/custom.sass'

interface InputBoxProps 
{
    onEnter?: (value: string) => void
}
  
export default function InputBox(props: InputBoxProps)
{
    const handleOnEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        console.log(event.key, event.keyCode)
        if (event.keyCode === 13)
        {
            if (props.onEnter)
                props.onEnter(event.currentTarget.value)
            event.currentTarget.value = ''
        }
    }
    
    return (
        <div className="input-box">
            <div className="wrapper">
                <input type="text" onKeyDown={ (event: React.KeyboardEvent<HTMLInputElement>) => handleOnEnter(event) }/>
                <div className="icon">
                    <FontAwesomeIcon icon={ solid('note-sticky') } />
                </div>
            </div>
        </div>
    )
}