import React, { useEffect, useState } from 'react'
import useLoginContext from './useLoginContext';

export default function useIsLoggedIn() {
    const { userLogin } = useLoginContext()
    const [isLoggedIn, setIsLoggedIn] = useState()

    useEffect(() => {
        userLogin ? 
        setIsLoggedIn(true) 
        : 
        setIsLoggedIn(false)
    }, [userLogin])

    return isLoggedIn 
}
