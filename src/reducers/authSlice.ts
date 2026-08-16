import {
    createSlice,
} from "@reduxjs/toolkit"

import type {
    PayloadAction,
} from "@reduxjs/toolkit"

interface AuthState {
    userId: number | null
    status:
        | "anonymous"
        | "authenticating"
        | "authenticated"
    error: string | null
}

function createInitialState(): AuthState {
    const storedUserId =
        sessionStorage.getItem("userId")

    if (!storedUserId) {
        return {
            userId: null,
            status: "anonymous",
            error: null,
        }
    }

    const userId = Number(storedUserId)

    return {
        userId,
        status: "authenticated",
        error: null,
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: createInitialState(),

    reducers: {
        loginStarted(state) {
            state.status = "authenticating"
            state.error = null
        },

        loginSucceeded(
            state,
            action: PayloadAction<number>,
        ) {
            state.userId = action.payload
            state.status = "authenticated"
            state.error = null
        },

        loginFailed(
            state,
            action: PayloadAction<string>,
        ) {
            state.userId = null
            state.status = "anonymous"
            state.error = action.payload
        },

        clearAuthError(state) {
            state.error = null
        },

        logout(state) {
            state.userId = null
            state.status = "anonymous"
            state.error = null
        },
    },
})

export const {
    loginStarted,
    loginSucceeded,
    loginFailed,
    clearAuthError,
    logout,
} = authSlice.actions

export default authSlice.reducer