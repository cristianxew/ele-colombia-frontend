import React, { useState, useContext, useEffect } from 'react'
import AuthContext from "../../context/authContext"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import { ToastContainer, toast } from 'react-toastify'
import Link from "next/link"
import Layout from "../../components/Layout"
import 'react-toastify/dist/ReactToastify.css'

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { login, error } = useContext(AuthContext)

    useEffect(() => error && toast.error(error))

    const handleSubmit = (e) => {
        e.preventDefault()
        login({ email, password })
    }
    return (
        <Layout>
            <div className="page page-login">
                <Form onSubmit={handleSubmit}>
                    <h1>Iniciar Sesión</h1>
                    <ToastContainer position="top-center" />
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Correo Electronico</Form.Label>
                        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Correo Electronico" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contraseña" />
                    </Form.Group>
                    <button className="my-btn" type="submit">
                        Iniciar Sesion
                    </button>
                    <Form.Text className="text-muted">
                        ¿Aun no tienes una cuenta? <Link href="/account/register">Registrarse</Link>
                    </Form.Text>
                </Form>
            </div>
        </Layout>
    )
}
