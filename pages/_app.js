import { AuthProvider } from "../context/authContext"
import "../styles/main.scss"


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
