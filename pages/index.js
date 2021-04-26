import Layout from "../components/Layout"
import MapSection from '../components/MapSection'
import TeacherInfo from '../components/TeacherInfo'
import VideoSection from '../components/VideoSection'
// import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <Layout title="ELE Colombia">
      <MapSection />
      <VideoSection />
      <TeacherInfo />
    </Layout>
  )
}
