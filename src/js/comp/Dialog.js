import React, { useEffect, useState } from 'react'
import './css/dialog.css'

export default function Dialog({ heading, message, negative, positive}) {

  const [openOrClose, setOpenOrClose] = useState(false)

  useEffect(() => {
    setOpenOrClose(true);
  }, [heading])

  return (
    <div className='dialog-div-main'
      style={{
        display: openOrClose ? 'unset' : 'none',
        height: openOrClose ? '100%' : 0,
        width: openOrClose ? '100%' : 0,
      }}>
        <dialog className='index-dialog'
      style={{
        height: openOrClose ? 'unset' : 0,
        width: openOrClose ? '350px' : 0,
        opacity: openOrClose ? 1 : 0,
      }} open>
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

                setOpenOrClose(false)
              }} />
            }
            {
              positive && <input type='button' value={positive.value} onClick={() => {
                if(typeof positive.callback == 'function') {
                positive.callback()                  
                }

                setOpenOrClose(false)
              }} />
            }
          </div>
        </dialog>
    </div>
  )
}
