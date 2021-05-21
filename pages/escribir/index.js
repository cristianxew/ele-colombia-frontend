import React, { useState } from "react"
import Image from "next/image"
import Layout from "../../components/Layout"
import { parseCookies } from "../../helpers/index"
import { EditText } from 'react-edit-text';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { URL_API } from "../../config/index"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Escribir = ({ data, token }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [comentario, setComentario] = useState("")
    const [key, setKey] = useState(1)

    const { descripcionEnviarEvidencia, imagen, refranes, texto, titulo } = data

    const [refraness, setRefraness] = useState(refranes)
    const [respuestas, setRespuestas] = useState([])

    const validateAnswers = () => {
        let newState = [...refraness]
        for (let i = 0; i < refraness.length; i++) {
            if (respuestas[i] === undefined) {
                newState[i].respuesta = null
                setRefraness(newState)
            } else if (refraness[i].final.toLowerCase() === respuestas[i].toLowerCase()) {
                newState[i].respuesta = true
                setRefraness(newState)
            } else {
                newState[i].respuesta = false
                setRefraness(newState)
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
        formData.append('ref', 'escribir-tareas')
        formData.append('field', 'evidencia')
        formData.append('comentario', comentario)

        formData.forEach(function (value, key) {
            dataToSend[key] = value;
        });

        const resTarea = await fetch(`${URL_API}/escribir-tareas`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dataToSend),
        })

        if (!resTarea.ok) {
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
                setImage(null)
                setComentario("")
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
            <div className="pagina-escribir">
                <div className="pagina-escribir__top">
                    <Row noGutters>
                        <Col md={10}>
                            <div className="pagina-escribir__top__title">
                                <h1 className="title">{titulo}</h1>
                                {texto && (
                                    <p>{texto}</p>
                                )}
                            </div>
                        </Col>
                        <Col md={2}>
                            <Image
                                loading="eager"
                                priority={true}
                                className="pagina-escribir__top__img"
                                src={imagen.formats.small.url}
                                layout="fill" />
                        </Col>
                    </Row>
                </div>
                <div className="refranes-container">
                    <Row>
                        <Col md={7}>
                            {refraness.map((refran, i) => (
                                <div key={refran.id}
                                    className={`refranes-container__item ${refran.respuesta ? "refranes-container__item--correct" : refran.respuesta === false ? "refranes-container__item--wrong" : ""}`}>
                                    <span className="refranes-container__item__number">{`${i + 1}`}</span>
                                    <div className="refranes-container__item__text">
                                        <span>{refran.comienzo}</span>
                                        <EditText
                                            name="refranUno"
                                            placeholder="__________________"
                                            style={{ color: 'gray', marginLeft: "4px" }}
                                            onSave={({ value }) => {
                                                setRespuestas(prevState => ({
                                                    ...prevState,
                                                    [i]: value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Col>
                        <Col md={5}>
                            <ul>
                                {refraness.map(refran => {
                                    return (
                                        <li key={refran.id} className="refranes-container__item">
                                            {refran.final}
                                        </li>
                                    )
                                })}
                            </ul>
                        </Col>
                    </Row>
                </div>
                <div className="refranes-container__button" >
                    <button className="my-btn" onClick={validateAnswers} >Validar</button>
                </div>
                <div className="refranes-container__enviar-tarea">
                    <h1 className="title" >Enviar evidencia</h1>
                    <p>{descripcionEnviarEvidencia}</p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="imagen">
                            <Form.Label>Imagen</Form.Label>
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

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req)

    const res = await fetch(`${URL_API}/pagina-escribir`);
    const data = await res.json();


    return {
        props: {
            data,
            token,
        },
    }
}

export default Escribir
