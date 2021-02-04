import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faHiking } from '@fortawesome/free-solid-svg-icons'



const deconnexion = () => {
    window.localStorage.removeItem("sdi_session")
    window.location.pathname = ""
}


export default function Navbar() {
    return (
        <div>
            <nav className="bg-gray-900 h-20 flex flex-row justify-between items-center">
                <div>
                    <h1>
                        Logo SDI
                    </h1>
                </div>


                <div className="mr-20 ml-10 bg-white rounded-full h-12 w-24 flex justify-center items-center cursor-pointer" onClick={deconnexion}>
                    <FontAwesomeIcon icon={faHiking} className="blue-900" size="2x mr-4" />
                    <FontAwesomeIcon icon={faSignOutAlt} className="blue-900" size="2x" />
                </div>

            </nav>


        </div>
    )
}
