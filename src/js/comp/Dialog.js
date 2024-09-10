import React from 'react'
import './css/dialog.css'

export default function Dialog({ heading, message, negative, positive}) {

  return (
    <div className='dialog-div-main'>
        <dialog className='index-dialog'
        style={{width: '350px'}}
        open>
          <h3>{heading}</h3>
          <h4>{message}</h4>
          <div className='dialog-div-buttons'
            style={{justifyContent: positive && negative ? 'space-between' : 'end'}}
          >
            {
              negative && <input type='button' value={negative.value} onClick={() => {
                if(typeof negative.callback == 'function') {
                  negative.callback()                  
                  }
              }} />
            }
            {
              positive && <input type='button' value={positive.value} onClick={() => {
                if(typeof positive.callback == 'function') {
                positive.callback()                  
                }
              }} />
            }
          </div>
        </dialog>
    </div>
  )
}
