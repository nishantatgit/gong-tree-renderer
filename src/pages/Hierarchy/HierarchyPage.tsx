import { useEffect } from 'react'

import {
    usersFailed,
    usersLoaded,
    usersLoading,
} from '../../reducers/hierarchyTreeSlice'

import { logout } from '../../reducers/authSlice'

import { useAppDispatch, useAppSelector } from '../../store/hooks'

import { useNavigate } from 'react-router-dom'

import UserTree from '../../components/UserTree'

import { getUsers } from '../../services/api'

import './HierarchyPage.css'
import { getUserFullName } from '../../utils/getUserFullName'

function HierarchyPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const status = useAppSelector((state) => state.hierarchy.status)

    const error = useAppSelector((state) => state.hierarchy.error)

    const nodesById = useAppSelector((state) => state.hierarchy.entities)

    const authStatus = useAppSelector((state) => state.auth.status)

    const LoggedInUserId = useAppSelector((state) => state.auth.userId)

    useEffect(() => {
        const controller = new AbortController()

        async function loadUsers() {
            dispatch(usersLoading())

            try {
                const users = await getUsers(controller.signal)

                dispatch(usersLoaded(users))
            } catch (error) {
                if (
                    error instanceof DOMException &&
                    error.name === 'AbortError'
                ) {
                    return
                }

                dispatch(usersFailed('Unable to load the user hierarchy.'))
            }
        }

        void loadUsers()

        return () => {
            controller.abort()
        }
    }, [])

    function handleLogout() {
        sessionStorage.removeItem('userId')

        dispatch(logout())

        navigate('/login', {
            replace: true,
        })
    }

    if (status === 'loading') {
        return (
            <main className="page status-page">
                <p>Loading user hierarchy…</p>
            </main>
        )
    }

    if (status === 'error') {
        return (
            <main className="page status-page">
                <h1>Unable to load hierarchy</h1>
                <p role="alert">{error}</p>
            </main>
        )
    }

    const loggedInUser =
        authStatus === 'authenticated'
            ? nodesById[LoggedInUserId as number]
            : undefined

    return (
        <main className="page hierarchy-page">
            <header className="app-header">
                <span className="display-name">
                    {loggedInUser
                        ? getUserFullName(
                              loggedInUser.firstName,
                              loggedInUser.lastName,
                          )
                        : 'Unknown user'}
                </span>

                <button
                    type="button"
                    className="link-button"
                    onClick={handleLogout}
                >
                    (Logout)
                </button>
            </header>

            <section className="hierarchy-content">
                <div className="tree-heading">
                    <h1>Hierarchy Tree</h1>
                </div>
                <UserTree />
            </section>
        </main>
    )
}

export default HierarchyPage
