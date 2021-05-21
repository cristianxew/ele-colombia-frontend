import React, { useState, useContext } from 'react'
import AuthContext from "../../context/authContext"
import dynamic from 'next/dynamic'
import Layout from '../../components/Layout'
import Image from "next/image"
import { parseCookies } from "../../helpers/index"
const AudioRecorder = dynamic(
    () => import('../../components/AudioRecorder'),
    { ssr: false }
)
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { URL_API } from "../../config/index"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Hablar = ({ data, token }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [comentario, setComentario] = useState("")
    const [audio, setAudio] = useState(null)
    const { user } = useContext(AuthContext)

    const { imagen, texto, titulo } = data

    const handleAudio = (blob) => {
        const audioFile = new File([blob], `hablar-tarea-${user.username || "colado"}.webm`)
        setAudio(audioFile)
    }

    const resetAudio = () => {
        setAudio(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!audio) {
            toast.info("Antes de enviar, graba un audio, diciendo cada uno de los refranes aprendidos")
            return
        }
        setIsLoading(true)
        const formData = new FormData()
        const dataToSend = {}
        formData.append('ref', 'hablar-tareas')
        formData.append('field', 'refranes')
        formData.append('comentario', comentario)

        formData.forEach(function (value, key) {
            dataToSend[key] = value;
        });

        const resTarea = await fetch(`${URL_API}/hablar-tareas`, {
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
            const audioRef = await resTarea.json();

            formData.append('files', audio)
            formData.append('refId', audioRef.id)

            const res = await fetch(`${URL_API}/upload`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })

            if (res.ok) {
                setIsLoading(false)
                setAudio(null)
                setComentario("")
                toast.success(`Gracias ${audioRef.user.username}, se ha enviado tu evidencia exitosamente`)
            } else {
                setIsLoading(false)
                toast.error("Algo no salio bien, intenta de nuevo")
            }
        }

    }

    return (
        <Layout>
            <ToastContainer position="top-center" />
            <div className="pagina-hablar">
                <div className="pagina-hablar__top">
                    <Row noGutters>
                        <Col md={9}>
                            <div className="pagina-hablar__top__title">
                                <h1 className="title">{titulo}</h1>
                                <p>{texto}</p>
                            </div>
                        </Col>
                        <Col md={3}>
                            <Image
                                loading="eager"
                                priority={true}
                                className="pagina-hablar__top__img"
                                src={imagen.formats.small.url}
                                layout="fill" />
                        </Col>
                    </Row>
                </div>
                <div className="pagina-hablar__audio-recorder">
                    <AudioRecorder handleAudio={handleAudio} resetAudio={resetAudio} />
                </div>
                <div className="pagina-hablar__enviar-tarea">
                    <h1 className="title" >Enviar evidencia</h1>
                    <Form onSubmit={handleSubmit}>
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
    );
};

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req)
    const res = await fetch(`${URL_API}/pagina-hablar`);
    const data = await res.json();


    return {
        props: {
            data,
            token,
        },
    }
}


export default Hablar
