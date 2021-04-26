import React from 'react'
// import styles from "../../styles/Footer.modules.scss"

const Footer = () => {
    return (
        <div className="footer">
            <p >
                © ELE Colombia {new Date().getFullYear()} - Todos los derechos reservados
            </p>
        </div>
    )
}

export default Footer
