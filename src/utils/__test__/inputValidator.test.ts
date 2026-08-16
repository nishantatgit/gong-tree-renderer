import { describe, it, expect } from 'vitest'
import { isValidEmail, isValidPassword } from '../inputValidator'

describe('isValidEmail', () => {
    it('returns true for a standard valid email', () => {
        expect(isValidEmail('anthony.xiouping@xtreet.tvl')).toBe(true)
    })

    it('returns true for emails with subdomains', () => {
        expect(isValidEmail('anthony.xiouping@mail.xtreet.tvl')).toBe(true)
    })

    it('returns true for emails with dots and plus signs in the local part', () => {
        expect(isValidEmail('anthony.xiouping+test@xtreet.tvl')).toBe(true)
    })

    it('returns false when missing the @ symbol', () => {
        expect(isValidEmail('anthony.xiouping.xtreet.tvl')).toBe(false)
    })

    it('returns false when missing the domain', () => {
        expect(isValidEmail('anthony.xiouping@')).toBe(false)
    })

    it('returns false when missing the local part', () => {
        expect(isValidEmail('@xtreet.tvl')).toBe(false)
    })

    it('returns false when the domain has no dot', () => {
        expect(isValidEmail('anthony.xiouping@xtreet')).toBe(false)
    })

    it('returns false when the email contains a space', () => {
        expect(isValidEmail('anthony xiouping@xtreet.tvl')).toBe(false)
    })

    it('returns false for an empty string', () => {
        expect(isValidEmail('')).toBe(false)
    })

    it('returns false when there are multiple @ symbols', () => {
        expect(isValidEmail('anthony@xiouping@xtreet.tvl')).toBe(false)
    })
})

describe('isValidPassword', () => {
    it('returns true for a non-empty password', () => {
        expect(isValidPassword('a')).toBe(true)
    })

    it('returns false for an empty string', () => {
        expect(isValidPassword('')).toBe(false)
    })
})