import React, { useContext } from "react"
import Layout from "../components/Layout"
import AuthContext from "../context/authContext"
import MapSection from '../components/MapSection'
import TeacherInfo from '../components/TeacherInfo'
import VideoSection from '../components/VideoSection'
import { URL_API } from "../config/index"
// import styles from '../styles/Home.module.scss'

export default function Home({ data }) {

  const { user } = useContext(AuthContext)

  return (
    <Layout title="ELE Colombia">
      <div className="pagina-inicio">
        <MapSection />
        <VideoSection user={user} video={data.video} />
        <TeacherInfo />
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${URL_API}/pagina-inicio`);
  const data = await res.json();

  return {
    props: { data },
    revalidate: 1
  }
}