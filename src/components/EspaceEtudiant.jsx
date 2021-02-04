import React, {
    useState
} from 'react'

import * as Yup from 'yup';
import { phoneRegExp } from '../constants'

import { api_url } from '../constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGraduate, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import Navbar from './Navbar';
import AccountItems from './AccountItems';


import Modal from './utils/Modal'


import { Formik, Form } from 'formik';
import { MyTextInput, MyTextArea, ButtonLight, InputButtonDark, MySelect, MyCheckbox } from './Form';


import '../assets/css/families.css';
import bienvenue_a_l_esatic from '../assets/imgs/bienvenue_a_l_esatic.jpg';


export default function EspaceEtudiant({ session, setSession }) {

    const [participationHack, setParticipationHack] = useState(false)
    const [participationJetic, setParticipationJetic] = useState(false)
    const [jeticErreur, setJeticErreur] = useState(false)
    const [hackErreur, setHackErreur] = useState(false)
    const [popUpJetic, setPopUpJetic] = useState(false)
    const [popUpHack, setPopUpHack] = useState(false)



    return (
        <div style={{ backgroundImage: `url(${bienvenue_a_l_esatic})`, backgroundSize: "cover", minHeight: "100vh", backgroundAttachment: "fixed" }}>

            <Navbar />

            <div id="corps_espace_prof" className="bg-white bg-opacity-80 pb-10" style={{ minHeight: "calc(100vh - 5rem)" }}>
                <h1 className="font-semibold lobster text-7xl ml-10 pt-8 text-gray-900">
                    Espace Etudiant
                </h1>

                <FontAwesomeIcon className="hidden md:block" icon={faUserGraduate} style={{ fontSize: "500px", opacity: "0.6", position: 'absolute', right: "40px" }} />


                <section className="mt-16 ml-20 md:w-7/12 mb-16">
                    <AccountItems name="Identifiant" value={session.identifiant} />
                    <AccountItems name="Nom" value={session.nom} />
                    <AccountItems name="Prénoms" value={session.prenoms} />
                    <AccountItems name="Classe" value={session.classe} />
                    <AccountItems name="Contact" value={session.contact} />
                    <AccountItems name="Adresse-mail" value={session.email} />
                </section>


                <p className="md:w-7/12 text-gray-900 text-center mb-10 font-semibold">
                    La Semaine De l'Innovation (SDI) aura lieu du Jeudi 25 Février au Lundi 1er Mars 2021. <br />
                    Vous pouvez participer à la JETIC ou au très reputé Technovore Hackathon
                </p>

                <div className="flex justify-around md:w-7/12">

                    <button className="bg-gray-900 py-2 px-4 text-white" onClick={() => {
                        setParticipationHack(true)
                    }}>
                        <span>Participer au Hackathon</span>
                    </button>

                    <button className="bg-gray-900 py-2 px-4 text-white" onClick={() => {
                        setParticipationJetic(true)
                    }}>
                        <span>Participer à la JETIC</span>
                    </button>
                </div>

            </div>





            {
                //  Pop-up pour confirmation de présence
                popUpJetic &&
                <Modal isOpen={popUpJetic} toggle={setPopUpJetic} transparent small darkModal>
                    <p className="flex items-center my-4">
                        <FontAwesomeIcon icon={faCheckCircle} size="4x" className="mr-6" color="green" />
                        <h3 className="text-2xl font-semibold">
                            Inscription à la JETIC validée
                        </h3>
                    </p>
                </Modal>
            }

            {
                //  Pop-up pour confirmation de présence
                popUpHack &&
                <Modal isOpen={popUpHack} toggle={setPopUpHack} transparent small darkModal>
                    <p className="flex items-center my-4">
                        <FontAwesomeIcon icon={faCheckCircle} size="4x" className="mr-6" color="green" />
                        <h3 className="text-2xl font-semibold">
                            Inscription au Hackathon validée
                        </h3>
                    </p>
                </Modal>
            }


            {
                //  Pop-up pour la participation au Hackathon
                participationHack &&
                <Modal title="Participation au Technovore Hackathon" isOpen={setParticipationHack} toggle={setParticipationHack} transparent darkModal>
                    {
                        <Formik

                            initialValues={{
                                "nom_equipe": "",
                                "niveau_hack": "niveau_1",
                                "branche_hack": "",
                                "id_1_membre": session.identifiant,
                                "id_2_membre": "SDI-E",
                                "id_3_membre": "SDI-E"
                            }}

                            validationSchema={Yup.object({
                                nom_equipe: Yup
                                    .string()
                                    .required("Ce champ est requis"),
                                branche_hack: Yup
                                    .string()
                                    .required("Ce champ est requis"),
                                id_1_membre: Yup
                                    .string(),
                                id_2_membre: Yup
                                    .string(),
                                id_3_membre: Yup
                                    .string(),
                            })}

                            onSubmit={(values) => {
                                console.log(values);

                                values.id_1_membre = session.identifiant

                                //  Vérification du 2eme membre
                                if (values.id_2_membre !== "" && values.id_2_membre !== "SDI-E") {
                                    fetch(api_url + "/etudiant/verifEtudiant", {
                                        "method": "POST",
                                        "headers": {
                                            "content-type": "application/json"
                                        },
                                        "body": JSON.stringify({
                                            etudiant: values.id_2_membre
                                        })
                                    })
                                        .then(response => response.json())
                                        .then(response => {

                                            if (response.success) {

                                            } else {

                                            }
                                        })
                                        .catch(err => {
                                            setJeticErreur(true)
                                            console.log(err);
                                        });
                                }


                                if (values.id_3_membre !== "" && values.id_3_membre !== "SDI-E") {
                                    fetch(api_url + "/etudiant/verifEtudiant", {
                                        "method": "POST",
                                        "headers": {
                                            "content-type": "application/json"
                                        },
                                        "body": JSON.stringify({
                                            etudiant: values.id_3_membre
                                        })
                                    })
                                        .then(response => response.json())
                                        .then(response => {

                                            if (response.success) {
                                                
                                            } else {

                                            }
                                        })
                                        .catch(err => {
                                            setJeticErreur(true)
                                            console.log(err);
                                        });
                                }



                                fetch(api_url + "/hack/insertParticipant", {
                                    "method": "POST",
                                    "headers": {
                                        "content-type": "application/json"
                                    },
                                    "body": JSON.stringify(values)
                                })
                                    .then(response => response.json())
                                    .then(response => {

                                        console.log("Res");
                                        console.log(response);

                                        if (response.success) {
                                            setParticipationHack(false)
                                            setHackErreur(false)
                                            setPopUpHack(true)
                                        } else {
                                            setJeticErreur(true)
                                            console.error(response.erreur);
                                        }
                                    })
                                    .catch(err => {
                                        setJeticErreur(true)
                                        console.log(err);
                                    });
                            }}
                        >
                            <Form>
                                <MyTextInput
                                    label="Nom de l'équipe"
                                    name="nom_equipe"
                                    type="text"
                                />
                                <MySelect
                                    label="Niveau"
                                    name="niveau_hack"
                                >
                                    <option value="niveau_1">Niveau 1</option>
                                    <option value="niveau_2">Niveau 2</option>
                                    <option value="niveau_3">Niveau 3</option>
                                </MySelect>
                                <MyTextInput
                                    label="Domaine de prédilection"
                                    name="branche_hack"
                                    type="text"
                                    required={true}
                                />
                                <MyTextInput
                                    label="Identifiant du 1er membre"
                                    name="id_1_membre"
                                    type="text"
                                    required={true}
                                />
                                <MyTextInput
                                    label="Identifiant du 2nd membre"
                                    name="id_2_membre"
                                    type="text"
                                />
                                <MyTextInput
                                    label="Identifiant du 3eme membre"
                                    name="id_3_membre"
                                    type="text"
                                />


                                {
                                    hackErreur &&
                                    <p className="text-center text-red-700 my-4">
                                        Une erreur est survenue
                                    </p>
                                }

                                <div className="flex justify-around">
                                    <div className="flex justify-between pt-2">
                                        <ButtonLight value="Annuler" onClick={() => {
                                            setParticipationHack(false)
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





            {
                //  Pop-up pour la participation à la JETIC
                participationJetic &&
                <Modal title="Participation à la JETIC" isOpen={setParticipationJetic} toggle={setParticipationJetic} transparent darkModal>
                    {
                        <Formik
                            initialValues={{
                                "titre_projet": "",
                                "description_projet": "",
                                "titre_tp": "",
                                "description_tp": "",
                            }}

                            validationSchema={Yup.object({
                                titre_projet: Yup
                                    .string(),
                                description_projet: Yup
                                    .string(),
                                titre_tp: Yup
                                    .string(),
                                description_tp: Yup
                                    .string()
                            })}

                            onSubmit={(values) => {
                                console.log(values);

                                values.etudiant = session.identifiant

                                fetch(api_url + "/jetic/insertJeticParticipant", {
                                    "method": "POST",
                                    "headers": {
                                        "content-type": "application/json"
                                    },
                                    "body": JSON.stringify(values)
                                })
                                    .then(response => response.json())
                                    .then(response => {
                                        if (response.success) {
                                            setParticipationJetic(false)
                                            setJeticErreur(false)
                                            setPopUpJetic(true)
                                        } else {
                                            setJeticErreur(true)
                                            console.error(response.erreur);
                                        }
                                    })
                                    .catch(err => {
                                        setJeticErreur(true)
                                        console.log(err);
                                    });
                            }}

                        >
                            <Form>

                                <div className="border border-blue-300 rounded-2xl ">
                                    <span className="text-blue-900 bg-white text-sm relative px-4" style={{
                                        "top": "-12px",
                                        "right": "-10px"
                                    }}>
                                        Projet
                                    </span>

                                    <MyTextInput
                                        label="Titre du projet"
                                        name="titre_projet"
                                        id="titre_projet"
                                        type="text"
                                    />
                                    <MyTextArea
                                        label="Description du projet"
                                        name="description_projet"
                                        id="description_projet"
                                        type="text"
                                    />
                                </div>


                                <div className="border border-blue-300 rounded-2xl mt-8">
                                    <span className="text-blue-900 bg-white text-sm relative px-4" style={{
                                        "top": "-12px",
                                        "right": "-10px"
                                    }}>
                                        Travaux pratiques
                                    </span>

                                    <MyTextInput
                                        label="Titre du TP"
                                        name="titre_tp"
                                        id="titre_tp"
                                        type="text"
                                    />
                                    <MyTextArea
                                        label="Description du TP"
                                        name="description_tp"
                                        id="description_tp"
                                        type="text"
                                    />
                                </div>


                                {
                                    jeticErreur &&
                                    <p className="text-center text-red-700 my-4">
                                        Une erreur est survenue
                                    </p>
                                }


                                <div className="flex justify-around">
                                    <div className="flex justify-between pt-2">
                                        <ButtonLight value="Annuler" onClick={() => {
                                            setParticipationJetic(false)
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
