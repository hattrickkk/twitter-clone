import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { PROFILE } from '@/constants/paths'

export const useViewProfile = (userId: string) => {
    const navigate = useNavigate()
    return useCallback(() => navigate(`/${PROFILE}/${userId}`), [userId])
}
