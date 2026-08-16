import { useNavigate } from 'react-router-dom'

import Form from '../../components/Form/Form.tsx'
import { useAppSelector, useAppDispatch } from '../../store/hooks.ts'
import { authenticate } from '../../services/api.ts'
import {
    loginStarted,
    loginSucceeded,
    loginFailed,
} from '../../reducers/authSlice.ts'
import './LoginPage.css'

function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const authStatus = useAppSelector((state) => state.auth.status)
    const authError = useAppSelector((state) => state.auth.error)

    async function handleLogin(email: string, password: string) {
        dispatch(loginStarted())

        try {
            const userId = await authenticate(email, password)

            if (userId === null) {
                dispatch(loginFailed('Invalid email or password.'))
                return
            }

            sessionStorage.setItem('userId', String(userId))

            dispatch(loginSucceeded(userId))

            navigate('/hierarchy', {
                replace: true,
            })
        } catch (e) {
            dispatch(loginFailed('Unable to log in. Please try again.'))
            console.error(e)
        }
    }

    return (
        <main className="page login-page">
            <h1>Please login</h1>

            <Form
                formId="login-form"
                formClass="login-form"
                onSubmit={handleLogin}
                submitLabel="Login"
                isSubmitting={authStatus === 'authenticating'}
                serverError={authError}
            />
        </main>
    )
}

export default LoginPage
