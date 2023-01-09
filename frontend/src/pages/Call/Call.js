import React, { useState, useEffect, useContext, useRef, useCallback, useMemo } from 'react';
import styles from "../Call/Call.module.css";
import Videoplayer from "../../components/VideoPlayer/VideoPlayer";
import { SocketContext } from "../../contexts/socketContext";
import SideBar from '../../components/SideBar/SideBar';

const Call = ({ myId, otherId, init }) => {
    const socket = useContext(SocketContext);


    const [local_stream, setLocal_stream] = useState();
    const localStream = useRef();
    const remoteStream = useRef();
    const _pc = useMemo(() => {
        return new RTCPeerConnection();
    }, []);

    const createAndSendAnswer = useCallback(async ({ from, to, offer }) => {
        _pc.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await _pc.createAnswer();
        _pc.setLocalDescription(new RTCSessionDescription(answer));

        socket.emit("answer", { from: myId, to: otherId, answer });
    }, [_pc, myId, otherId, socket]);

    const createAndSendOffer = useCallback(async () => {

        const offer = await _pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });

        socket.emit("offer", { from: myId, to: otherId, offer });

        _pc.setLocalDescription(new RTCSessionDescription(offer));

    }, [_pc, myId, otherId, socket]);

    const handleOffer = useCallback((data) => {
        navigator.mediaDevices.getUserMedia({
            audio: true, video: {
                width: { min: 1024, ideal: 1280, max: 1920 },
                height: { min: 576, ideal: 720, max: 1080 },
            }
        }).then(async (stream) => {
            localStream.current.srcObject = stream;
            setLocal_stream(stream);
            stream.getTracks().forEach((track) => {
                _pc.addTrack(track, stream);
            });
            createAndSendAnswer(data);

        }).catch((err) => {
            console.log(err);
        });
    }, [_pc, createAndSendAnswer]);

    const handleAnswer = useCallback(async (data) => {
        _pc.setRemoteDescription(new RTCSessionDescription(data.answer));
    }, [_pc]);

    const handleCandidate = useCallback((data) => {
        _pc.addIceCandidate(new RTCIceCandidate(data.candidate));
    }, [_pc]);

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
        // const pc = _pc.current;

        if (init) {
            navigator.mediaDevices.getUserMedia({
                audio: true, video: {
                    width: { min: 1024, ideal: 1280, max: 1920 },
                    height: { min: 576, ideal: 720, max: 1080 },
                }
            }).then((stream) => {
                setLocal_stream(stream);
                localStream.current.srcObject = stream;
                stream.getTracks().forEach((track) => {
                    _pc.addTrack(track, stream);
                });

                createAndSendOffer()
            }).catch((err) => {
                console.log(err);
            });
        }

        _pc.addEventListener("icecandidate", handleIceCandidate);
        _pc.addEventListener("track", handleStream);
        return (() => {
            _pc.removeEventListener("track", handleStream);
            _pc.removeEventListener("icecandidate", handleIceCandidate);
        });

    }, [_pc, createAndSendOffer, handleIceCandidate, handleStream, init, myId, otherId, socket]);



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
            <Videoplayer stream={local_stream} localStream={localStream} remoteStream={remoteStream} pc={_pc} />
            <SideBar />
        </div>
    )
}

export default Call