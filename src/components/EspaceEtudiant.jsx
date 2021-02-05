import React, {
    useState,
    useEffect
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
import { MyTextInput, MyTextArea, ButtonLight, InputButtonDark, MySelect, MyTextInputShow } from './Form';


import '../assets/css/families.css';
import bienvenue_a_l_esatic from '../assets/imgs/bienvenue_a_l_esatic.jpg';


export default function EspaceEtudiant({ session, setSession }) {

    const [participationHack, setParticipationHack] = useState(false)
    const [showParticipationHack, setShowParticipationHack] = useState(false)
    const [hackInfos, setHackInfos] = useState({})

    const [participationJetic, setParticipationJetic] = useState(false)
    const [showParticipationJetic, setShowParticipationJetic] = useState(false)
    const [jeticInfos, setJeticInfos] = useState({})

    const [jeticErreur, setJeticErreur] = useState(false)
    const [hackErreur, setHackErreur] = useState(false)
    const [popUpJetic, setPopUpJetic] = useState(false)
    const [popUpHack, setPopUpHack] = useState(false)


    const [reloadoHack, setReloadoHack] = useState(false)
    const [reloadJetic, setReloadjetic] = useState(false)


    //  Recupère les infos de participation au hackathon
    useEffect(() => {
        if (session.hack) {
            fetch(api_url + "/hack/getInfosHackathon", {
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "body": JSON.stringify({
                    identifiant: session.identifiant
                })
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response.infos);
                    setHackInfos(response.infos)
                })
                .catch(() => {
                    console.error("Une erreur est survenue lors de la récupération des données");
                })
        }
    }, [reloadoHack])



    //  Recupère les infos de participation au hackathon
    useEffect(() => {
        if (session.jetic) {
            fetch(api_url + "/jetic/getInfosJetic", {
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "body": JSON.stringify({
                    etudiant: session.identifiant
                })
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response.infos);
                    setJeticInfos(response.infos)
                })
                .catch(() => {
                    console.error("Une erreur est survenue lors de la récupération des données");
                })
        }
    }, [reloadJetic])




    return (
        <div style={{ backgroundImage: `url(${bienvenue_a_l_esatic})`, backgroundSize: "cover", minHeight: "100vh", backgroundAttachment: "fixed" }}>

            <Navbar />

            <div className="bg-red-600 shadow-lg h-14 flex flex-row justify-between items-center">
                <marquee className="text-3xl bold">
                    TOUS LES ETUDIANTS AYANT FAIT LEUR INSCRIPTION AVANT LE VENDREDI 05/02/2021 A 18H SONT PRIÉS DE LA RECOMMENCER. VEUILLEZ NOUS EXCUSER POUR LES DÉSAGRÉMENTS CAUSÉS.
                </marquee>
            </div>

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

                    {
                        session.hack
                            ?
                            <button className="bg-gray-900 py-2 px-4 text-white" onClick={() => {
                                setShowParticipationHack(true)
                            }}>
                                <span>Modification Hackathon</span>
                            </button>
                            :
                            <button className="bg-gray-900 py-2 px-4 text-white" onClick={() => {
                                setParticipationHack(true)
                            }}>
                                <span>Inscription Hackathon</span>
                            </button>
                    }


                    {
                        session.jetic
                            ?
                            <button className="bg-gray-900 py-2 px-4 text-white" onClick={() => {
                                setShowParticipationJetic(true)
                            }}>
                                <span>Modification JETIC</span>
                            </button>
                            :
                            <button className="bg-gray-900 py-2 px-4 text-white" onClick={() => {
                                setParticipationJetic(true)
                            }}>
                                <span>Inscription JETIC</span>
                            </button>
                    }

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
                            })}

                            onSubmit={(values, { setErrors }) => {
                                console.log(values);

                                let errors = {}

                                //  Vérification des autres membres
                                let toVerif = []
                                let isGood = []

                                if (values.id_1_membre !== "" && values.id_1_membre !== "SDI-E") {
                                    toVerif.push("id_1_membre")
                                }

                                if (values.id_2_membre !== "" && values.id_2_membre !== "SDI-E") {
                                    toVerif.push("id_2_membre")
                                }

                                if (values.id_3_membre !== "" && values.id_3_membre !== "SDI-E") {
                                    toVerif.push("id_3_membre")
                                }

                                let lst_promises = []
                                toVerif.map((i) => {
                                    lst_promises.push(
                                        fetch(api_url + "/etudiant/verifEtudiant", {
                                            "method": "POST",
                                            "headers": {
                                                "content-type": "application/json"
                                            },
                                            "body": JSON.stringify({
                                                etudiant: values[`${i}`]
                                            })
                                        })
                                    )
                                })

                                Promise.all(lst_promises)
                                    .then(responses =>
                                        Promise.all(responses.map(res => res.json()))
                                    )
                                    .then(responses => {

                                        if (responses.every((response) => {
                                            return response.success
                                        })) {
                                            for (let i = 0; i < responses.length; i++) {
                                                const response = responses[i];
                                                console.log(response);
                                                if (response.success && response.etudiant.identifiant) {
                                                    errors[`${toVerif[i]}`] = "Cet étudiant n'est pas enregistré"
                                                    setErrors(errors)
                                                } else if (response.success && !response.etudiant.identifiant) {
                                                    isGood.push(values[toVerif[i]])
                                                } else {
                                                    errors[`${i}`] = "La vérification de cet étudiant n'a pas pu se faire"
                                                    setErrors(errors)
                                                }
                                            }

                                            console.log(isGood);
                                            console.log(toVerif);

                                            if (isGood.length === toVerif.length) {

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

                                                            let lst_promises = []

                                                            for (const i of isGood) {
                                                                lst_promises.push(
                                                                    fetch(api_url + "/etudiant/UpdateEtudiant", {
                                                                        "method": "POST",
                                                                        "headers": {
                                                                            "content-type": "application/json"
                                                                        },
                                                                        "body": JSON.stringify({
                                                                            getParams: {
                                                                                identifiant: i,
                                                                            },
                                                                            setParams: {
                                                                                hack: 1
                                                                            }
                                                                        })
                                                                    })
                                                                )
                                                            }

                                                            Promise.all(lst_promises)
                                                                .then(responses =>
                                                                    Promise.all(responses.map(res => res.json()))
                                                                )
                                                                .then(responses => {
                                                                    if (responses.every((response) => {
                                                                        return response.success
                                                                    })) {
                                                                        session.hack = 1
                                                                        setReloadoHack(!reloadoHack)
                                                                        window.localStorage.setItem("sdi_session", JSON.stringify(session))
                                                                        setParticipationHack(false)
                                                                        setHackErreur(false)
                                                                        setPopUpHack(true)
                                                                    } else {
                                                                        setHackErreur(true)
                                                                        console.log("Erreur non définie");
                                                                    }
                                                                })
                                                                .catch(err => {
                                                                    setHackErreur(true)
                                                                    console.log(err);
                                                                });
                                                        } else {
                                                            setHackErreur(true)
                                                            console.error(response.erreur);
                                                        }
                                                    })
                                                    .catch(err => {
                                                        setHackErreur(true)
                                                        console.log(err);
                                                    });

                                            }

                                        } else {
                                            setErrors(errors)
                                        }

                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })


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
                                    options={[
                                        ["niveau_1", "Niveau 1"],
                                        ["niveau_2", "Niveau 2"],
                                        ["niveau_3", "Niveau 3"]
                                    ]}
                                />
                                <MyTextInput
                                    label="Domaine de prédilection"
                                    name="branche_hack"
                                    type="text"
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
                //  Pop-up pour modification Hackathon
                showParticipationHack &&
                <Modal title="Modifications Hackathon" isOpen={setShowParticipationHack} toggle={setShowParticipationHack} transparent darkModal>
                    {
                        <Formik

                            initialValues={{
                                "nom_equipe": hackInfos.nom_equipe,
                                "niveau_hack": hackInfos.niveau_hack,
                                "branche_hack": hackInfos.branche_hack,
                                "id_1_membre": hackInfos.id_1_membre,
                                "id_2_membre": hackInfos.id_2_membre,
                                "id_3_membre": hackInfos.id_3_membre,
                            }}

                            validationSchema={Yup.object({
                                nom_equipe: Yup
                                    .string()
                                    .required("Ce champ est requis"),
                                branche_hack: Yup
                                    .string()
                                    .required("Ce champ est requis"),
                            })}

                            onSubmit={(values, { setErrors }) => {
                                console.log(values);

                                let errors = {}

                                //  Vérification des autres membres
                                let toVerif = []
                                let isGood = []

                                if (values.id_1_membre !== "" && values.id_1_membre !== "SDI-E") {
                                    toVerif.push("id_1_membre")
                                }

                                if (values.id_2_membre !== "" && values.id_2_membre !== "SDI-E") {
                                    toVerif.push("id_2_membre")
                                }

                                if (values.id_3_membre !== "" && values.id_3_membre !== "SDI-E") {
                                    toVerif.push("id_3_membre")
                                }

                                let lst_promises = []
                                toVerif.map((i) => {
                                    lst_promises.push(
                                        fetch(api_url + "/etudiant/verifEtudiant", {
                                            "method": "POST",
                                            "headers": {
                                                "content-type": "application/json"
                                            },
                                            "body": JSON.stringify({
                                                etudiant: values[`${i}`]
                                            })
                                        })
                                    )
                                })

                                Promise.all(lst_promises)
                                    .then(responses =>
                                        Promise.all(responses.map(res => res.json()))
                                    )
                                    .then(responses => {

                                        if (responses.every((response) => {
                                            return response.success
                                        })) {
                                            for (let i = 0; i < responses.length; i++) {
                                                const response = responses[i];
                                                console.log(response);
                                                if (response.success && response.etudiant.identifiant) {
                                                    errors[`${toVerif[i]}`] = "Cet étudiant n'est pas enregistré"
                                                    setErrors(errors)
                                                } else if (response.success && !response.etudiant.identifiant) {
                                                    isGood.push(values[toVerif[i]])
                                                } else {
                                                    errors[`${i}`] = "La vérification de cet étudiant n'a pas pu se faire"
                                                    setErrors(errors)
                                                }
                                            }

                                            console.log(isGood);
                                            console.log(toVerif);

                                            if (isGood.length === toVerif.length) {

                                                fetch(api_url + "/hack/updateParticipant", {
                                                    "method": "POST",
                                                    "headers": {
                                                        "content-type": "application/json"
                                                    },
                                                    "body": JSON.stringify({
                                                        getParams: {
                                                            _id: hackInfos._id
                                                        },
                                                        setParams: values
                                                    })
                                                })
                                                    .then(response => response.json())
                                                    .then(response => {

                                                        console.log("Res");
                                                        console.log(response);

                                                        if (response.success) {

                                                            let lst_promises = []

                                                            for (const i of isGood) {
                                                                lst_promises.push(
                                                                    fetch(api_url + "/etudiant/UpdateEtudiant", {
                                                                        "method": "POST",
                                                                        "headers": {
                                                                            "content-type": "application/json"
                                                                        },
                                                                        "body": JSON.stringify({
                                                                            getParams: {
                                                                                identifiant: i,
                                                                            },
                                                                            setParams: {
                                                                                hack: 1
                                                                            }
                                                                        })
                                                                    })
                                                                )
                                                            }

                                                            Promise.all(lst_promises)
                                                                .then(responses =>
                                                                    Promise.all(responses.map(res => res.json()))
                                                                )
                                                                .then(responses => {
                                                                    if (responses.every((response) => {
                                                                        return response.success
                                                                    })) {
                                                                        console.log(isGood.indexOf(session.identifiant))
                                                                        session.hack = 1 ? isGood.indexOf(session.identifiant) !== -1 : 0
                                                                        window.localStorage.setItem("sdi_session", JSON.stringify(session))
                                                                        setReloadoHack(!reloadoHack)
                                                                        setShowParticipationHack(false)
                                                                        setHackErreur(false)
                                                                        setPopUpHack(true)
                                                                    } else {
                                                                        setHackErreur(true)
                                                                        console.log("Errur non définie");
                                                                    }
                                                                })
                                                                .catch(err => {
                                                                    setHackErreur(true)
                                                                    console.log(err);
                                                                });
                                                        } else {
                                                            setHackErreur(true)
                                                            console.error(response.erreur);
                                                        }
                                                    })
                                                    .catch(err => {
                                                        setHackErreur(true)
                                                        console.log(err);
                                                    });

                                            }



                                        } else {
                                            setErrors(errors)
                                        }

                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
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
                                    options={[
                                        ["niveau_1", "Niveau 1"],
                                        ["niveau_2", "Niveau 2"],
                                        ["niveau_3", "Niveau 3"]
                                    ]}
                                />
                                <MyTextInput
                                    label="Domaine de prédilection"
                                    name="branche_hack"
                                    type="text"
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
                                            setShowParticipationHack(false)
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
                                            fetch(api_url + "/etudiant/UpdateEtudiant", {
                                                "method": "POST",
                                                "headers": {
                                                    "content-type": "application/json"
                                                },
                                                "body": JSON.stringify({
                                                    getParams: {
                                                        identifiant: session.identifiant,
                                                    },
                                                    setParams: {
                                                        jetic: 1
                                                    }
                                                })
                                            })
                                                .then(response => response.json())
                                                .then(response => {
                                                    if (response.success) {
                                                        session.jetic = 1
                                                        window.localStorage.setItem("sdi_session", JSON.stringify(session))
                                                        setParticipationJetic(false)
                                                        setJeticErreur(false)
                                                        setPopUpJetic(true)
                                                        setReloadjetic(!reloadJetic)
                                                    }
                                                })
                                                .catch(err => {
                                                    setJeticErreur(true)
                                                    console.error(response.erreur);
                                                })
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



            {
                //  Pop-up pour modification JETIC
                showParticipationJetic &&
                <Modal title="Modification JETIC" isOpen={setShowParticipationJetic} toggle={setShowParticipationJetic} transparent darkModal>
                    {
                        <Formik
                            initialValues={{
                                "titre_projet": jeticInfos.titre_projet,
                                "description_projet": jeticInfos.description_projet,
                                "titre_tp": jeticInfos.titre_tp,
                                "description_tp": jeticInfos.description_tp,
                            }}

                            onSubmit={(values) => {
                                console.log(values);

                                fetch(api_url + "/jetic/updateParticipant", {
                                    "method": "POST",
                                    "headers": {
                                        "content-type": "application/json"
                                    },
                                    "body": JSON.stringify({
                                        getParams : {
                                            etudiant : session.identifiant
                                        },
                                        setParams : values
                                    })
                                })
                                    .then(response => response.json())
                                    .then(response => {
                                        if (response.success) {
                                            setShowParticipationJetic(false)
                                            setJeticErreur(false)
                                            setPopUpJetic(true)
                                            setReloadjetic(!reloadJetic)
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
                                            setShowParticipationJetic(false)
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



        </div >
    )
}
