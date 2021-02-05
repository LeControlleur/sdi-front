import React from 'react'
import { useField } from 'formik'

export default function MyTextInputShow({ label, value, ...props }) {
    return (
        <div className="m-4">
            <label className="block text-sm text-blue-900" htmlFor={props.id || props.name}>{label}</label>
            <p className={"w-full px-5 py-1 text-blue-900 font-semibold rounded bg-blue-100 "}>
                {value}
            </p>

        </div>
    )
}
