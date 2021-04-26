import React from 'react';
// import videoDemo from "/videos/demo-video-2.mp4";
import ReactPlayer from 'react-player/file'
// import { Player } from 'video-react';
// import "./index.scss"


const Video = () => {
    return (
        <ReactPlayer url="/videos/demo-video-2.mp4" controls width="100%" height="100%" />
    );
};

export default Video