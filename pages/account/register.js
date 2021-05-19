import React, { useState, useContext, useEffect } from 'react'
import AuthContext from "../../context/authContext"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link"
import Layout from "../../components/Layout"
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const { register, error } = useContext(AuthContext)

    useEffect(() => error && toast.error(error))

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== passwordConfirm) {
            toast("Las contraseñas no coinciden")
            return
        }

        register({ username, email, password })
    }
    return (
        <Layout>
            <div className="page page-register">
                <Form onSubmit={handleSubmit}>
                    <h1>Registrarse</h1>
                    <ToastContainer position="top-center" />
                    <Form.Group controlId="username">
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Nombre se usuario" />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Correo Electronico</Form.Label>
                        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Correo Electronico" />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contraseña" />
                    </Form.Group>

                    <Form.Group controlId="passwordConfirm">
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} type="password" placeholder="Confirmar Contraseña" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Registrarse
                    </Button>
                    <Form.Text className="text-muted">
                        ¿Ya tienes una cuenta?  <Link href="/account/login">Iniciar sesion</Link>
                    </Form.Text>
                </Form>
            </div>
        </Layout>
    )
}
