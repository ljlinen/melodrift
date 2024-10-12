import React from 'react'
import "../comp/css/viewdebugger.css"
import backgroundVideo from "../../asset/video/bg.mp4";

export default function ViewDebugger() {
  return (
    <div className='vd-div-main'>
          <div className="ap-div-icons"
            style={{
              width: true ? "100%" : "revert",
              background: true
                ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))`
                : ""
            }}>
          <video className="background-video" autoPlay loop controls muted>
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
    </div>
  )
}
