import React from 'react'
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MySlider = () => {
    // const [carruselImages, setCarruselImages] = useState([])

    const srcImages = [
        "/carrusel-images/IMG_0223.JPG",
        "/carrusel-images/IMG_0219.JPG",
        "/carrusel-images/IMG_0221.JPG",
        "/carrusel-images/IMG_0220.JPG",
        "/carrusel-images/IMG_0216.JPG",
        "/carrusel-images/IMG_0218.JPG",
        "/carrusel-images/IMG_0217.JPG",
        "/carrusel-images/IMG_0222.JPG",
        "/carrusel-images/IMG_0224.JPG",
        "/carrusel-images/IMG_0225.JPG",
    ]


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    /* useEffect(async () => {
       const res = await fetch(`${URL_API}/pagina-leer`);

       if (res.ok) {
           const data = await res.json();
           console.log(data)
           setCarruselImages(data.imagenes)
       }

   }, []) */
    return (
        <Slider {...settings}>
            {srcImages.map((src, i) => (
                <Image loading="eager" priority={true} key={i} src={src} height="650px" width="1046px" />
            ))}
        </Slider>
    )
}

export default MySlider