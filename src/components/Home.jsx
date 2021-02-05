import React, {
    useState,
    useEffect,
    createRef
} from 'react'
import videoBack from '../assets/videos/Technology_Background.mp4'
import '../assets/css/backgroundVideo.css'
import '../assets/css/home.css'
import Modal from './utils/Modal'

import { api_url } from '../constants';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faWindowClose } from '@fortawesome/free-solid-svg-icons'

import { Formik, Form } from 'formik';
import { MyTextInput, InputButtonDark, InputButtonLight } from './Form';


import * as Yup from 'yup';
import { phoneRegExp } from '../constants'

import backPage from '../assets/imgs/backPage.jpg';
import coding from '../assets/imgs/coding.jpg'
import bToB from '../assets/imgs/bToB.png'
import ict_students from '../assets/imgs/ict_students.jpg'
import img5 from '../assets/imgs/img5.jpg'



import Rotate from 'react-reveal/Rotate'
import Zoom from 'react-reveal/Zoom'
import Fade from 'react-reveal/Fade'



const calculateTimeLeft = () => {
    const difference = +new Date(2021, 1, 25) - +new Date()

    let timeLeft = {}

    if (difference > 0) {
        timeLeft = {
            "jour(s)": Math.floor(difference / (1000 * 60 * 60 * 24)),
            "heure(s)": Math.floor((difference / (1000 * 60 * 60)) % 24),
            "minute(s)": Math.floor((difference / 1000 / 60) % 60),
            "seconde(s)": Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;
}




export default function Home({ session, setSession }) {

    const [modalProf, setModalProf] = useState(false)
    const [modalStudent, setModalStudent] = useState(false)
    const [modalSchool, setModalSchool] = useState(false)
    const [erreur, setErreur] = useState({})
    const [success, setSuccess] = useState({})

    const [popUpDeconnexion, setPopUpDeconnexion] = useState(false)

    const [connexion, setConnexion] = useState(true)

    let initialTime = calculateTimeLeft()
    const [timeLeft, setTimeLeft] = useState(initialTime);

    let scrollPageRef = createRef()

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000)
        return () => clearTimeout(timer)
    });

    const timerComponents = [];
    Object.keys(timeLeft).forEach((interval, ind) => {
        timerComponents.push(
            <div key={timerComponents.length} className="flex flex-col text-white mx-3 my-2">
                <p className="font-bold text-8xl text-center">
                    {(String(timeLeft[interval]).length > 1) ? timeLeft[interval] : "0" + timeLeft[interval]}
                </p>
                <p className="text-2xl text-center">
                    {interval}
                </p>
            </div>
        );
    });


    return (
        <div>
            <video id="backgroudVideo" autoPlay loop muted >
                <source src={videoBack} type="video/mp4" />
            </video>

            <div className="ownMask"></div>

            <div className="grid grid-cols-3 gap-4 h-screen">
                <div className="col-span-3 row-span-5 flex items-center">
                    <h1 className="font-mono text-4xl font-semibold text-white ml-5 sm:ml-20 ">
                        Bienvenue à la <br />Semaine De l'Innovation <br />2021
                    </h1>
                </div>
                <div className="col-span-3 row-span-2 gap-x-4 flex items-center justify-evenly flex-col sm:flex-row">
                    <button className="bg-transparent hover:bg-white text-white font-semibold hover:text-blue-800 py-2 px-4 border border-white hover:border-transparent rounded"
                        onClick={() => {
                            if (session && session.email && session.email !== "" && session.profil === "prof") {
                                window.location.pathname = "/espace_professionnel"
                            } else if (session && session.email && session.email !== "" && session.profil === "etudiant") {
                                setPopUpDeconnexion(true)
                            } else {
                                setModalProf(true)
                            }
                        }}>
                        Professionnel
                    </button>
                    <button className="bg-transparent hover:bg-white text-white font-semibold hover:text-blue-800 py-2 px-4 border border-white hover:border-transparent rounded"
                        onClick={() => {
                            if (session && session.email && session.email !== "" && session.profil === "etudiant") {
                                window.location.pathname = "/espace_etudiant"
                            } else if (session && session.email && session.email !== "" && session.profil === "prof") {
                                setPopUpDeconnexion(true)
                            } else {
                                setModalStudent(true)
                            }
                        }}>
                        Etudiant
                    </button>
                </div>
                <div className="col-span-3 row-span-1 flex justify-center">

                    <div style={{ cursor: "pointer" }} onClick={() => {
                        scrollPageRef.current.scrollIntoView({ behavior: 'smooth' })
                    }}>
                        <FontAwesomeIcon icon={faAngleDown} className="mx-4" color="white" size="3x" />
                        <FontAwesomeIcon icon={faAngleDown} className="mx-4" color="white" size="3x" />
                        <FontAwesomeIcon icon={faAngleDown} className="mx-4" color="white" size="3x" />
                        <FontAwesomeIcon icon={faAngleDown} className="mx-4" color="white" size="3x" />
                    </div>

                </div>
            </div>

            <div className="grid" id="page" ref={scrollPageRef} style={{ backgroundImage: `url(${img5})`, backgroundBlendMode: "multiply", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed" }}>
                <div className="w-full bg-no-repeat" style={{ backgroundImage: `url(${backPage})`, backgroundBlendMode: "multiply", backgroundPosition: "center center", backgroundAttachment: "fixed" }}>
                    <div className="p-10 py-20 flex flex-col md:flex-row flex-wrap justify-evenly content-center text-white ">

                        {
                            timerComponents.length
                                ?
                                timerComponents
                                :
                                <p className="font-bold text-6xl text-center">Place à la Semaine De l'Innovation !</p>
                        }

                    </div>
                </div>


                <div className="bg-red-600 shadow-lg h-14 flex flex-row justify-between items-center">
                    <marquee className="text-3xl bold">
                        TOUS LES ETUDIANTS AYANT FAIT LEUR INSCRIPTION AVANT LE VENDREDI 05/02/2021 A 18H SONT PRIÉS DE LA RECOMMENCER. VEUILLEZ NOUS EXCUSER POUR LES DÉSAGRÉMENTS CAUSÉS.
                    </marquee>
                </div>

                <div className="grid gap-4 w-full py-16">

                    <Fade>
                        <h3 className="font-bold text-5xl text-blue-900 text-center mt-6 mb-12">la Semaine De l'Innovation</h3>
                    </Fade>

                    <Zoom>
                        <p className="mx-10 md:mx-24 lg:mx-48 text-xl text-center">
                            La <span className="text-blue-900 text-2xl font-bold">S</span>emaine <span className="text-blue-900 text-2xl font-bold">D</span>e l'<span className="text-blue-900 text-2xl font-bold">I</span>nnovation (<span className="text-blue-900 text-2xl font-bold">SDI</span>) est une semaine réservée à la valorisation des innovations ivoiriennes et internaltionales dans les Technologies de l'Information et de la Communication.
                        </p>
                    </Zoom>

                    <div className="grid grid-cols-2 gap-y-12 mt-12">
                        <div className="col-span-2 gap-x-12 flex flex-col md:flex-row justify-center items-center">
                            <Rotate top left>
                                <div className="text-white bg-indigo-700 w-80 h-80 text-lg text-center flex items-center px-4 py-4 rounded-tl-full rounded-tr-full rounded-bl-full">
                                    <p>
                                        <span className="font-bold text-2xl">Objectif 1</span><br />Concentrer les regards de la ville d'Abidjan voir de toute la Côte d'ivoire sur les TIC ainsi que sur l'ESATIC ses talentueux étudiants pendant une semaine
                                    </p>
                                </div>
                            </Rotate>
                            <Rotate top right>
                                <div className="text-white bg-blue-600 w-80 h-80 text-lg text-center flex items-center px-4 py-4 rounded-tl-full rounded-tr-full rounded-br-full mt-12 md:mt-0">
                                    <p>
                                        <span className="font-bold text-2xl">Objectif 2</span><br /> Atteindre 1000 tapage participants (étudiants, lycéens, collégiens, professionnels du domaine des TIC, personnalités)
                                    </p>
                                </div>
                            </Rotate>
                        </div>
                        <div className="col-span-2 gap-x-12 flex flex-col md:flex-row justify-center items-center">
                            <Rotate bottom left>
                                <div className="text-white bg-blue-900 w-80 h-80 text-lg text-center flex items-center px-4 py-4 rounded-tl-full rounded-br-full rounded-bl-full">
                                    <p>
                                        <span className="font-bold text-2xl">Objectif 3</span><br />Promouvoir l'utilisation des TIC à bon escient en Côte d'Ivoire
                                    </p>
                                </div>
                            </Rotate>
                            <Rotate bottom right>
                                <div className="text-white bg-gray-900 w-80 h-80 text-lg text-center flex items-center px-4 py-4 rounded-br-full rounded-tr-full rounded-bl-full mt-12 md:mt-0">
                                    <p>
                                        <span className="font-bold text-2xl">Objectif 4</span><br />Montrer les talents dont dispose la Cote d'Ivoire au niveau des TIC
                                    </p>
                                </div>
                            </Rotate>
                        </div>
                    </div>
                </div>


                <div className="grid gap-4 w-full py-16" style={{ backgroundImage: `url(${backPage})`, backgroundBlendMode: "multiply", backgroundPosition: "center center", backgroundAttachment: "fixed" }}>

                    <Fade>
                        <h3 className="font-bold text-5xl text-white text-center mt-6 mb-12">Trois activités majeures</h3>
                    </Fade>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 mt-12">

                        <Fade left>
                            <div className="flex flex-col text-white text-xl flex rounded-lg mx-4 shadow-xl-white" style={{ backgroundImage: `url(${coding})`, backgroundPosition: "center center", }}>
                                <div className="px-5 py-5 h-full rounded-lg" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
                                    <h3 className="font-bold text-2xl mb-7">
                                        Technovore-Hackathon
                                    </h3>
                                    <p>
                                        Ce sont 72 heures intenses de « coding », au cours desquelles plusieurs équipes de trois (3) personnes ou moins oeuvrent à trouver des solutions innovantes à plusieurs problèmes.
                                    </p>
                                </div>
                            </div>
                        </Fade>
                        <Fade bottom>
                            <div className="flex flex-col text-white text-xl flex rounded-lg mx-4 shadow-xl-white" style={{ backgroundImage: `url(${bToB})`, backgroundPosition: "center center" }}>
                                <div className="px-5 py-5 h-full rounded-lg" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
                                    <h3 className="font-bold text-2xl mb-7">
                                        Salon de l'innovation
                                    </h3>
                                    <p>
                                        Le Salon de l'Innovation (SI) est un cadre dédié aux entreprises, particuliers et étudiants pour présenter des projets ou produits innovants en rapport avec les TIC. Les participants pourront donc avoir des échanges B to B avec les visiteurs.
                                    </p>
                                </div>
                            </div>
                        </Fade>
                        <Fade right>
                            <div className="flex flex-col text-white text-xl flex rounded-lg mx-4 shadow-xl-white" style={{ backgroundImage: `url(${ict_students})`, backgroundPosition: "center center" }}>
                                <div className="px-5 py-5 h-full rounded-lg" style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
                                    <h3 className="font-bold text-2xl mb-7">
                                        JETIC
                                    </h3>
                                    <p>
                                        La Journée de l'Etudiant en Technologie de l'Information et de la Communication (JETIC) est une journée portes-ouvertes initiée par le C2E en 2017 et visant à promouvoir des métiers liés aux TIC.
                                    </p>
                                </div>
                            </div>
                        </Fade>
                    </div>


                </div>






                

                <div className="grid gap-4 w-full py-16">

                    <Fade>
                        <h3 className="font-bold text-5xl text-blue-900 text-center mt-6 mb-12">Gadgets</h3>
                    </Fade>

                    <div className="grid grid-cols-1 gap-y-6">
                        <p className="font-semibold text-center text-blue-900">
                            Nos gadgets seront disponible très prochainement
                        </p>
                    </div>


                </div>







            </div>



















            {
                //  Pop-up pour confirmation de présence
                popUpDeconnexion &&
                <Modal isOpen={popUpDeconnexion} toggle={setPopUpDeconnexion} transparent small darkModal>
                    <p className="flex items-center my-4">
                        <FontAwesomeIcon icon={faWindowClose} size="4x" className="mr-6" color="green" />
                        <h3 className="text-2xl font-semibold">
                            Veuillez vous deconnecter d'abord
                        </h3>
                    </p>
                </Modal>
            }




            {
                //  Pop-up pour professionnels
                modalProf &&
                <Modal title="Espace Professionnel" isOpen={modalProf} toggle={setModalProf} transparent darkModal>
                    {
                        connexion
                            ?
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: '',
                                }}

                                validationSchema={Yup.object({
                                    email: Yup.string()
                                        .email('Adresse électronique invalide')
                                        .required('Ce champ est requis'),
                                    password: Yup.string()
                                        .required('Ce champ est requis')
                                })}

                                onSubmit={(values, { setSubmitting }) => {
                                    console.log(values);
                                    console.log(setSubmitting);

                                    fetch(api_url + "/prof/getProfessionnelsByEmail", {
                                        "method": "POST",
                                        "headers": {
                                            "content-type": "application/json"
                                        },
                                        "body": JSON.stringify(values)
                                    })
                                        .then(response => response.json())
                                        .then(response => {

                                            if (response.success) {
                                                response.data._doc["profil"] = "professionnel"
                                                setSession(response.data._doc)
                                                window.location.pathname = "espace_professionnel"
                                            } else {
                                                let new_erreur = erreur
                                                new_erreur["connexion"] = true
                                                setErreur(new_erreur)
                                            }
                                        })
                                        .catch(err => {
                                            let new_erreur = erreur
                                            new_erreur["connexion"] = true
                                            setErreur(new_erreur)
                                        });
                                }}
                            >
                                <Form>

                                    {
                                        success.prof &&
                                        <div className="my-4 text-center text-green-600">
                                            L'enregistrement a été un success
                                        </div>
                                    }

                                    {
                                        erreur.connexion &&
                                        <div className="my-4 text-center text-red-600">
                                            Les identifiants sont incorrects
                                        </div>
                                    }

                                    <MyTextInput
                                        label="Adresse mail"
                                        name="email"
                                        type="email"
                                        placeholder="conseilestudiantinesatic@gmail.com"
                                    />

                                    <MyTextInput
                                        label="Mot de passe"
                                        name="password"
                                        type="password"
                                    />

                                    {
                                        /*
                                    <p className="text-center text-xs text-blue-900 cursor-pointer italic">
                                        Mot de passe oublié ?
                                    </p>
                                        */
                                    }

                                    <div className="flex justify-between pt-2">
                                        <InputButtonLight onClick={() => {
                                            setConnexion(false)
                                        }} name="cas" type="submit" value="S'inscrire" />
                                        <InputButtonDark type="submit" value="Se connecter" />
                                    </div>
                                </Form>
                            </Formik>
                            :
                            <Formik

                                initialValues={{
                                    "raison_sociale": "",
                                    "interlocuteur": "",
                                    "localisation": "",
                                    "contact": "",
                                    "email": "",
                                    "password": "",
                                    "cpassword": ""
                                }}

                                validationSchema={Yup.object({
                                    raison_sociale: Yup.string(),
                                    interlocuteur: Yup.string()
                                        .required('Ce champ est requis'),
                                    localisation: Yup.string()
                                        .required('Ce champ est requis'),
                                    contact: Yup.string()
                                        .required('Ce champ est requis')
                                        .matches(phoneRegExp, 'Le numéro de téléphone est invalide'),
                                    email: Yup.string()
                                        .email('Adresse électronique invalide')
                                        .required('Ce champ est requis'),
                                    password: Yup.string()
                                        .required('Ce champ est requis'),
                                    cpassword: Yup.string()
                                        .oneOf([Yup.ref('password'), null], "Veuillez entrer le même mot de passe")

                                })}

                                onSubmit={(values, { setSubmitting }) => {
                                    console.log("Soumission");
                                    console.log(values);

                                    fetch(api_url + "/prof/insertProfessionnels", {
                                        "method": "POST",
                                        "headers": {
                                            "content-type": "application/json"
                                        },
                                        "body": JSON.stringify(values)
                                    })
                                        .then(response => response.json())
                                        .then(response => {

                                            console.log("Réponse");
                                            console.log(response);

                                            if (response.success) {
                                                let new_success = success
                                                new_success["prof"] = true
                                                setSuccess(new_success)
                                                setConnexion(true)

                                                let new_erreur = erreur
                                                new_erreur["prof"] = false
                                                setErreur(new_erreur)

                                            } else {
                                                let new_erreur = erreur
                                                new_erreur["prof"] = true
                                                setErreur(new_erreur)
                                            }
                                        })
                                        .catch(err => {
                                            let new_erreur = erreur
                                            new_erreur["prof"] = true
                                            setErreur(new_erreur)
                                        });

                                }}
                            >
                                <Form>

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
                                        label="Localisation"
                                        name="localisation"
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
                                        placeholder="conseilestudiantinesatic@gmail.com"
                                    />
                                    <MyTextInput
                                        label="Mot de passe"
                                        name="password"
                                        type="password"
                                    />
                                    <MyTextInput
                                        label="Confirmation du mot de passe"
                                        name="cpassword"
                                        type="password"
                                    />

                                    {
                                        erreur["prof"] &&
                                        <div className="text-red-500 text-center">
                                            Une erreur s'est produite pendant l'enregistrement
                                        </div>
                                    }

                                    <div className="flex justify-between pt-2">
                                        <InputButtonLight onClick={() => {
                                            setConnexion(true)
                                        }} name="cas" type="submit" value="Se connecter" />
                                        <InputButtonDark type="submit" value="S'inscrire" />
                                    </div>
                                </Form>
                            </Formik>
                    }
                </Modal>
            }




            {
                //  Pop-up pour étudiants
                modalStudent &&
                <Modal title="Espace Etudiants" isOpen={modalStudent} toggle={setModalStudent} transparent darkModal>
                    {
                        connexion
                            ?
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: '',
                                }}

                                validationSchema={Yup.object({
                                    email: Yup.string()
                                        .required('Ce champ est requis'),
                                    password: Yup.string()
                                        .required('Ce champ est requis')
                                })}

                                onSubmit={(values, { setSubmitting }) => {
                                    console.log(values);
                                    console.log(setSubmitting);

                                    fetch(api_url + "/etudiant/getEtudiantByEmail", {
                                        "method": "POST",
                                        "headers": {
                                            "content-type": "application/json"
                                        },
                                        "body": JSON.stringify(values)
                                    })
                                        .then(response => response.json())
                                        .then(response => {

                                            if (response.success && response.data) {
                                                response.data._doc["profil"] = "etudiant"
                                                setSession(response.data._doc)
                                                window.location.pathname = "espace_etudiant"
                                            } else {
                                                let new_erreur = erreur
                                                new_erreur["connexion"] = true
                                                setErreur(new_erreur)
                                            }
                                        })
                                        .catch(err => {
                                            let new_erreur = erreur
                                            new_erreur["connexion"] = true
                                            setErreur(new_erreur)
                                        });
                                }}
                            >
                                <Form>

                                    {
                                        success.etudiant &&
                                        <div className="my-4 text-center text-green-600">
                                            L'enregistrement a été un success
                                        </div>
                                    }

                                    {
                                        erreur.connexion &&
                                        <div className="my-4 text-center text-red-600">
                                            Les identifiants sont incorrects
                                        </div>
                                    }

                                    <MyTextInput
                                        label="E-mail"
                                        name="email"
                                        type="email"
                                        placeholder="conseilestudiantinesatic@gmail.com"
                                    />
                                    <MyTextInput
                                        label="Mot de passe"
                                        name="password"
                                        type="password"
                                    />

                                    <p className="text-center text-xs text-blue-900 cursor-pointer italic">
                                        Mot de passe oublié ?
                                    </p>

                                    <div className="flex justify-between pt-2">
                                        <InputButtonLight onClick={() => {
                                            setConnexion(false)
                                        }} type="submit" value="S'inscrire" />
                                        <InputButtonDark type="submit" value="Se connecter" />
                                    </div>
                                </Form>
                            </Formik>
                            :
                            <Formik

                                initialValues={{
                                    "nom": "",
                                    "prenoms": "",
                                    "email": "",
                                    "matricule": "",
                                    "classe": "",
                                    "contact": "",
                                    "password": "",
                                    "cpassword": ""
                                }}

                                validationSchema={Yup.object({
                                    nom: Yup.string()
                                        .required("Ce champ est requis"),
                                    prenoms: Yup.string()
                                        .required("Ce champ est requis"),
                                    email: Yup.string()
                                        .email('Adresse électronique invalide')
                                        .required('Ce champ est requis'),
                                    matricule: Yup.string()
                                        .required("Ce champ est requis"),
                                    classe: Yup.string()
                                        .required("Ce champ est requis"),
                                    contact: Yup.string()
                                        .required("Ce champ est requis")
                                        .matches(phoneRegExp, 'Le numéro de téléphone est invalide'),
                                    password: Yup.string()
                                        .required("Ce champ est requis"),
                                    cpassword: Yup.string()
                                        .oneOf([Yup.ref('password'), null], "Veuillez entrer le même mot de passe")

                                })}

                                onSubmit={(values, { setSubmitting }) => {
                                    console.log("Soumission");
                                    console.log(values);

                                    fetch(api_url + "/etudiant/insertEtudiant", {
                                        "method": "POST",
                                        "headers": {
                                            "content-type": "application/json"
                                        },
                                        "body": JSON.stringify(values)
                                    })
                                        .then(response => response.json())
                                        .then(response => {

                                            console.log("Réponse");
                                            console.log(response);

                                            if (response.success) {
                                                let new_success = success
                                                new_success["etudiant"] = true
                                                setSuccess(new_success)
                                                setConnexion(true)

                                                let new_erreur = erreur
                                                new_erreur["etudiant"] = false
                                                setErreur(new_erreur)

                                            } else {
                                                let new_erreur = erreur
                                                new_erreur["etudiant"] = true
                                                setErreur(new_erreur)
                                            }
                                        })
                                        .catch(err => {
                                            let new_erreur = erreur
                                            new_erreur["etudiant"] = true
                                            setErreur(new_erreur)
                                        });

                                }}
                            >
                                <Form>
                                    <MyTextInput
                                        label="Nom"
                                        name="nom"
                                        type="text"
                                    />
                                    <MyTextInput
                                        label="Prénoms"
                                        name="prenoms"
                                        type="text"
                                    />
                                    <MyTextInput
                                        label="E-mail"
                                        name="email"
                                        type="email"
                                    />
                                    <MyTextInput
                                        label="Matricule"
                                        name="matricule"
                                        type="text"
                                    />
                                    <MyTextInput
                                        label="Classe"
                                        name="classe"
                                        type="text"
                                    />
                                    <MyTextInput
                                        label="Contact"
                                        name="contact"
                                        type="tel"
                                    />
                                    <MyTextInput
                                        label="Mot de passe"
                                        name="password"
                                        type="password"
                                    />
                                    <MyTextInput
                                        label="Confirmation du mot de passe"
                                        name="cpassword"
                                        type="password"
                                    />

                                    {
                                        erreur["etudiant"] &&
                                        <div className="text-red-500 text-center">
                                            Une erreur s'est produite pendant l'enregistrement
                                        </div>
                                    }
                                    <div className="flex justify-between pt-2">
                                        <InputButtonLight onClick={() => {
                                            setConnexion(true)
                                        }} name="cas" type="submit" value="Se connecter" />
                                        <InputButtonDark type="submit" value="S'inscrire" />
                                    </div>
                                </Form>
                            </Formik>
                    }
                </Modal>
            }



            {
                //  Pop-up pour élèves
                modalSchool &&
                <Modal title="Espace Ecole" isOpen={modalSchool} toggle={setModalSchool} transparent darkModal>
                    {
                        connexion
                            ?
                            <Formik
                                initialValues={{
                                    identifiant: '',
                                    password: '',
                                }}

                                validationSchema={Yup.object({
                                    identifiant: Yup.string()
                                        .required('Ce champ est requis'),
                                    password: Yup.string()
                                        .required('Ce champ est requis')
                                })}

                                onSubmit={(values, { setSubmitting }) => {
                                    console.log(values);
                                    console.log(setSubmitting);
                                    //  setSubmitting(false);
                                    //  setModalProf(false)
                                }}
                            >
                                <Form>
                                    <MyTextInput
                                        label="Identifiant"
                                        name="identifiant"
                                        type="text"
                                    />

                                    <MyTextInput
                                        label="Mot de passe"
                                        name="password"
                                        type="password"
                                    />

                                    <p className="text-center text-xs text-blue-900 cursor-pointer italic">
                                        Mot de passe oublié ?
                                    </p>

                                    <div className="flex justify-between pt-2">
                                        <InputButtonLight onClick={() => {
                                            setConnexion(false)
                                        }} name="cas" type="submit" value="S'inscrire" />
                                        <InputButtonDark type="submit" value="Se connecter" />
                                    </div>
                                </Form>
                            </Formik>
                            :
                            <Formik

                                validationSchema={Yup.object({
                                    interlocuteur: Yup.string()
                                        .required('Ce champ est requis'),
                                    contact: Yup.string()
                                        .required('Ce champ est requis')
                                        .matches(phoneRegExp, 'Le numéro de téléphone est invalide'),
                                    email: Yup.string()
                                        .email('Adresse électronique invalide')
                                        .required('Ce champ est requis'),
                                    password: Yup.string()
                                        .required('Ce champ est requis'),
                                    cpassword: Yup.string()
                                        .oneOf([Yup.ref('password'), null], "Veuillez entrer le même mot de passe")

                                })}

                                onSubmit={(values, { setSubmitting }) => {
                                    console.log(values);
                                    //  setSubmitting(false);
                                    //  setModalProf(false)
                                }}
                            >
                                <Form>
                                    <MyTextInput
                                        label="Etablissement"
                                        name="etablissement"
                                        type="text"
                                        placeholder="Lycée garçons de Bingerville"
                                    />
                                    <MyTextInput
                                        label="Interlocuteur"
                                        name="interlocuteur"
                                        type="text"
                                        placeholder="Bini Samuel"
                                    />
                                    <MyTextInput
                                        label="Contact"
                                        name="contact"
                                        type="tel"
                                        placeholder="89990640"
                                    />
                                    <MyTextInput
                                        label="Adresse mail"
                                        name="email"
                                        type="email"
                                        placeholder="conseilestudiantinesatic@gmail.com"
                                    />
                                    <MyTextInput
                                        label="Mot de passe"
                                        name="password"
                                        type="password"
                                    />
                                    <MyTextInput
                                        label="Confirmation du mot de passe"
                                        name="cpassword"
                                        type="password"
                                    />

                                    <div className="flex justify-between pt-2">
                                        <InputButtonLight onClick={() => {
                                            setConnexion(true)
                                        }} name="cas" type="submit" value="Se connecter" />
                                        <InputButtonDark type="submit" value="S'inscrire" />
                                    </div>
                                </Form>
                            </Formik>
                    }
                </Modal>
            }


        </div >
    )
}
