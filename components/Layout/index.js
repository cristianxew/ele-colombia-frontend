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
    description: "skadjksan asdknsak",
    keywords: "asdsaklj sdklnsa aslkdsn",
}