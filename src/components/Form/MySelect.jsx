import React, { Children } from 'react'
import { useField } from 'formik'

export default function MySelect({ label, children, ...props }) {
    const [field, meta] = useField(props);

    return (
        <div className="m-4">
            <label className="block text-sm text-blue-900" htmlFor={props.id || props.name}>{label}</label>
            <select id={props.id} name={props.id || props.name} className={"w-full px-5 py-1 text-blue-900 font-semibold rounded focus:outline-none " + ((meta.touched && meta.error) ? " bg-red-100 " : " bg-blue-100 ")} {...field} {...props} >
                { children }
            </select>


            {
                meta.touched && meta.error ?
                    (
                        <p className="text-red-600 text-xs italic">{meta.error}</p>
                    )
                    : null
            }
        </div>
    )
}
