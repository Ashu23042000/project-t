import React, { useState, useCallback, useContext, useEffect } from 'react'
import styles from "../VideoPlayer/VideoPlayer.module.css";
import { SocketContext } from "../../contexts/socketContext";
import swal from "sweetalert";

const Videoplayer = ({ otherSocketId, stream, localStream, remoteStream, pc }) => {

    const socket = useContext(SocketContext);

    const [isAudioMute, setIsAudioMute] = useState(true);
    const [isVideoMute, setIsVideoMute] = useState(true);

    const handleEndCall = useCallback(() => {
        stream.getTracks().forEach((track) => {
            track.stop();
        });
        pc.close();
        window.location.reload();
    }, [pc, stream]);

    useEffect(() => {
        socket.on("endCall", handleEndCall);

        return (() => {
            socket.off("endCall", handleEndCall);
        })
    }, [handleEndCall, socket]);

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

    const endCall = useCallback(async () => {

        const ans = await swal(`Do you want to end the call`, {
            buttons: ["No", "Yes"],
        });
        if (ans === true) {
            stream.getTracks().forEach((track) => {
                track.stop();
            });
            pc.close();
            socket.emit("endCall", otherSocketId);
            window.location.reload();
        }
    }, [otherSocketId, pc, socket, stream]);

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