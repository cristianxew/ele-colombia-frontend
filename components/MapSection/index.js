import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
// import colombiaMap from "/colombia-map.jpeg"
// import hechoConAmor from "../../assets/hecho-con-amor.jpeg"
// import styles from "../../styles/MapSection.module.scss"

const MapSection = () => {
    return (

        <div className="map-section">
            <img className="map-section__left-img" src="/colombia-map.jpeg" alt="colombia map" />
            <div className="map-section__right">
                <h2>
                    Hecho con
                </h2>
                <FontAwesomeIcon icon={faHeart} />
            </div>
            {/* <img className="map-section__right-img" src={hechoConAmor} alt="hecho con amor imagen" /> */}
        </div>

    )
}

export default MapSection
