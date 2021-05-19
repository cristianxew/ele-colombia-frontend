import React, { useState, useEffect } from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import { parseCookies } from "../../helpers/index";
import { EditText } from 'react-edit-text';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { URL_API } from "../../config/index";
import MySlider from "../../components/Slider"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Leer = ({ token }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [comentario, setComentario] = useState("")
    const [key, setKey] = useState(1)

    const [refranes, setRefranes] = useState([
        {
            significado: "Una persona inteligente no necesita una explicación demasiado detallada para entender lo que se le está diciendo.",
            refran: "A buen entendedor pocas palabras.",
            respuesta: null
        },
        {
            significado: "Alguien anda en una mala racha, le sucedió algo peor de lo que ya le había sucedido.",
            refran: "Al caído, caerle.",
            respuesta: null
        },
        {
            significado: "Cuando las cosas van mal o se complican , lo más conveniente es enfrentarlas con la mejor actitud",
            refran: "Al mal tiempo, buena cara.",
            respuesta: null
        },
        {
            significado: "Hasta los más experimentados pueden equivocarse",
            refran: "Hasta al mejor panadero se le quema el pan en la puerta del horno.",
            respuesta: null
        },
        {
            significado: "Cada uno recibe su merecido.",
            refran: "A cada marrano le llega su nochebuena.",
            respuesta: null
        },
        {
            significado: "Una vez saciado el apetito, uno se siente satisfecho y feliz.",
            refran: "Barriga llena, corazón contento.",
            respuesta: null
        },
        {
            significado: "Se utiliza cuando en una conversación se está mencionando  a una persona ausente y justo en ese momento hace acto de presencia.",
            refran: "Hablando del rey de Roma y ahí asoma.",
            respuesta: null
        },
        {
            significado: "Existen diferentes maneras de hacer las cosas.",
            refran: "Cada uno mata las pulgas a su manera.",
            respuesta: null
        },
        {
            significado: "Dos o más personas pueden encontrar la solución a una problemática de forma más sencilla y rápida.",
            refran: "Dos cabezas piensan mejor que una.",
            respuesta: null
        },
        {
            significado: "Alude al círculo en que las personas se encuentran inmersas y cómo esto influye en ellos en su manera de pensar y actuar.",
            refran: "Al que anda entre la miel, algo se le pega.",
            respuesta: null
        },
    ])
    const [respuestas, setRespuestas] = useState([])

    const validateAnswers = () => {
        let newState = [...refranes]
        for (let i = 0; i < refranes.length; i++) {
            if (respuestas[i] === undefined) {
                newState[i].respuesta = null
                setRefranes(newState)
            } else if (refranes[i].refran.toLowerCase() === respuestas[i].toLowerCase()) {
                newState[i].respuesta = true
                setRefranes(newState)
            } else {
                newState[i].respuesta = false
                setRefranes(newState)
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!image) {
            toast.info("Selecciona una imagen")
            return
        }
        setIsLoading(true)
        const formData = new FormData()
        const dataToSend = {}
        formData.append('ref', 'leer-tareas')
        formData.append('field', 'evidencia')
        formData.append('comentario', comentario)
        formData.forEach(function (value, key) {
            dataToSend[key] = value;
        });

        const resTarea = await fetch(`${URL_API}/leer-tareas`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dataToSend),
        })

        if (!resTarea.ok) {
            console.log(resTarea)
            if (resTarea.status === 403 || resTarea.status === 401) {
                toast.error('No tienes permiso para hacer esto')
                return
            }
            toast.error('Algo Salio mal, intenta de nuevo')
            setIsLoading(false)
        } else {
            const imageRef = await resTarea.json();

            formData.append('files', image)
            formData.append('refId', imageRef.id)

            const res = await fetch(`${URL_API}/upload`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })

            if (res.ok) {
                setIsLoading(false)
                setKey(key + 1)  // clear input file
                setComentario("")
                setImage(null)
                toast.success(`Gracias ${imageRef.user.username}, se ha enviado tu evidencia exitosamente`)
            } else {
                setIsLoading(false)
                toast.error("Algo no salio bien, intenta de nuevo")
            }
        }

    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0])
    }

    return (
        <Layout >
            <ToastContainer position="top-center" />
            <div className="pagina-leer">
                <div className="pagina-leer__top">
                    <Row noGutters >
                        <Col md={9}>
                            <div className="pagina-leer__top__title">

                                <h1 className="title">A continuación encuentran los significados
                                de los refranes.</h1>
                            </div>
                        </Col>
                        <Col md={3}>
                            <Image loading="eager" priority={true} className="pagina-leer__top__img" src="/tabla-bus.png" layout="fill" />
                        </Col>
                    </Row>
                </div>
                <div className="pagina-leer__slider">
                    <MySlider />
                </div>
                <div className="refranes-container">
                    <h1 className="title">escriban el refrán según
                corresponda.</h1>
                    <Row>
                        {refranes.map((refran, i) => (
                            <Col md={6} lg={4} key={i}>
                                <div className={`refranes-container__significados ${refran.respuesta ? "refranes-container__item--correct" : refran.respuesta === false ? "refranes-container__item--wrong" : ""}`}>
                                    <EditText
                                        name="refranUno"
                                        placeholder="___________________________"
                                        style={{ color: 'gray', width: "90%" }}
                                        onSave={({ value }) => {
                                            setRespuestas(prevState => ({
                                                ...prevState,
                                                [i]: value
                                            }))
                                        }}
                                    />
                                    <p>{refran.significado}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
                <div className="refranes-container__button" >
                    <button className="my-btn" onClick={validateAnswers} >Validar</button>
                </div>
                {/* <div className="refranes-container__refranes">
                    <h1 className="title">Refranes</h1>
                    <Row>
                        <ul>
                            {refranes.map((item, i) => {
                                return (
                                    <Col key={i} md={4}>
                                        <li>{item.refran}</li>
                                    </Col>
                                )
                            })}
                        </ul>
                    </Row>
                </div> */}
                <div className="refranes-container__enviar-tarea">
                    <h1 className="title" >Enviar evidencia</h1>
                    <p>Toma un screen-print o foto de sus respuestas y envíala a través del siguiente formulario</p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="image">
                            <Form.Label>Seleccionar imagen</Form.Label>
                            <Form.Control key={key} onChange={handleFileChange} type="file" accept="image/*" />
                        </Form.Group>
                        <Form.Group controlId="comentario">
                            <Form.Label>Comentario</Form.Label>
                            <Form.Control value={comentario} placeholder="Opcional" onChange={(e) => setComentario(e.target.value)} as="textarea" rows={3} />
                        </Form.Group>
                        <button className="my-btn" type="submit">
                            Enviar
                        </button>
                        {isLoading && (<span className="enviando">Enviando...</span>)}
                    </Form>
                </div>
            </div>
        </Layout>
    )
}

export function getServerSideProps({ req }) {
    const { token } = parseCookies(req)

    return {
        props: {
            token,
        },
    }
}

/* export async function getStaticProps() {
    const res = await fetch(`${URL_API}/pagina-leer`);
    const data = await res.json();

    return {
        props: { data },
        revalidate: 1
    }
} */

export default Leer
