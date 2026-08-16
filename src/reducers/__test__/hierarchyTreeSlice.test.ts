import { describe, it, expect } from 'vitest'
import reducer, {
    usersLoading,
    usersLoaded,
    usersFailed,
    hierarchyAdapter,
} from '../hierarchyTreeSlice'
import type { User } from '../../types/user'

const initialState = reducer(undefined, { type: '@@INIT' })

const buildUser = (overrides: Partial<User>): User => ({
    id: 1,
    firstName: 'Ryan',
    lastName: 'Sorbo',
    email: 'ryan.sorbo@sorbyan.com',
    photo: '',
    managerId: null,
    children: [],
    ...overrides,
})

describe('hierarchySlice', () => {
    it('returns the correct initial state', () => {
        expect(initialState.status).toBe('idle')
        expect(initialState.error).toBeNull()
        expect(initialState.rootIds).toEqual([])
        expect(hierarchyAdapter.getSelectors().selectAll(initialState)).toEqual([])
    })

    describe('usersLoading', () => {
        it('sets status to loading and clears any previous error', () => {
            const stateWithError = reducer(initialState, usersFailed('boom'))
            const state = reducer(stateWithError, usersLoading())

            expect(state.status).toBe('loading')
            expect(state.error).toBeNull()
        })
    })

    describe('usersFailed', () => {
        it('sets status to error and stores the error message', () => {
            const state = reducer(initialState, usersFailed('Network error'))

            expect(state.status).toBe('error')
            expect(state.error).toBe('Network error')
        })
    })

    describe('usersLoaded', () => {
        it('sets status to success and clears error', () => {
            const users = [buildUser({ id: 1 })]
            const state = reducer(initialState, usersLoaded(users))

            expect(state.status).toBe('success')
            expect(state.error).toBeNull()
        })

        it('stores all users as entities with an empty children array by default', () => {
            const users = [
                buildUser({ id: 1, managerId: null }),
                buildUser({ id: 2, managerId: null }),
            ]
            const state = reducer(initialState, usersLoaded(users))
            const all = hierarchyAdapter.getSelectors().selectAll(state)

            expect(all).toHaveLength(2)
            expect(all.every((node) => Array.isArray(node.children))).toBe(true)
        })

        it('treats users with managerId null as roots', () => {
            const users = [
                buildUser({ id: 1, managerId: null }),
                buildUser({ id: 2, managerId: null }),
            ]
            const state = reducer(initialState, usersLoaded(users))

            expect(state.rootIds).toEqual([1, 2])
        })

        it('nests a user under its manager when the manager exists', () => {
            const users = [
                buildUser({ id: 1, managerId: null }),
                buildUser({ id: 2, managerId: 1 }),
            ]
            const state = reducer(initialState, usersLoaded(users))
            const manager = hierarchyAdapter.getSelectors().selectById(state, 1)

            expect(manager?.children).toEqual([2])
            expect(state.rootIds).toEqual([1])
        })

        it('treats a user as root when its managerId does not exist in the dataset', () => {
            const users = [
                buildUser({ id: 1, managerId: 999 }),
            ]
            const state = reducer(initialState, usersLoaded(users))

            expect(state.rootIds).toEqual([1])
        })

        it('builds a multi-level hierarchy correctly', () => {
            const users = [
                buildUser({ id: 1, managerId: null }),
                buildUser({ id: 2, managerId: 1 }),
                buildUser({ id: 3, managerId: 2 }),
                buildUser({ id: 4, managerId: 1 }),
            ]
            const state = reducer(initialState, usersLoaded(users))
            const selectors = hierarchyAdapter.getSelectors()

            expect(state.rootIds).toEqual([1])
            expect(selectors.selectById(state, 1)?.children).toEqual([2, 4])
            expect(selectors.selectById(state, 2)?.children).toEqual([3])
            expect(selectors.selectById(state, 3)?.children).toEqual([])
            expect(selectors.selectById(state, 4)?.children).toEqual([])
        })

        it('replaces existing entities rather than merging on a second load', () => {
            const firstLoad = [buildUser({ id: 1, managerId: null })]
            const secondLoad = [buildUser({ id: 2, managerId: null })]

            const afterFirst = reducer(initialState, usersLoaded(firstLoad))
            const afterSecond = reducer(afterFirst, usersLoaded(secondLoad))
            const all = hierarchyAdapter.getSelectors().selectAll(afterSecond)

            expect(all).toHaveLength(1)
            expect(all[0].id).toBe(2)
            expect(afterSecond.rootIds).toEqual([2])
        })

        it('handles an empty user list', () => {
            const state = reducer(initialState, usersLoaded([]))

            expect(state.rootIds).toEqual([])
            expect(hierarchyAdapter.getSelectors().selectAll(state)).toEqual([])
            expect(state.status).toBe('success')
        })
    })
})