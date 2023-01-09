import React, { useState, useCallback } from 'react'
import styles from "../VideoPlayer/VideoPlayer.module.css";
const Videoplayer = ({ stream, localStream, remoteStream, pc }) => {
    const [isAudioMute, setIsAudioMute] = useState(true);
    const [isVideoMute, setIsVideoMute] = useState(true);


    const handleAudio = useCallback(() => {
        stream.getAudioTracks().forEach((track) => {
            track.enabled = !track.enabled;
        });
        setIsAudioMute(!isAudioMute);
    }, [isAudioMute, stream]);

    const handleVideo = useCallback(() => {
        stream.getVideoTracks().forEach((track) => {
            track.enabled = !track.enabled;
        });
        setIsVideoMute(!isVideoMute);
    }, [isVideoMute, stream]);

    const endCall = useCallback(() => {
        stream.getTracks().forEach((track) => {
            track.stop();
        });
        pc.close();
        window.location.reload();

    }, [pc, stream]);

    return (
        <div className={styles.section1}>
            <div className={styles.stream_section}>
                <div className={styles.myStream}>
                    <video ref={localStream} autoPlay muted />
                </div>
                <div className={styles.otherStream}>
                    <video ref={remoteStream} autoPlay muted />
                </div>
            </div>
            <div className={styles.menus}>
                <span>
                    {isAudioMute ?
                        <i className="fas fa-microphone mikeon" onClick={handleAudio} /> :
                        <i className="fa fa-microphone-slash mikeoff " onClick={handleAudio} />
                    }
                    {isVideoMute ?
                        <i className="fas fa-video videoon" onClick={handleVideo} /> :
                        <i className="fas fa-video-slash videooff" onClick={handleVideo} />
                    }
                    <i className="fas fa-phone-slash" onClick={endCall}></i>

                </span>
            </div>
        </div >
    )
}

export default Videoplayer