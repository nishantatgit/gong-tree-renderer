import {
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit"

import type {
    PayloadAction,
} from "@reduxjs/toolkit"

import type { User } from "../types/user"

export interface TreeNode extends User {
    children: number[]
}

type HierarchyStatus =
    | "idle"
    | "loading"
    | "success"
    | "error"

interface HierarchyExtraState {
    rootIds: number[]
    status: HierarchyStatus
    error: string | null
}

const hierarchyAdapter =
    createEntityAdapter<TreeNode, number>({
        selectId: (user) => user.id,
    })

const initialState =
    hierarchyAdapter.getInitialState<HierarchyExtraState>({
        rootIds: [],
        status: "idle",
        error: null,
    })

function buildHierarchy(users: User[]): {
    nodes: TreeNode[]
    rootIds: number[]
} {
    const nodesById: Record<number, TreeNode> = {}
    const rootIds: number[] = []

    for (const user of users) {
        nodesById[user.id] = {
            ...user,
            children: [],
        }
    }

    for (const user of users) {
        if (
            user.managerId !== null &&
            nodesById[user.managerId]
        ) {
            nodesById[
                user.managerId
            ].children.push(user.id)
        } else {
            rootIds.push(user.id)
        }
    }

    return {
        nodes: Object.values(nodesById),
        rootIds,
    }
}

const hierarchySlice = createSlice({
    name: "hierarchy",
    initialState,

    reducers: {
        usersLoading(state) {
            state.status = "loading"
            state.error = null
        },

        usersLoaded(
            state,
            action: PayloadAction<User[]>,
        ) {
            const {
                nodes,
                rootIds,
            } = buildHierarchy(action.payload)

            hierarchyAdapter.setAll(
                state,
                nodes,
            )

            state.rootIds = rootIds
            state.status = "success"
            state.error = null
        },

        usersFailed(
            state,
            action: PayloadAction<string>,
        ) {
            state.status = "error"
            state.error = action.payload
        },
    },
})

export const {
    usersLoading,
    usersLoaded,
    usersFailed,
} = hierarchySlice.actions

export { hierarchyAdapter }

export default hierarchySlice.reducer