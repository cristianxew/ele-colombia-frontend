import React from 'react'
import Video from '../Video'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Link from "next/link"

const VideoSection = ({ data, user }) => {
    const { texto, titulo, video, previstaVideo } = data

    return (

        <div className="video">
            <Row>
                <Col md={7}>
                    <Video src={video.url} previewUrl={previstaVideo.url} />
                </Col>
                <Col md={5}>
                    <div className="video__desc">
                        <h1 className="title">{titulo}</h1>
                        <p >
                            {texto}
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
