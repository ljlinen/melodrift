import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useLoginContext from './useLoginContext';

export default function useProtectPage() {
    const navigate = useNavigate();
    const { userLogin } = useLoginContext()

    useEffect(() => {
        !userLogin && navigate('/login')
    }, [userLogin, navigate])

    return userLogin 
}
