import Constant from '../constants'
function getUserInitials(firstName: string, lastName: string): string {
    const { UNKNOWN_USER } = Constant

    if (!firstName && !lastName) {
        return UNKNOWN_USER.initials
    }

    if (!firstName) {
        return lastName.charAt(0).toUpperCase()
    }

    if (!lastName) {
        return firstName.charAt(0).toUpperCase()
    }

    const firstInitial = firstName.charAt(0).toUpperCase()
    const lastInitial = lastName.charAt(0).toUpperCase()

    return `${firstInitial}${lastInitial}`
}

export { getUserInitials }
