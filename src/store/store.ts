import { configureStore } from "@reduxjs/toolkit"

import expansionReducer from "../reducers/treeNodeExapnsionSlice"
import hierarchyReducer from "../reducers/hierarchyTreeSlice"
import authReducer from "../reducers/authSlice"

export const store = configureStore({
    reducer: {
        hierarchy: hierarchyReducer,
        expansion: expansionReducer,
        auth: authReducer,
    },
})

export type RootState =
    ReturnType<typeof store.getState>

export type AppDispatch =
    typeof store.dispatch