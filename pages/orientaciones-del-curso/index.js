import React from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { URL_API } from "../../config/index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const Lista = ({ lista, titulo }) => {
    return (
        <React.Fragment>
            {titulo && (
                <h2>{titulo}</h2>
            )}
            <ul className="lista">
                {lista.map(item => (
                    <li key={item.id}>{item.texto || item.pregunta}</li>
                ))}
            </ul>
        </React.Fragment>
    )
}

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




const Leer = ({ data }) => {
    const {
        tituloPrincipal,
        imagen,
        seccionContenido,
        seccionHabilidades,
        seccionIntro,
        seccionProyectoFinal,
        sesion1,
        sesion2,
        sesion3,
        tituloHabilidades
    } = data

    return (
        <Layout >
            <main className="pagina-guia">
                <section className="pagina-guia__seccion-titulo">
                    <Row className="center" noGutters={true}>
                        <Col md={9}>
                            <h1 className="title"
                            >{tituloPrincipal}</h1>
                        </Col>
                        <Col md={4}>
                            <Image
                                loading="eager"
                                priority={true}
                                src={imagen.formats.small.url}
                                height="500"
                                width="354"
                            />
                        </Col>
                    </Row>
                </section>
                <section className="pagina-guia__seccion-contenido">
                    <Row>
                        <Col md={12}>
                            <h1 className="title"
                            >{seccionContenido.contenido}</h1>
                        </Col>
                        <Col md={12}>
                            <div className="pagina-guia__seccion-contenido__lista">
                                <Row>
                                    <Col md={6}><p>{seccionContenido.introduccion}</p></Col>
                                    <Col md={6}><p></p></Col>
                                    {seccionContenido.listaConFotos.map(item => (
                                        <React.Fragment key={item.id}>
                                            <Col md={6}>
                                                <p>{item.texto}</p>
                                            </Col>
                                            <Col md={6}>
                                                <Image
                                                    loading="eager"
                                                    priority={true}
                                                    src={item.imagen.formats.thumbnail.url}
                                                    height="100"
                                                    width="100"
                                                />
                                            </Col>
                                        </React.Fragment>
                                    ))}
                                </Row>
                            </div>
                        </Col>
                        <Col className="center" md={12}>
                            <Image
                                loading="eager"
                                priority={true}
                                src={seccionContenido.imagen.formats.thumbnail.url}
                                height="115"
                                width="245"
                            />
                        </Col>
                    </Row>
                </section>
                <section className="pagina-guia__seccion-introduccion">
                    <Row className="center">
                        <Col className="center" md={12}>
                            <h1 className="title mb-5"
                            >{seccionIntro.introduccion}</h1>
                        </Col>
                        <Col md={8}>
                            <p className="lh-5">{seccionIntro.parrafo1}</p>
                            <p className="lh-5">{seccionIntro.parrafo2}</p>
                        </Col>
                        <Col className="center mt-4" md={12}>
                            <Image
                                loading="eager"
                                priority={true}
                                src={seccionIntro.imagen.formats.small.url}
                                height="150"
                                width="150"
                            />
                        </Col>
                    </Row>
                </section>
                <section className="pagina-guia__seccion-habilidades">
                    <div className="center mb-5">
                        <h1 className="title">{tituloHabilidades}</h1>
                    </div>
                    <div className="pagina-guia__seccion-habilidades__list_items">
                        {seccionHabilidades.map(item => (
                            <Row key={item.id} className="center mb-4">
                                <Col className="center" md={4}>
                                    <p><span className="base-color">{item.titulo}</span> {item.texto}</p>
                                </Col>
                                <Col className="center" md={4}>
                                    <Image
                                        loading="eager"
                                        priority={true}
                                        src={item.imagen.formats.small.url}
                                        height="150"
                                        width="150"
                                    />
                                </Col>
                            </Row>
                        ))}
                    </div>
                </section>
                <section className="pagina-guia__sesion1">
                    <Row className="center">
                        <Col className="center mb-4" md={12}>
                            <h1 className="title" >{sesion1.sesion1}</h1>
                        </Col>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <div className="pagina-guia__sesion1__objetivos">
                                <Lista titulo={sesion1.objetivos} lista={sesion1.listaSimple} />
                            </div>
                        </Col>
                        <Col className="center" md={12}>
                            <h1 className="title mb-5 mt-5"
                            >{sesion1.introduccion}</h1>
                        </Col>
                        <Col md={8}>
                            <p className="lh-5">{sesion1.parrafo1}</p>
                            <p className="lh-5">{sesion1.parrafo2}</p>
                        </Col>
                        <Col className="center" md={12}>
                            <h1 className="title mb-5 mt-5"
                            >{sesion1.presentacion.presentacion}</h1>
                        </Col>
                        <Col className="center mb-5" md={8}>
                            <Image
                                loading="eager"
                                priority={true}
                                src={sesion1.presentacion.imagen.formats.small.url}
                                height="150"
                                width="150"
                            />
                        </Col>
                        <Col md={8}>
                            <p className="lh-5">{sesion1.presentacion.parrafo1}</p>
                            <p className="lh-5">{sesion1.presentacion.parrafo2}</p>
                            <p className="lh-5">{sesion1.presentacion.parrafo3}</p>
                        </Col>
                        <Col className="center" md={12}>
                            <h1 className="title mb-5 mt-5"
                            >{sesion1.presentacion.subtitulo1}</h1>
                        </Col>
                        <Col md={8}>
                            <h2>{sesion1.presentacion.titulo2}</h2>
                            <p className="lh-5">{sesion1.presentacion.texto1}</p>
                            <p className="lh-5">{sesion1.presentacion.texto2}</p>
                        </Col>
                        <Col className="center" md={12}>
                            <h1 className="title mb-5 mt-5"
                            >{sesion1.presentacion.titulo3}</h1>
                        </Col>
                        <Col md={8}>
                            <div style={{ float: "left", margin: "0 1rem 1rem 0" }}>
                                <Image
                                    loading="eager"
                                    priority={true}
                                    src={sesion1.presentacion.imagen2.formats.small.url}
                                    height="150"
                                    width="150"
                                />
                            </div>
                            <p className="lh-5">{sesion1.presentacion.texto3}</p>
                        </Col>
                        <Col md={8}>
                            <div className="pagina-guia__sesion1__tareas mt-4">
                                <Lista titulo={sesion1.tituloTarea} lista={sesion1.tareas} />
                            </div>
                        </Col>
                        <Col className="center mt-5" md={8}>
                            <Image
                                loading="eager"
                                priority={true}
                                src={sesion1.imagen.formats.small.url}
                                height="115"
                                width="245"
                            />
                        </Col>
                    </Row>
                </section>
                <section className="pagina-guia__sesion2">
                    <Row className="center">
                        <Col className="center mb-4" md={12}>
                            <h1 className="title" >{sesion2.titulo}</h1>
                        </Col>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <div className="pagina-guia__sesion2__objetivos">
                                <Lista titulo={sesion2.objetivo} lista={sesion2.objetivos} />
                            </div>
                        </Col>
                        <Col className="center" md={12}>
                            <h1 className="title mb-5 mt-5"
                            >{sesion2.actividades}</h1>
                        </Col>

                        <Col md={8}>
                            <div style={{ float: "left", margin: "0 1rem 1rem 0" }}>
                                <Image
                                    loading="eager"
                                    priority={true}
                                    src={sesion2.imagen.formats.small.url}
                                    height="150"
                                    width="150"
                                />
                            </div>
                            <p className="lh-5">{sesion2.texto}</p>
                        </Col>
                        <Col md={8}>
                            <div className="pagina-guia__sesion1__tareas mt-4">
                                <Lista titulo={sesion2.tarea} lista={sesion2.tareas} />
                            </div>
                        </Col>
                        <Col className="center mt-5" md={8}>
                            <Image
                                loading="eager"
                                priority={true}
                                src={sesion2.imagen2.formats.small.url}
                                height="150"
                                width="150"
                            />
                        </Col>
                    </Row>
                </section>
                <section className="pagina-guia__sesion3">
                    <Row className="center">
                        <Col className="center mb-4" md={12}>
                            <h1 className="title" >{sesion3.titulo}</h1>
                        </Col>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <div className="pagina-guia__sesion2__objetivos">
                                <Lista titulo={sesion3.objetivo} lista={sesion3.objetivos} />
                            </div>
                        </Col>
                        <Col className="center" md={12}>
                            <h1 className="title mb-5 mt-5"
                            >{sesion3.actividades}</h1>
                        </Col>
                        <Col md={8}>
                            <div style={{ float: "left", margin: "0 1rem 1rem 0" }}>
                                <Image
                                    loading="eager"
                                    priority={true}
                                    src={sesion3.imagen.formats.small.url}
                                    height="150"
                                    width="150"
                                />
                            </div>
                            <p className="lh-5">{sesion3.texto1}</p>
                            <p className="lh-5">{sesion3.texto2}</p>
                        </Col>
                        <Col md={8}>
                            <div className=" mt-4">
                                <Lista titulo={`Tarea`} lista={sesion3.tareas} />
                            </div>
                        </Col>
                        <Col className="center mt-5" md={8}>
                            <Image
                                loading="eager"
                                priority={true}
                                src={sesion3.imagen2.formats.small.url}
                                height="115"
                                width="245"
                            />
                        </Col>
                    </Row>
                </section>
                <section className="pagina-guia__proyecto-final">
                    <Row className="center">
                        <Col className="center mb-4" md={12}>
                            <h1 className="title" >{seccionProyectoFinal.titulo}</h1>
                        </Col>
                        <Col md={8}>
                            <p className="lh-5">{seccionProyectoFinal.parrafo1}</p>
                            <p className="lh-5">{seccionProyectoFinal.parrafo2}</p>
                        </Col>
                        <div className="mt-5">
                            <Row className="center">
                                <Col md={2}>
                                    <Image
                                        loading="eager"
                                        priority={true}
                                        src={seccionProyectoFinal.imagen.formats.medium.url}
                                        height="200"
                                        width="150"
                                    />
                                </Col>
                                <Col md={6}>
                                    <div >
                                        <p>{seccionProyectoFinal.descTarea}</p>
                                        <Lista titulo={seccionProyectoFinal.tarea} lista={seccionProyectoFinal.preguntas} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Col className="center mt-5" md={12}>
                            <Image
                                loading="eager"
                                priority={true}
                                src={seccionProyectoFinal.imagen2.formats.small.url}
                                height="150"
                                width="150"
                            />
                        </Col>
                        <HechoConAmor />
                    </Row>
                </section>
            </main>
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${URL_API}/pagina-guia`);
    const data = await res.json();

    return {
        props: {
            data,
        },
        revalidate: 1
    }
}

export default Leer

