import React, { useEffect, useState } from 'react'
import '../../css/page/errorpage.css'

export default function ErrorPage({ heading, errorMessage }) {

    const [pageActive, setPageActive] = useState();

    useEffect(() => {
        setPageActive(true)
    }, [])
    return (
        <div className="profile-div-main-artist"
            style={{opacity: pageActive ? 1 : 0}}
        >
        <div className='wrap-info-about'>
            <nav>
                <p>Melodrift</p>
            </nav>
    
            <div className="wrap-info-stats">
                    <div className="info">
                        <div className="wrap-name-varified">
                        <h1 className="name">{ heading ? heading : "Error"}</h1>
                        </div>
                        <h2 className="location">{ errorMessage ? errorMessage : "Error"}</h2>
                    </div>
            </div>
        </div>
        </div>
      )
    }
    
