import Layout from '../../components/Layout'
import Image from "next/image"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AudioPlayer from "../../components/AudioPlayer"
import Video from "../../components/Video"
import { URL_API } from "../../config/index"

const Escuchar = ({ data }) => {
    return (
        <Layout>
            <div className="pagina-escuchar">
                <div className="pagina-escuchar__top">
                    <Row noGutters >
                        <Col md={9}>
                            <div className="pagina-escuchar__top__title">
                                <h1 className="title" >¿Qué es el refrán?</h1>
                                <p>Los refranes constituyen un material lingüístico
                                de carácter auténtico, debido a los cuales, utilizados
                                en diferentes situaciones de la vida cotidiana, vienen
                                a ser un acervo cultural valiosísimo.
                                Su conocimiento y capacidad de empleo correcto en
                                situaciones reales de comunicación le ayudarán al
                                estudiante a adquirir uno de los aspectos muy
                                importantes de la competencia lingüística, es decir,
                                la competencia paremiológica, propia de los
                                hablantes nativos. (Bouallsl, 2015)</p>
                            </div>
                        </Col>
                        <Col md={3}>
                            <Image loading="eager" priority={true} className="pagina-leer__top__img" src="/monserrate.png" layout="fill" />
                        </Col>
                    </Row>
                </div>
                <div className="pagina-escuchar__title">
                    <h1 className="title" >Conoce algunos refranes colombianos</h1>
                </div>
                <div className="pagina-escuchar__videos">
                    <Row>
                        {data.video.map(video => (
                            <Col key={video.video.id} md={6} lg={4}>
                                <div className="pagina-escuchar__videos__item">
                                    <Video previewUrl={video.video.previewUrl} src={video.video.url} />
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
                <div className="pagina-escuchar__audios">
                    <h1 className="title">Escucha los audios</h1>
                    <AudioPlayer />
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${URL_API}/pagina-escuchar`);
    const data = await res.json();

    return {
        props: { data },
        revalidate: 1
    }
}

export default Escuchar
