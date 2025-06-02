import React from 'react'

export default function InputField({inputTitle, inputType, object, objectSetter, objectkey, mainDataObjectSetter, minlength, ...props}) {

    return (
        <div className='div-inputwrap'>
            <p>{ inputTitle }</p>
            <input type={inputType}
                style={{borderBottom: object[objectkey] === undefined || object[objectkey] ? 'none' : '2px solid red'}}
                onChange={(e) => {mainDataObjectSetter(objectSetter, `${objectkey}`, e.target.value, minlength)}}
                {...props}
            />
        </div>
    )
}
