import React from 'react'
import { useField } from 'formik'

export default function MyTextInput({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <div className="m-4">
            <label className="block text-sm text-blue-900" htmlFor={props.id || props.name}>{label}</label>
            <input className={"w-full px-5 py-1 text-blue-900 font-semibold rounded focus:outline-none focus:bg-white" + ((meta.touched && meta.error) ? " bg-red-100 " : " bg-blue-100 ")} {...field} {...props} />

            {meta.touched && meta.error ? (
                <p className="text-red-600 text-xs italic">{meta.error}</p>
            ) : null}
        </div>
    )
}
