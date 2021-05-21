import React, { useContext } from "react"
import Layout from "../components/Layout"
import AuthContext from "../context/authContext"
import MapSection from '../components/MapSection'
import TeacherInfo from '../components/TeacherInfo'
import VideoSection from '../components/VideoSection'
import { URL_API } from "../config/index"

export default function Home({ data }) {

  const { user } = useContext(AuthContext)

  const { seccion1, seccion2, footer } = data

  return (
    <Layout title="ELE Colombia">
      <div className="pagina-inicio">
        <MapSection data={seccion1} />
        <VideoSection user={user} data={seccion2} />
        <TeacherInfo data={footer} />
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