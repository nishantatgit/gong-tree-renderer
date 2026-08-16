import type { User } from '../types/user'
import { encode } from '../utils/encryptor'
import { BASE_URL, AUTH_COLLECTION } from '../constants'

export async function authenticate(
    email: string,
    password: string,
): Promise<number | null> {
    const secret = encode(email, password)

    const response = await fetch(
        `${BASE_URL}/${AUTH_COLLECTION}/${secret}.json`,
    )

    if (!response.ok) {
        throw new Error(`Authentication failed with status ${response.status}`)
    }

    return response.json()
}

export async function getUsers(signal?: AbortSignal): Promise<User[]> {
    const response = await fetch(`${BASE_URL}/users.json`, { signal })

    if (!response.ok) {
        throw new Error(`Unable to retrieve users: ${response.status}`)
    }

    const users: Array<User | null> | null = await response.json()

    if (!users) {
        return []
    }

    return users.filter((user): user is User => user !== null)
}
