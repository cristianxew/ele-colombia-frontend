import React from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlay,
    faPause,
    faBackward,
    faForward,
    faAssistiveListeningSystems,
} from '@fortawesome/free-solid-svg-icons'

class AudioPlayer extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        index: 0,
        currentTime: '0:00',
        pause: false,
        duration: 0,
        musicList: this.props.data
    };

    /* musicList = [
        {
            url: "/audios/A buen entendedor.mp3",
            nombre: "A buen entendedor pocas palabras.",
            duration: 4
        },
        {
            url: "/audios/A cada marrano.mp3",
            nombre: "A cada marrano le llega su nochebuena.",
            duration: 4
        },
        {
            url: "/audios/Al caído.mp3",
            nombre: "Al caído, caerle.",
            duration: 3
        },
        {
            url: "/audios/Al mal tiempo.mp3",
            nombre: "Al mal tiempo, buena cara.",
            duration: 2
        },
        {
            url: "/audios/Al que anda entre lamiel.mp3",
            nombre: "Al que anda entre la miel, algo se le pega.",
            duration: 3
        },
        {
            url: "/audios/Barriga llena.mp3",
            nombre: "Barriga llena, corazón contento.",
            duration: 3
        },
        {
            url: "/audios/Cada quien mata.mp3",
            nombre: "Cada uno mata las pulgas a su manera.",
            duration: 2
        },
        {
            url: "/audios/Dos cabezas.mp3",
            nombre: "Dos cabezas piensan mejor que una.",
            duration: 2
        },
        {
            url: "/audios/Hablando del rey.mp3",
            nombre: "Hablando del rey de Roma y ahí asoma.",
            duration: 3
        },
        {
            url: "/audios/Hasta al mejor panadero.mp3",
            nombre: "Hasta al mejor panadero se le quema el pan en la puerta del horno.",
            duration: 7
        },
    ] */


    componentDidMount() {
        this.playerRef.addEventListener("timeupdate", this.timeUpdate, false);
        this.playerRef.addEventListener("ended", this.nextSong, false);
        this.timelineRef.addEventListener("click", this.changeCurrentTime, false);
        this.timelineRef.addEventListener("mousemove", this.hoverTimeLine, false);
        this.timelineRef.addEventListener("mouseout", this.resetTimeLine, false);
    }

    componentWillUnmount() {
        this.playerRef.removeEventListener("timeupdate", this.timeUpdate);
        this.playerRef.removeEventListener("ended", this.nextSong);
        this.timelineRef.removeEventListener("click", this.changeCurrentTime);
        this.timelineRef.removeEventListener("mousemove", this.hoverTimeLine);
        this.timelineRef.removeEventListener("mouseout", this.resetTimeLine);
    }

    changeCurrentTime = (e) => {
        const duration = this.playerRef.duration;

        const playheadWidth = this.timelineRef.offsetWidth;
        const userClickWidht = e.offsetX;;

        const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth;

        this.playheadRef.style.width = userClickWidhtInPercent + "%";
        this.playerRef.currentTime = (duration * userClickWidhtInPercent) / 100;
    }

    hoverTimeLine = (e) => {
        const duration = this.playerRef.duration;

        const playheadWidth = this.timelineRef.offsetWidth
        const userClickWidht = e.offsetX;
        const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth;


        if (userClickWidhtInPercent <= 100) {
            this.hoverPlayheadRef.style.width = userClickWidhtInPercent + "%";
        }


        const time = (duration * userClickWidhtInPercent) / 100;

        if ((time >= 0) && (time <= duration)) {
            this.hoverPlayheadRef.dataset.content = this.formatTime(time);
        }
    }

    resetTimeLine = () => {
        this.hoverPlayheadRef.style.width = 0;
    }

    timeUpdate = () => {
        const duration = this.playerRef.duration;
        const timelineWidth = this.timelineRef.offsetWidth - this.playheadRef.offsetWidth;
        const playPercent = 100 * (this.playerRef.currentTime / duration);
        this.playheadRef.style.width = playPercent + "%";
        const currentTime = this.formatTime(parseInt(this.playerRef.currentTime));
        this.setState({
            currentTime,
            duration
        });
    }

    formatTime = (currentTime) => {
        const minutes = Math.floor(currentTime / 60);
        let seconds = Math.floor(currentTime % 60);

        seconds = (seconds >= 10) ? seconds : "0" + seconds % 60;

        const formatTime = minutes + ":" + seconds

        return formatTime;
    }

    updatePlayer = () => {
        // const { musicList } = this.props;
        const { index, musicList } = this.state;
        const currentSong = musicList[index];
        const audio = new Audio(currentSong.audio.url);
        this.playerRef.load();
    }

    nextSong = () => {
        // const { musicList } = this.props
        const { index, pause, musicList } = this.state;

        this.setState({
            index: (index + 1) % musicList.length,
        });
        this.updatePlayer();

        if (pause) {
            this.playerRef.play();
        }
    };

    prevSong = () => {
        // const { musicList } = this.props
        const { index, pause, musicList } = this.state;

        this.setState({
            index: (index + musicList.length - 1) % musicList.length,
        });
        this.updatePlayer();

        if (pause) {
            this.playerRef.play();
        }
    };


    playOrPause = () => {
        // const { musicList } = this.props
        const { index, pause, musicList } = this.state;
        const currentSong = musicList[index];
        const audio = new Audio(currentSong.audio.url);
        if (!this.state.pause) {
            this.playerRef.play();
        } else {
            this.playerRef.pause();
        }
        this.setState({
            pause: !pause,
        })
    }

    clickAudio = (key) => {
        const { pause } = this.state;
        this.setState({
            index: key,
        });
        this.updatePlayer();

        if (pause) {
            this.playerRef.play();
        }
    }


    render() {
        // const musicList = this.musicList
        const { index, currentTime, pause, musicList, duration } = this.state;
        const currentSong = musicList[index];

        return (
            <div className="audio-player">
                <Row noGutters={true}>
                    <Col lg={5}>
                        <div className="play-list" >
                            {musicList.map((music, key = 0) =>
                                <div key={key}
                                    onClick={() => this.clickAudio(key)}
                                    className={"track " +
                                        (index === key && !pause ? 'current-audio' : '') +
                                        (index === key && pause ? 'play-now' : '')} >
                                    <div className="track-discr" >
                                        <span className="track-name" >{
                                            music.nombre.length > 50 ?
                                                `${music.nombre.substring(0, 50)}...` :
                                                music.nombre
                                        }</span>
                                    </div>
                                    <span className="track-duration" >
                                        {(index === key)
                                            ? currentTime
                                            : ""
                                        }
                                    </span>
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col lg={7}>
                        <div className="current-song">
                            <audio autoPlay={false} ref={ref => this.playerRef = ref}>
                                <source src={currentSong.audio.url} />
                        Your browser does not support the audio element.
                    </audio>
                            <div className="img-wrap">
                                <FontAwesomeIcon icon={faAssistiveListeningSystems} />
                            </div>
                            <span className="song-name">{currentSong.nombre}</span>

                            <div className="time">
                                <div className="current-time">{currentTime}</div>
                                <div className="end-time">{duration ? this.formatTime(duration) : "0:00"}</div>
                            </div>

                            <div ref={ref => this.timelineRef = ref} id="timeline">
                                <div ref={ref => this.playheadRef = ref} id="playhead"></div>
                                <div ref={ref => this.hoverPlayheadRef = ref} className="hover-playhead" data-content="0:00"></div>
                            </div>

                            <div className="controls">
                                <button onClick={this.prevSong} className="prev prev-next current-btn"><FontAwesomeIcon icon={faBackward} /></button>

                                <button onClick={this.playOrPause} className="play current-btn">
                                    {
                                        (!pause) ? <FontAwesomeIcon icon={faPlay} />
                                            : <FontAwesomeIcon icon={faPause} />
                                    }
                                </button>
                                <button onClick={this.nextSong} className="next prev-next current-btn"><FontAwesomeIcon icon={faForward} /></button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AudioPlayer