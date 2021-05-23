import Head from "next/head"
import Container from 'react-bootstrap/Container'
import Header from "../Header/index"
import Footer from "../Footer/index"
// import styles from "../../styles/Layout.module.scss"

export default function Layout({ title, keywords, description, children }) {
    return (
        <div className="root">
            <Container>
                <div className="App">
                    <Head>
                        <title>{title}</title>
                        <meta name="description" content={description} />
                        <meta name="keywords" content={keywords} />
                    </Head>
                    <Header />
                    {children}
                    <Footer />
                </div>
            </Container>
        </div>
    )
}

Layout.defaultProps = {
    title: "ELE Colombia",
    description: "ELE Colombia es un curso virtual que busca desarrollar las competencias comunicativa sociolingüística y pragmática, las cuales hacen referencia a la capacidad de una persona para producir y entender adecuadamente expresiones lingüísticas en diferentes contexto de uso.",
    keywords: "Aprender Español",
}