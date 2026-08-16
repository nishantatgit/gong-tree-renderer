import { useState } from "react"

import type {
    ChangeEvent,
    JSX,
    SubmitEvent,
} from "react"

import "./Form.css"
import FormField from "./FormField"

import {
    isValidEmail,
    isValidPassword,
} from "../../utils/inputValidator"

interface FormErrors {
    email: string
    password: string
}

interface FormProps {
    formId: string

    onSubmit: (
        email: string,
        password: string,
    ) => void | Promise<void>

    submitLabel?: string
    isSubmitting?: boolean
    serverError?: string | null
    formClass?: string
}

function Form({
    formId,
    onSubmit,
    submitLabel = "Login",
    isSubmitting = false,
    serverError = null,
    formClass
}: FormProps): JSX.Element {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errors, setErrors] = useState<FormErrors>({
        email: "",
        password: "",
    })

    function handleEmailChange(
        event: ChangeEvent<HTMLInputElement>,
    ) {
        setEmail(event.target.value)

        if (errors.email) {
            setErrors((currentErrors) => ({
                ...currentErrors,
                email: "",
            }))
        }
    }

    function handlePasswordChange(
        event: ChangeEvent<HTMLInputElement>,
    ) {
        setPassword(event.target.value)

        if (errors.password) {
            setErrors((currentErrors) => ({
                ...currentErrors,
                password: "",
            }))
        }
    }

    function validate(): boolean {
        const nextErrors: FormErrors = {
            email: "",
            password: "",
        }

        const normalizedEmail = email.trim()

        if (!normalizedEmail) {
            nextErrors.email = "Email is required."
        } else if (!isValidEmail(normalizedEmail)) {
            nextErrors.email =
                "Enter a valid email address."
        }

        if (!isValidPassword(password)) {
            nextErrors.password =
                "Please enter password"
        }

        setErrors(nextErrors)

        return (
            nextErrors.email === "" &&
            nextErrors.password === ""
        )
    }

    function handleSubmit(
        event: SubmitEvent<HTMLFormElement>,
    ) {
        event.preventDefault()

        if (!validate()) {
            return
        }

        void onSubmit(email.trim(), password)
    }

    return (
        <form
            className={`form center ${formClass}`}
            id={formId}
            onSubmit={handleSubmit}
            noValidate
        >
            <FormField
                id="email"
                name="email"
                label="email address:"
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                error={errors.email}
            />

            <FormField
                id="password"
                name="password"
                label=" password:"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                error={errors.password}
            />

            {serverError && (
                <p
                    className="form-error"
                    role="alert"
                >
                    {serverError}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? "Logging in…"
                    : submitLabel}
            </button>
        </form>
    )
}

export default Form