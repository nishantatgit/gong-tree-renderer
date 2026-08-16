import type {
    ChangeEvent,
    HTMLInputAutoCompleteAttribute,
    JSX,
} from "react"

interface FormFieldProps {
    id: string
    label: string
    name: string
    type: "email" | "password"
    placeholder: string
    value: string

    autoComplete?: HTMLInputAutoCompleteAttribute
    error?: string

    onChange: (
        event: ChangeEvent<HTMLInputElement>,
    ) => void
}

function FormField({
    id,
    label,
    name,
    type,
    placeholder,
    value,
    autoComplete,
    error,
    onChange,
}: FormFieldProps): JSX.Element {
    const errorId = `${id}-error`

    return (
        <div className="form-field">
            <label htmlFor={id}>
                {label}
            </label>

            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                autoComplete={autoComplete}
                onChange={onChange}
                aria-invalid={Boolean(error)}
                aria-describedby={
                    error ? errorId : undefined
                }
            />

            {error && (
                <span
                    id={errorId}
                    className="error"
                    role="alert"
                >
                    {error}
                </span>
            )}
        </div>
    )
}

export default FormField