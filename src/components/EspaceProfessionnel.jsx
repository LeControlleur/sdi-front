import React, {
    useState,
    useEffect
} from 'react'

import * as Yup from 'yup';
import { phoneRegExp } from '../constants'

import { api_url } from '../constants';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'


import Navbar from './Navbar';
import AccountItems from './AccountItems';


import Modal from './utils/Modal'


import { Formik, Form } from 'formik';
import { MyTextInput, ButtonLight, ButtonDark, InputButtonDark } from './Form';


import '../assets/css/families.css';
import bienvenue_a_l_esatic from '../assets/imgs/bienvenue_a_l_esatic.jpg';


export default function EspaceProfessionnel({ session, setSession }) {

    const [presence, setPresence] = useState(false)
    const [confirmation, setConfirmation] = useState(session.present)
    const [annulation, setAnnulation] = useState(false)
    const [modification, setModification] = useState(false)
    const [erreur, setErreur] = useState(false)



    return (
        <div style={{ backgroundImage: `url(${bienvenue_a_l_esatic})`, backgroundSize: "cover", minHeight: "100vh", backgroundAttachment: "fixed" }}>

            <Navbar />

            <div id="corps_espace_prof" className="bg-white bg-opacity-80 pb-10" style={{ minHeight: "calc(100vh - 5rem)" }}>
                <h1 className="font-semibold lobster text-7xl ml-10 pt-8 text-gray-900">
                    Espace Professionnel
                </h1>

                <FontAwesomeIcon className="hidden md:block" icon={faChalkboardTeacher} style={{ fontSize: "500px", opacity: "0.6", position: 'absolute', right: "40px" }} />

                <section className="mt-16 ml-20 md:w-7/12 mb-16">
                    <AccountItems name="N° du stand" value={session.stand} />
                    <AccountItems name="Raison sociale" value={session.raison_sociale} />
                    <AccountItems name="Interlocuteur" value={session.interlocuteur} />
                    <AccountItems name="Contact" value={session.contact} />
                    <AccountItems name="Adresse-mail" value={session.email} />
                </section>

                <p className="md:w-7/12 text-gray-900 text-center mb-10 font-semibold">
                    Le Salon de l'Innovation (SI) aura lieu le Samedi 27 Février 2020 <br />
                    Veuillez donc confirmer ou infirmer votre présence
                </p>

                <div className="flex justify-center md:w-7/12">
                    {
                        presence
                            ?
                            <button className="bg-red-600 py-2 px-4 text-white ml-20" onClick={() => {

                                fetch(api_url + "/prof/presenceProfessionnel", {
                                    "method": "POST",
                                    "headers": {
                                        "content-type": "application/json"
                                    },
                                    "body": JSON.stringify({
                                        email: session.email,
                                        present: 0,
                                    })
                                })
                                    .then(response => response.json())
                                    .then(response => {

                                        if (response.success) {
                                            setAnnulation(true)
                                            setPresence(false)
                                        }
                                    })
                                    .catch(err => {
                                        console.log("Il y a une erreur");
                                    });
                            }}>
                                Infirmer sa présence
                            </button>
                            :
                            <button className="bg-green-700 py-2 px-4 text-white ml-20" onClick={() => {
                                fetch(api_url + "/prof/presenceProfessionnel", {
                                    "method": "POST",
                                    "headers": {
                                        "content-type": "application/json"
                                    },
                                    "body": JSON.stringify({
                                        email: session.email,
                                        present: 1,
                                    })
                                })
                                    .then(response => response.json())
                                    .then(response => {

                                        if (response.success) {
                                            setConfirmation(true)
                                            setPresence(true)
                                        }
                                    })
                                    .catch(err => {
                                        console.log("Il y a une erreur");
                                    });
                            }}>
                                Confimer sa présence
                            </button>
                    }

                    <button className="bg-gray-900 py-2 px-4 text-white ml-20" onClick={() => {
                        setModification(true)
                    }}>
                        Modifier ses informations
                    </button>
                </div>

            </div>






            {
                //  Pop-up pour confirmation de présence
                (confirmation && !annulation) &&
                <Modal isOpen={confirmation} toggle={setConfirmation} transparent small darkModal>
                    <p className="flex items-center my-4">
                        <FontAwesomeIcon icon={faCheckCircle} size="4x" className="mr-6" color="green" />
                        <h3 className="text-2xl font-semibold">
                            Présence confirmée
                        </h3>
                    </p>
                </Modal>
            }



            {
                //  Pop-up pour infirmation de présence
                (annulation && !confirmation) &&
                <Modal isOpen={annulation} toggle={setAnnulation} transparent small darkModal>
                    <p className="flex items-center my-4">
                        <FontAwesomeIcon icon={faWindowClose} size="4x" className="mr-6" color="red" />
                        <h3 className="text-2xl font-semibold">
                            Présence annulée
                        </h3>
                    </p>
                </Modal>
            }



            {
                //  Pop-up pour modification des infos
                modification &&
                <Modal title="Espace Professionnel" isOpen={modification} toggle={setModification} transparent darkModal>
                    {
                        <Formik
                            initialValues={{
                                "raison_sociale": session.raison_sociale ? session.raison_sociale : "",
                                "interlocuteur": session.interlocuteur ? session.interlocuteur : "",
                                "contact": session.contact ? session.contact : "",
                                "email": session.email ? session.email : ""
                            }}

                            validationSchema={Yup.object({
                                raison_sociale: Yup.string(),
                                interlocuteur: Yup.string(),
                                contact: Yup.string()
                                    .matches(phoneRegExp, 'Le numéro de téléphone est invalide'),
                                email: Yup.string()
                                    .email('Adresse électronique invalide'),
                            })}

                            onSubmit={(values) => {

                                fetch(api_url + "/prof/UpdateProfessionnel", {
                                    "method": "POST",
                                    "headers": {
                                        "content-type": "application/json"
                                    },
                                    "body": JSON.stringify({
                                        old_email: session.email,
                                        ...values
                                    })
                                })
                                    .then(response => response.json())
                                    .then(response => {
                                        if (response.success) {
                                            for (let [key, value] of Object.entries(values)) {
                                                session[`${key}`] = value
                                            }
                                            console.log(session)    
                                            setErreur(false)
                                            setSession(session)
                                            setModification(false)
                                        } else {
                                            setErreur(true)
                                        }
                                    })
                                    .catch(err => {
                                        setErreur(true)
                                        console.log(err);
                                    });

                            }}
                        >
                            <Form>

                                {
                                    erreur &&
                                    <p className="text-red-600 text-center">
                                        Une erreur est survenue
                                    </p>
                                }
                                <MyTextInput
                                    label="Raison sociale"
                                    name="raison_sociale"
                                    type="text"
                                />
                                <MyTextInput
                                    label="Interlocuteur"
                                    name="interlocuteur"
                                    type="text"
                                />
                                <MyTextInput
                                    label="Contact"
                                    name="contact"
                                    type="tel"
                                />
                                <MyTextInput
                                    label="Adresse mail"
                                    name="email"
                                    type="email"
                                    placeholder="sammy.bini@gmail.com"
                                />

                                <div className="flex justify-around">
                                    <div className="flex justify-between pt-2">
                                        <ButtonLight value="Annuler" onClick={() => {
                                            setModification(false)
                                        }}>
                                            Annuler
                                        </ButtonLight>
                                    </div>
                                    <div className="flex justify-between pt-2">
                                        <InputButtonDark type="submit" value="Valider" />
                                    </div>

                                </div>
                            </Form>
                        </Formik>
                    }
                </Modal>
            }




        </div>
    )
}
