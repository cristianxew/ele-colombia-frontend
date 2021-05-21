import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const MapSection = ({ data }) => {
    return (
        <div className="map-section">
            <Row noGutters={true}>

                <Col md={9} >
                    <div className="map-section__right">
                        <h1 className="title">{data.titulo}</h1>
                        <p>{data.texto}</p>
                    </div>
                </Col>
                <Col md={3} >
                    <img className="map-section__left-img" src={data.imagen.url} alt="colombia map" />
                </Col>
            </Row>
        </div>

    )
}

export default MapSection
