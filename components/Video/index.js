import React from 'react';
// import videoDemo from "/videos/demo-video-2.mp4";
// import playIcon from "/refranes-colombianos.jpeg"
import ReactPlayer from 'react-player'
// import { Player } from 'video-react';
// import "./index.scss"


const Video = ({ src, previewUrl, style }) => {
    return (
        <ReactPlayer url={src} controls width="100%" height="100%" light={previewUrl} style={style} />
    );
};

export default Video