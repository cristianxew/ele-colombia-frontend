import Layout from '../../components/Layout'
import Image from "next/image"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AudioPlayer from "../../components/AudioPlayer"
import Video from "../../components/Video"
import { URL_API } from "../../config/index"

const Escuchar = ({ data }) => {
    const { seccion1, videos, audios, tituloVideos, tituloAudios } = data

    return (
        <Layout>
            <div className="pagina-escuchar">
                <div className="pagina-escuchar__top">
                    <Row noGutters >
                        <Col md={9}>
                            <div className="pagina-escuchar__top__title">
                                <h1 className="title" >{seccion1.titulo}</h1>
                                <p>{seccion1.texto}</p>
                            </div>
                        </Col>
                        <Col md={3}>
                            <Image loading="eager" priority={true} className="pagina-leer__top__img" src={seccion1.imagen.formats.small.url} layout="fill" />
                        </Col>
                    </Row>
                </div>
                <div className="pagina-escuchar__title">
                    <h1 className="title" >{tituloVideos}</h1>
                </div>
                <div className="pagina-escuchar__videos">
                    <Row>
                        {videos.map(video => (
                            <Col key={video.video.id} md={6} lg={4}>
                                <div className="pagina-escuchar__videos__item">
                                    <Video previewUrl={video.video.previewUrl} src={video.video.url} />
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
                <div className="pagina-escuchar__audios">
                    <h1 className="title">{tituloAudios}</h1>
                    <AudioPlayer data={audios} />
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
