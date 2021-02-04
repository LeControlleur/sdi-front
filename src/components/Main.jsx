import React, {
    useState
}
    from 'react'
import {
    MDBView,
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBAnimation,
    MDBModal,
    MDBModalBody
} from 'mdbreact'
import '../assets/css/backgroundVideo.css'
import videoBack from '../assets/videos/Technology_Background.mp4'
import '../assets/css/home.css'
import $ from 'jquery'



export default function Main() {

    const [studentModal, setStudentModal] = useState(false)
    const [profModal, setProfModal] = useState(false)
    const [schoolModal, setSchoolModal] = useState(false)


    return (
        <MDBView>
            <video id="backgroudVideo" autoPlay loop muted >
                <source src={videoBack} type="video/mp4" />
            </video>

            <div className="ownMask"></div>

            
            <MDBRow>
                <MDBRow style={{ height: "100vh", textAlign: "left" }}>
                    <MDBCol size="12" style={{height: "70%", marginLeft: "10vw"}} className="d-flex align-items-center">
                        <MDBAnimation type="fadeIn" delay="1s">
                            <MDBAnimation type="tada" delay="1.2s">
                                <h1 className="h1-responsive font-weight-bold white-text ml-4">
                                    Bienvenue à la <br />
                                    <b>Semaine De l'Innovation <br/> 2021</b>
                                </h1>
                            </MDBAnimation>
                        </MDBAnimation>
                    </MDBCol>

                    <MDBCol size="12">
                        <MDBRow className="d-flex justify-content-around">
                            <MDBAnimation type="fadeInLeft" delay="1.8s">
                                <MDBBtn outline className="white-text" color="white" onClick={() => setProfModal(true)}>
                                    Entreprise / particulier
                                </MDBBtn>
                            </MDBAnimation>
                            <MDBAnimation type="fadeIn" delay="1.8s">
                                <MDBBtn outline className="white-text" color="white" onClick={() => setSchoolModal(true)}>
                                    Ecole
                                </MDBBtn>
                            </MDBAnimation>
                            <MDBAnimation type="fadeInRight" delay="1.8s">
                                <MDBBtn className="hoverHigh" color="white" outline onClick={() => setStudentModal(true)}>
                                    Etudiant
                                </MDBBtn>
                            </MDBAnimation>
                        </MDBRow>
                    </MDBCol>

                    <MDBCol size="12">
                        <MDBRow className="d-flex justify-content-center">
                            <p
                                size="12"
                                onClick={() => {
                                    var id = "#page"
                                    var offset = 60;
                                    var target = $(id).offset().top - offset;
                                    $('html, body').animate({ scrollTop: target }, 500);
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                ↓↓↓↓↓↓↓
                            </p>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>



                <MDBModal isOpen={profModal} toggle={() => setProfModal(false)} className="topLeftModal">
                    <MDBModalBody className="black-text">
                        <MDBRow className="d-flex justify-content-center">
                            <h3 className="h3-responsive font-weight-bold">Espace Professionnel</h3>
                        </MDBRow>
                        <MDBRow className="mt-2">
                            <p>
                                Que vous soyez une entreprise ou un particulier, vous pouvez vous inscrire pour exposer votre produit, offrir vos services, rencontrer des personnes au Salon de l'Innovation
                            </p>
                        </MDBRow>
                        <MDBRow className="d-flex justify-content-center mt-4">
                            <MDBBtn className="hoverHigh" color="indigo" outline>
                                s'inscrire
                            </MDBBtn>
                            <MDBBtn className="hoverHigh" color="indigo" outline>
                                se connecter
                            </MDBBtn>
                        </MDBRow>
                    </MDBModalBody>
                </MDBModal>

                <MDBModal isOpen={schoolModal} toggle={() => setSchoolModal(false)} className="middleModal">
                    <MDBModalBody className="black-text">
                        <MDBRow className="d-flex justify-content-center">
                            <h3 className="h3-responsive font-weight-bold">Espace Ecoles</h3>
                        </MDBRow>
                        <MDBRow className="mt-2">
                            <p>
                                Nous vous invitons à paticiper à la compétitions inter-école. Résolvez une énigme dans le domaine des TIC et repartez avec des prix.
                            </p>
                        </MDBRow>
                        <MDBRow className="d-flex justify-content-center mt-4">
                            <MDBBtn className="hoverHigh" color="indigo" outline>
                                s'inscrire
                            </MDBBtn>
                            <MDBBtn className="hoverHigh" color="indigo" outline>
                                se connecter
                            </MDBBtn>
                        </MDBRow>
                    </MDBModalBody>
                </MDBModal>

                <MDBModal isOpen={studentModal} toggle={() => setStudentModal(false)} className="topRightModal">
                    <MDBModalBody className="black-text" style={{ marginBottom: "20vh" }}>
                        <MDBRow className="d-flex justify-content-center">
                            <h3 className="h3-responsive font-weight-bold">Espace Etudiants</h3>
                        </MDBRow>
                        <MDBRow className="mt-2 list-group-flush">
                            <p>
                                Vous avez la possibilité de participer à la 5ème édition du Technovore-Hackathon ou de présenter vos projets à la Journée de l'Etudiant en TIC. <br />
                                N'hésitez donc pas à vous inscrire.
                            </p>
                            <p>
                                Vous avez la possibilité de participer à la 5ème édition du Technovore-Hackathon ou de présenter vos projets à la Journée de l'Etudiant en TIC. <br />
                                N'hésitez donc pas à vous inscrire.
                            </p><p>
                                Vous avez la possibilité de participer à la 5ème édition du Technovore-Hackathon ou de présenter vos projets à la Journée de l'Etudiant en TIC. <br />
                                N'hésitez donc pas à vous inscrire.
                            </p><p>
                                Vous avez la possibilité de participer à la 5ème édition du Technovore-Hackathon ou de présenter vos projets à la Journée de l'Etudiant en TIC. <br />
                                N'hésitez donc pas à vous inscrire.
                            </p><p>
                                Vous avez la possibilité de participer à la 5ème édition du Technovore-Hackathon ou de présenter vos projets à la Journée de l'Etudiant en TIC. <br />
                                N'hésitez donc pas à vous inscrire.
                            </p>
                        </MDBRow>
                        <MDBRow className="d-flex justify-content-center mt-4">
                            <MDBBtn className="hoverHigh" color="indigo" outline>
                                s'inscrire
                            </MDBBtn>
                            <MDBBtn className="hoverHigh" color="indigo" outline>
                                se connecter
                            </MDBBtn>
                        </MDBRow>
                    </MDBModalBody>
                </MDBModal>


                <MDBRow id="page">
                    <p>
                        La vie est beau
                    </p>
                </MDBRow>

            </MDBRow>


        </MDBView>
    )
}

