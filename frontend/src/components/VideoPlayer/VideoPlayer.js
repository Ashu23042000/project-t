import React from 'react'
import styles from "../VideoPlayer/VideoPlayer.module.css";
const Videoplayer = (props) => {
    return (
        <div className={styles.section1}>
            <div className={styles.stream_section}>
                <div className={styles.myStream}>
                    <video ref={props.localStream} autoPlay muted />
                </div>
                <div className={styles.otherStream}>
                    <video ref={props.remoteStream} autoPlay muted />
                </div>
            </div>
            <div className={styles.menus}>
                <i className="fas fa-microphone mikeon" />

                <i className="fa fa-microphone-slash mikeoff " />

                <i className="fas fa-video videoon" />
                <i className="fas fa-video-slash videooff" />
            </div>
            <button className={styles.endCall}>End Call</button>
            <button className={styles.report_user}>Report</button>
        </div>
    )
}

export default Videoplayer