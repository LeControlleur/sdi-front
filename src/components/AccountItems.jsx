import React from 'react'

export default function AccountItems({name, value}) {

    value = value ? value : ""

    return (
        <div className="grid grid-cols-7 flex flex-row align-start text-3xl mb-4">
            <h3 className="col-span-2 font-serif font-semibold md:w-9/12">
                {name}
            </h3>
            <span className="col-span-1">
                :
            </span>
            <span className="col-span-4 font-serif">
                {value}
            </span>
        </div>
    )
}
