import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import colombiaMap from "/colombia-map.jpeg"
// import hechoConAmor from "../../assets/hecho-con-amor.jpeg"
// import styles from "../../styles/MapSection.module.scss"

const MapSection = () => {
    return (
        <div className="map-section">
            <Row noGutters={true}>

                <Col md={9} >
                    <div className="map-section__right">
                        <h1 style={{ width: "100%", marginBottom: "2rem" }} className="title">Bienvenidos a Ele Colombia</h1>
                        <p> Ele Colombia es un proyecto que busca desarrollar la
                        competencia
                        comunicativa sociolingüística, la cual hace referencia a la
                        capacidad de una persona para producir y entender
                        adecuadamente expresiones lingüísticas en diferentes contexto
                        de uso.</p>
                    </div>
                </Col>
                <Col md={3} >
                    <img className="map-section__left-img" src="/colombia-map.jpeg" alt="colombia map" />
                </Col>
            </Row>
        </div>

    )
}

export default MapSection
