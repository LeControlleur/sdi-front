import React, {
    useRef,
} from 'react'
import Fade from 'react-reveal/Fade'

export default function Modal({ title, isOpen, toggle, children, small }) {

    let addClass = small ? "w-1/2" : "w-11/12"
    const ref = useRef()

    const closeModal = () => {
        toggle(!isOpen)
    }

    return (
        <div ref={ref} className="modal modal-active fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="absolute w-full h-full bg-gray-900 opacity-50 z-50" onClick={closeModal}></div>


            <Fade bottom>
                <div className={`modal-container bg-white md:max-w-md mx-auto rounded-xl shadow-lg z-50 overflow-y-auto max-h-80vh ${addClass}`}>

                    <div className="modal-content py-4 text-left px-6">
                        <div className="flex justify-between items-center pb-3">
                            <p className="text-2xl text-blue-900 font-bold">
                                {title}
                            </p>
                            <div className="cursor-pointer z-50" onClick={closeModal}>
                                <svg className="fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                </svg>
                            </div>
                        </div>

                        {children}

                    </div>
                </div>
            </Fade>
        </div>
    )
}

