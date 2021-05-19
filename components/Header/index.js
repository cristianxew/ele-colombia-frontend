import React, { useState, useEffect, useRef, useContext } from 'react'
import AuthContext from "../../context/authContext"
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMicrophoneAlt,
    faAssistiveListeningSystems,
    faBookReader,
    faPencilAlt,
    faSignOutAlt,
    faUserCircle,
    faLock
} from '@fortawesome/free-solid-svg-icons'



const MenuLinks = ({ className }) => {
    const { user, logout } = useContext(AuthContext)
    const authenticatedLinks = [{
        text: 'Escuchar',
        link: '/escuchar',
        icon: <FontAwesomeIcon icon={faAssistiveListeningSystems} />
    }, {
        text: 'Leer',
        link: '/leer',
        icon: <FontAwesomeIcon icon={faBookReader} />
    }, {
        text: 'Escribir',
        link: '/escribir',
        icon: <FontAwesomeIcon icon={faPencilAlt} />
    }, {
        text: 'Hablar',
        link: '/hablar',
        icon: <FontAwesomeIcon icon={faMicrophoneAlt} />
    }
    ]
    const defaultLinks = [
        {
            text: 'Iniciar Sesion',
            link: '/account/login',
            icon: <FontAwesomeIcon icon={faLock} />
        }, {
            text: 'Registrarse',
            link: '/account/register',
            icon: <FontAwesomeIcon icon={faUserCircle} />
        }
    ]
    return (
        <nav id="menu" className={className} >
            <ul>
                {user ? (
                    <>
                        {authenticatedLinks.map((link, i) =>
                            <li key={i + 1}>
                                <Link href={link.link}>{link.text}</Link>
                                <i > {link.icon}</i>
                            </li>
                        )}
                        <li onClick={() => logout()}>
                            <span> Cerrar sesion</span>
                            <i > <FontAwesomeIcon icon={faSignOutAlt} /></i>
                        </li>
                    </>

                ) : (
                    defaultLinks.map((link, i) =>
                        <li key={i + 1}>
                            <Link href={link.link}>{link.text}</Link>
                            <i > {link.icon}</i>
                        </li>
                    )
                )}
            </ul>
        </nav>
    )
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef();

    useEffect(() => {
        const handleDocumentClick = (e) => {
            if ((menuRef.current !== e.target) && isOpen === true) {
                setIsOpen(false)
            };
        }
        document.addEventListener("click", handleDocumentClick)
        return function cleanup() {
            document.removeEventListener('click', handleDocumentClick);
        }
    }, [isOpen])

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen)
    }
    return (
        <header className="header">
            <Link href="/">
                <div className="header__ele-colombia">
                    <div className="header__ele-colombia__flag">
                        <img src="/colombia-flag.png" alt="ele colombia" />
                    </div>
                    <h1>ELE <span>colombia</span></h1>
                </div>
            </Link>
            <div className="header__menu" ref={menuRef}>
                <div className="header__menu__bar">
                    <div className="header__menu__bar__clicker" onClick={toggleMenu}></div>
                    <div className={`header__menu__bar__hamburguer ${isOpen ? "isOpen" : ""}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <MenuLinks className={isOpen ? "isOpen" : ""} />
            </div>
        </header>
    )
}

export default Header
