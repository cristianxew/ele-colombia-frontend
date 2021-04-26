import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import zulanllyImage from "/zulanlly.jpeg"
// import styles from "../../styles/TeacherInfo.module.scss"

const TeacherInfo = () => {
    return (

        <div className="teacher">
            <Row>
                <Col sm={4}>
                    <img src="/zulanlly.jpeg" alt="Lizbeth Chaparro" />
                </Col>
                <Col sm={8}>
                    <div className="teacher__info">
                        <h2>Lizbeth Zulanlly Chaparro Camargo</h2>
                        <h4>Teóloga y Licencia en Educación  Básica</h4>
                        <h4>Estudiante de Especialización en pedagogía de la lengua castellana y literatura.</h4>
                        <h4>Contacto: <a href="mailto: lizbeth.chaparro@uptc.edu.co" >lizbeth.chaparro@uptc.edu.co</a> </h4>
                    </div>
                </Col>
            </Row>
        </div>

    )
}

export default TeacherInfo
