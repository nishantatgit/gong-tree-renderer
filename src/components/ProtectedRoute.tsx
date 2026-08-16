import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks.ts'

interface ProtectedRouteProps {
    children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const authStatus = useAppSelector((state) => state.auth.status)

    if (authStatus !== 'authenticated') {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute
