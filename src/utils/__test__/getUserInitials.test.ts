import { describe, it, expect } from 'vitest'
import { getUserInitials } from '../getUserInitials'
import Constant from '../../constants'

const { UNKNOWN_USER } = Constant

describe('getUserInitials', () => {
    it('returns both initials when both firstName and lastName are provided', () => {
        expect(getUserInitials('Anthony', 'Xiouping')).toBe('AX')
    })

    it('returns only the last initial when firstName is empty', () => {
        expect(getUserInitials('', 'Xiouping')).toBe('X')
    })

    it('returns only the first initial when lastName is empty', () => {
        expect(getUserInitials('Anthony', '')).toBe('A')
    })

    it('returns the unknown user initials when both firstName and lastName are empty', () => {
        expect(getUserInitials('', '')).toBe(UNKNOWN_USER.initials)
    })

    it('uppercases initials even when input is lowercase', () => {
        expect(getUserInitials('anthony', 'xiouping')).toBe('AX')
    })
})