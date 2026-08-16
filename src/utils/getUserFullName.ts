import {UNKNOWN_USER } from "../constants"

function getUserFullName(firstName: string, lastName: string): string {

    if (!firstName && !lastName) {
        return UNKNOWN_USER.firstName + " " + UNKNOWN_USER.lastName
    }

    if (!firstName) {
        return lastName
    }

    if (!lastName) {
        return firstName
    }

    return `${firstName} ${lastName}`
}

export { getUserFullName }