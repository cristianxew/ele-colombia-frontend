import React from 'react'
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MySlider = ({ data }) => {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
    };

    return (
        <Slider {...settings}>
            {data.map((imagen, i) => (
                <Image loading="eager" priority={true} key={i} src={imagen.imagen.formats.large.url} height="650px" width="1046px" />
            ))}
        </Slider>
    )
}

export default MySlider