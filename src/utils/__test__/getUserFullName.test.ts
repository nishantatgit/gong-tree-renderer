// src/utils/getUserFullName.test.ts
import { describe, it, expect } from 'vitest'
import { getUserFullName } from '../getUserFullName'
import { UNKNOWN_USER } from '../../constants'

describe('getUserFullName', () => {
    it('returns the full name when both firstName and lastName are provided', () => {
        expect(getUserFullName('Anthony', 'Xiouping')).toBe('Anthony Xiouping')
    })

    it('returns only firstName when lastName is empty', () => {
        expect(getUserFullName('Anthony', '')).toBe('Anthony')
    })

    it('returns only lastName when firstName is empty', () => {
        expect(getUserFullName('', 'Xiouping')).toBe('Xiouping')
    })

    it('returns the unknown user full name when both firstName and lastName are empty', () => {
        expect(getUserFullName('', '')).toBe(
            `${UNKNOWN_USER.firstName} ${UNKNOWN_USER.lastName}`,
        )
    })
})
