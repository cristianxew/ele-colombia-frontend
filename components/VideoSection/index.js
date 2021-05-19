import React from 'react'
import Video from '../Video'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Link from "next/link"
// import styles from "../../styles/VideoSection.module.scss"


const VideoSection = ({ video, user }) => {

    return (

        <div className="video">
            <Row>
                <Col md={7}>
                    <Video src={video.url} previewUrl="/refranes-colombianos.jpeg" />
                </Col>
                <Col md={5}>
                    <div className="video__desc">
                        <h1 className="title">Introducción</h1>
                        <p >
                            En el presente material didáctico encontraran 10 refranes
                            colombianos con los cuales se abordan las cuadro habilidades del
                            lenguaje. A saberse: Escuchar, hablar, leer y escribir.
                        </p>
                        {!user && (
                            <Link href="/account/login">
                                <a className="my-btn">
                                    Ingresar
                             </a>
                            </Link>
                        )}
                    </div>
                </Col>
            </Row>
        </div>

    )
}

export default VideoSection
