import React from 'react'

export function ButtonLight({ children, ...props }) {
    return (
        <button className="px-4 bg-transparent p-3 rounded-lg border border-transparent text-blue-900 font-bold hover:bg-blue-50 mr-2" {...props}>
            {children}
        </button>
    )
}

export function InputButtonLight({ children, ...props }) {
    return (
        <input className="px-4 bg-transparent p-3 rounded-lg border border-transparent text-blue-900 font-bold hover:bg-blue-50 mr-2" {...props} {...props} />
    )
}

export function ButtonDark({ children, className, ...props }) {
    return (
        <button className={"px-4 bg-blue-800 p-3 rounded-lg text-white font-bold hover:bg-blue-900 " + className} {...props}>
            {children}
        </button>
    )
}

export function InputButtonDark({ children, className, ...props }) {
    return (
        <input className={"px-4 bg-blue-800 p-3 rounded-lg text-white font-bold hover:bg-blue-900 " + className} {...props} />
    )
}
