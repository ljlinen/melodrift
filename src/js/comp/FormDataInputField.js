import React, { useState } from 'react'

export default function FormDataInputField({inputTitle, inputType, formData, formDataKey, setFormDataFuncton, minlength, style, children, ...props}) {

    const [valid, setValid] = useState(true)
    return (
        <div className='div-inputwrap'>
            <p>{ inputTitle }</p>
            <input type={inputType}
                style={{borderBottom: valid ? 'none' : '2px solid red', ...style}}
                onChange={(e) => {
                    setValid(setFormDataFuncton(`${formDataKey}`, e.target.value, minlength))
                }}
                {...props}
            />
            {children}
        </div>
    )
}
