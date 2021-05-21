import React from 'react'
import Image from "next/image"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const HechoConAmor = () => (
    <div className="hecho-con-amor">
        <h2>
            Hecho con
        </h2>
        <div className="hecho-con-amor__icon">
            <FontAwesomeIcon icon={faHeart} />
        </div>
    </div>
)

const TeacherInfo = ({ data }) => {
    const { correo, especializacion, foto, logo, nombre, profesion, } = data

    return (

        <div className="teacher">
            <Row>
                <Col sm={9}>
                    <div className="teacher__info">
                        <h3>{nombre}</h3>
                        <h5>{profesion}</h5>
                        <h5>{especializacion}</h5>
                        <h5>Contacto: <a href={`mailto: ${correo}`} >{correo}</a> </h5>
                        <HechoConAmor />
                    </div>
                </Col>
                <Col sm={3}>
                    <div className="teacher__info__images">
                        <Image loading="eager" priority={true} src={foto.formats.thumbnail.url} alt={foto.alternativeText || "Lizbeth Chaparro"} height="100" width="100" />
                        <Image loading="eager" priority={true} src={logo.formats.small.url} alt={logo.alternativeText || "uptc logo"} height="100" width="220" />
                    </div>
                </Col>
            </Row>
        </div>

    )
}

export default TeacherInfo
