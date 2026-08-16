import { createSlice } from "@reduxjs/toolkit"

interface ExpansionState {
    expandedById: Record<number, boolean>
}

const initialState: ExpansionState = {
    expandedById: {},
}

const expansionSlice = createSlice({
    name: "expansion",
    initialState,

    reducers: {
        toggleNode(state, action: {
            payload: number
        }) {
            const userId = action.payload

            state.expandedById[userId] =
                !state.expandedById[userId]
        },
    },
})

export const { toggleNode } =
    expansionSlice.actions



export default expansionSlice.reducer