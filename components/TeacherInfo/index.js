import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
// import zulanllyImage from "/zulanlly.jpeg"
// import styles from "../../styles/TeacherInfo.module.scss"

const HechoConAmor = () => (
    <div className="hecho-con-amor">
        <h2>
            Hecho con
        </h2>
        <FontAwesomeIcon icon={faHeart} />
    </div>
)

const TeacherInfo = () => {
    return (

        <div className="teacher">
            <Row>
                <Col sm={9}>
                    <div className="teacher__info">
                        <h3>Lizbeth Zulanlly Chaparro Camargo</h3>
                        <h5>Teóloga y Licencia en Educación  Básica</h5>
                        <h5>Estudiante de Especialización en pedagogía de la lengua castellana y literatura.</h5>
                        <h5>Contacto: <a href="mailto: lizbeth.chaparro@uptc.edu.co" >lizbeth.chaparro@uptc.edu.co</a> </h5>
                        <HechoConAmor />
                    </div>
                </Col>
                <Col sm={3}>
                    <img src="/zulanlly.jpeg" alt="Lizbeth Chaparro" />
                </Col>
            </Row>
        </div>

    )
}

export default TeacherInfo
