import { Field } from "formik";

export function CustomField({ errors, touched, type, name, placeholder }) {
    return (
        <>
            <Field name={name} type={type} placeholder={placeholder} />

            {errors[name] && touched[name] && (
                <div>{errors[name]}</div>
            )}
        </>
    )
}