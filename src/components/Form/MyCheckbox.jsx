import React from 'react'
import { useField } from 'formik'

export default function MyCheckbox({ children, label, ...props }) {
    const [field, meta] = useField({ ...props, type: 'checkbox' });

    return (
        <div className="m-4 flex">
            <input type="checkbox" {...field} {...props} className={"border mr-2" + (meta.touched && meta.error ? " bg-red-100 " : " bg-blue-100 ")} />
            <label htmlFor={props.id} className="text-blue-900">
                {label}
            </label>
            {meta.touched && meta.error ? (
                <p className="text-red-600 text-xs italic">{meta.error}</p>
            ) : null}
        </div>

    );
}
