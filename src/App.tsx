import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"

import ErrorPage from "./pages/ErrorPage"
import HierarchyPage from "./pages/Hierarchy/HierarchyPage"
import LoginPage from "./pages/Login/LoginPage"
import { useAppSelector } from "./store/hooks"



function HomeRedirect() {
    const authStatus = useAppSelector(
      (state) => state.auth.status,
    )
    return (
        <Navigate
            to={
                authStatus === "authenticated"
                    ? "/hierarchy"
                    : "/login"
            }
            replace
        />
    )
}

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<HomeRedirect />}
            />

            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
            />

            <Route
                path="/hierarchy"
                element={
                    <ProtectedRoute>
                        <HierarchyPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={<ErrorPage />}
            />
        </Routes>
    )
}

export default App