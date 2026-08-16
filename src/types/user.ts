export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    photo: string
    managerId: number | null
    children: number[]
}
