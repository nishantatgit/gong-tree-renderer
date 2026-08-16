import { describe, it, expect } from 'vitest'
import reducer, { toggleNode } from '../treeNodeExapnsionSlice'

const initialState = reducer(undefined, { type: '@@INIT' })

describe('expansionSlice', () => {
    it('returns the correct initial state', () => {
        expect(initialState).toEqual({ expandedById: {} })
    })

    it('expands a node that has no existing entry (undefined -> true)', () => {
        const state = reducer(initialState, toggleNode(1))

        expect(state.expandedById[1]).toBe(true)
    })

    it('collapses a node that is currently expanded', () => {
        const expandedState = reducer(initialState, toggleNode(1))
        const state = reducer(expandedState, toggleNode(1))

        expect(state.expandedById[1]).toBe(false)
    })

    it('re-expands a node that was previously collapsed', () => {
        let state = reducer(initialState, toggleNode(1))
        state = reducer(state, toggleNode(1))
        state = reducer(state, toggleNode(1))

        expect(state.expandedById[1]).toBe(true)
    })

    it('toggles each node independently', () => {
        let state = reducer(initialState, toggleNode(1))
        state = reducer(state, toggleNode(2))

        expect(state.expandedById[1]).toBe(true)
        expect(state.expandedById[2]).toBe(true)

        state = reducer(state, toggleNode(1))

        expect(state.expandedById[1]).toBe(false)
        expect(state.expandedById[2]).toBe(true)
    })

    it('does not mutate the original state object (immutability check)', () => {
        const before = reducer(initialState, toggleNode(1))
        const beforeSnapshot = {
            ...before,
            expandedById: { ...before.expandedById },
        }

        reducer(before, toggleNode(2))

        expect(before).toEqual(beforeSnapshot)
    })
})
