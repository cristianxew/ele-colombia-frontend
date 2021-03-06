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



const Leer = ({ data, token }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [comentario, setComentario] = useState("")
    const [key, setKey] = useState(1)

    const {
        tituloPrincipal,
        tituloSignificados,
        imagen, imagenes,
        imagenesSituaciones,
        significadosRefranes,
        tituloImagenes,
        descripcionEnviarEvidencia,
        descTareaCuestionario,
        enlaceCuestionario,
        nombreBotonCuestionario
    } = data
    console.log(data)
    const [refranes, setRefranes] = useState(significadosRefranes)
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

                                <h1 className="title">{tituloPrincipal}</h1>
                            </div>
                        </Col>
                        <Col md={3}>
                            <Image
                                loading="eager"
                                priority={true}
                                className="pagina-leer__top__img"
                                src={imagen.formats.small.url} layout="fill" />
                        </Col>
                    </Row>
                </div>
                <div className="pagina-leer__slider">
                    <MySlider data={imagenes} />
                </div>
                <div className="refranes-container">
                    <h1 className="title">{tituloSignificados}</h1>
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
                <div className="refranes-container__enviar-tarea">
                    <h1 className="title" >Enviar evidencia</h1>
                    <p>{descripcionEnviarEvidencia}</p>
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
                <div className="pagina-leer__slider">
                    <h1 className="title">{tituloImagenes}</h1>
                    <MySlider data={imagenesSituaciones} />
                </div>
                <div className="pagina-leer__cuestionario">
                    <p>{descTareaCuestionario}</p>
                    <a href={enlaceCuestionario} className="my-btn">{nombreBotonCuestionario}</a>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req)
    const res = await fetch(`${URL_API}/pagina-leer`);
    const data = await res.json();

    return {
        props: {
            data,
            token,
        },
    }
}

export default Leer