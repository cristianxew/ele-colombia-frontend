import React, { useState } from "react"
import Layout from "../../components/Layout"
import { parseCookies } from "../../helpers/index"
import { EditText } from 'react-edit-text';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { URL_API } from "../../config/index"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Escribir = ({ token }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [comentario, setComentario] = useState("")
    const [key, setKey] = useState(1)

    const [refranes, setRefranes] = useState([
        { comienzo: "A buen entendedor", final: "pocas palabras.", respuesta: null },
        { comienzo: "Al caído,", final: "caerle.", respuesta: null },
        { comienzo: "Al mal tiempo,", final: "buena cara.", respuesta: null },
        { comienzo: "Hasta al mejor panadero", final: "se le quema el pan en la puerta del horno.", respuesta: null },
        { comienzo: "A cada marrano le llega su", final: "nochebuena.", respuesta: null },
        { comienzo: "Barriga llena,", final: "corazón contento.", respuesta: null },
        { comienzo: "Cada uno mata las pulgas", final: "a su manera.", respuesta: null },
        { comienzo: "Dos cabezas piensan", final: "mejor que una.", respuesta: null },
        { comienzo: "Hablando del rey de Roma", final: "y ahí asoma.", respuesta: null },
        { comienzo: "Al que anda entre la miel,", final: "algo se le pega.", respuesta: null },
    ])
    const [respuestas, setRespuestas] = useState([])

    const validateAnswers = () => {
        let newState = [...refranes]
        for (let i = 0; i < refranes.length; i++) {
            if (respuestas[i] === undefined) {
                newState[i].respuesta = null
                setRefranes(newState)
            } else if (refranes[i].final.toLowerCase() === respuestas[i].toLowerCase()) {
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
                <h1 className="pagina-escribir__title title">Completa cada refrán</h1>
                <div className="refranes-container">
                    <Row>
                        <Col md={7}>
                            {refranes.map((refran, i) => (
                                <div key={i}
                                    className={`refranes-container__item ${refran.respuesta ? "refranes-container__item--correct" : refran.respuesta === false ? "refranes-container__item--wrong" : ""}`}>
                                    <span className="refranes-container__item__number">{`${i + 1}`}</span>
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
                            ))}
                        </Col>
                        <Col md={5}>
                            <div className="refranes-container__item">
                                <span className="refranes-container__item__number">a.</span>
                                <span>a su manera.</span>
                            </div>
                            <div className="refranes-container__item">
                                <span className="refranes-container__item__number">b.</span>
                                <span>y ahí asoma.</span>
                            </div>
                            <div className="refranes-container__item">
                                <span className="refranes-container__item__number">c.</span>
                                <span>mejor que una.</span>
                            </div>
                            <div className="refranes-container__item">
                                <span className="refranes-container__item__number">d.</span>
                                <span>algo se le pega.</span>
                            </div>
                            <div className="refranes-container__item">
                                <span className="refranes-container__item__number">e.</span>
                                <span>pocas palabras.</span>
                            </div>
                            <div className="refranes-container__item">
                                <span className="refranes-container__item__number">f.</span>
                                <span>buena cara.</span>
                            </div>
                            <div className="refranes-container__item">
                                <span className="refranes-container__item__number">g.</span>
                                <span>caerle.</span>
                            </div>
                            <div className="refranes-container__item">
                                <span className="refranes-container__item__number">h.</span>
                                <span>se le quema el pan en la puerta del horno.</span>
                            </div>
                            <div className="refranes-container__item">
                                <span className="refranes-container__item__number">i.</span>
                                <span>nochebuena.</span>
                            </div>
                            <div className="refranes-container__item">
                                <span className="refranes-container__item__number">j.</span>
                                <span>corazón contento.</span>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="refranes-container__button" >
                    <button className="my-btn" onClick={validateAnswers} >Validar</button>
                </div>
                <div className="refranes-container__enviar-tarea">
                    <h1 className="title" >Enviar evidencia</h1>
                    <p>Toma un screen-print o foto de sus respuestas y envíala a través del siguiente formulario</p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="imagen">
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

export default Escribir
