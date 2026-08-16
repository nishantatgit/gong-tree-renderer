import {
    useEffect,
    useState,
} from "react"

import { getUserInitials } from "../../utils/getUserInitials"
import { getUserFullName } from "../../utils/getUserFullName"

interface UserBadgeProps {
    photo: string
    firstName: string
    lastName: string
}

function UserBadge({
    photo,
    firstName,
    lastName,
}: UserBadgeProps) {
    const [validatedPhoto, setValidatedPhoto] =
        useState<string | null>(null)

    useEffect(() => {
        if (!photo) {
            return
        }

        const img = new Image()

        img.onload = () => {
            setValidatedPhoto(photo)
        }

        img.onerror = () => {
            setValidatedPhoto(null)
        }

        img.src = photo
    }, [photo])

    return (
        <div className="user-badge">
            {validatedPhoto ? (
                <img
                    src={validatedPhoto}
                    alt={getUserFullName(
                        firstName,
                        lastName,
                    )}
                    className="user-photo"
                />
            ) : (
                <span className="user-initials">
                    {getUserInitials(firstName, lastName)}
                </span>
            )}
        </div>
    )
}

export default UserBadge