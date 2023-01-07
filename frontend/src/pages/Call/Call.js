import React, { useEffect, useContext, useRef, useCallback } from 'react';
import styles from "../Call/Call.module.css";
import Videoplayer from "../../components/VideoPlayer/VideoPlayer";
import { SocketContext } from "../../contexts/socketContext";
import SideBar from '../../components/SideBar/SideBar';

const Call = ({ myId, otherId, init }) => {
    const socket = useContext(SocketContext);

    const localStream = useRef();
    const remoteStream = useRef();
    const _pc = useRef(new RTCPeerConnection());

    console.log("outside call useEffect");


    const createAndSendAnswer = useCallback(async ({ from, to, offer }) => {
        _pc.current.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await _pc.current.createAnswer();
        _pc.current.setLocalDescription(new RTCSessionDescription(answer));

        socket.emit("answer", { from: myId, to: otherId, answer });
    }, [myId, otherId, socket]);

    const createAndSendOffer = useCallback(async () => {

        const offer = await _pc.current.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });

        socket.emit("offer", { from: myId, to: otherId, offer });

        _pc.current.setLocalDescription(new RTCSessionDescription(offer));

    }, [myId, otherId, socket]);

    const handleOffer = useCallback((data) => {
        navigator.mediaDevices.getUserMedia({
            audio: true, video: {
                width: { min: 1024, ideal: 1280, max: 1920 },
                height: { min: 576, ideal: 720, max: 1080 },
            }
        }).then(async (stream) => {
            localStream.current.srcObject = stream;

            stream.getTracks().forEach((track) => {
                _pc.current.addTrack(track, stream);
            });
            createAndSendAnswer(data);

        }).catch((err) => {
            console.log(err);
        });
    }, [createAndSendAnswer]);

    const handleAnswer = useCallback(async (data) => {
        _pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
    }, []);

    const handleCandidate = useCallback((data) => {
        _pc.current.addIceCandidate(new RTCIceCandidate(data.candidate));
    }, []);

    const handleStream = useCallback((e) => {
        if (e.streams) {
            remoteStream.current.srcObject = e.streams[0];
        }
    }, []);

    const handleIceCandidate = useCallback((e) => {
        if (e.candidate) {
            socket.emit("candidate", { from: myId, to: otherId, candidate: e.candidate });
        }
    }, [myId, otherId, socket]);

    useEffect(() => {
        console.log("In call useEffect");
        const pc = _pc.current;

        if (init) {
            navigator.mediaDevices.getUserMedia({
                audio: true, video: {
                    width: { min: 1024, ideal: 1280, max: 1920 },
                    height: { min: 576, ideal: 720, max: 1080 },
                }
            }).then((stream) => {
                localStream.current.srcObject = stream;

                stream.getTracks().forEach((track) => {
                    _pc.current.addTrack(track, stream);
                });

                createAndSendOffer()
            }).catch((err) => {
                console.log(err);
            });
        }

        pc.addEventListener("icecandidate", handleIceCandidate);
        pc.addEventListener("track", handleStream);

        return (() => {
            pc.removeEventListener("track", handleStream);
            pc.removeEventListener("icecandidate", handleIceCandidate);

        });

    }, [createAndSendOffer, handleIceCandidate, handleStream, init, myId, otherId, socket]);



    useEffect(() => {

        socket.on("offer", handleOffer);
        socket.on("answer", handleAnswer);
        socket.on("candidate", handleCandidate);

        return (() => {
            socket.off("offer", handleOffer);
            socket.off("answer", handleAnswer);
            socket.off("candidate", handleCandidate);
        });

    }, [handleAnswer, handleCandidate, handleOffer, socket]);



    return (
        <div className={styles.main}>
            <Videoplayer localStream={localStream} remoteStream={remoteStream} />
            <SideBar />
        </div>
    )
}

export default Call