import React, { useEffect, useRef, useContext } from 'react';
import { SocketContext } from "../../contexts/socketContext";

const Call = (props) => {

    const myId = props.myId;
    const from = props.from;
    const init = props.init;

    const socket = useContext(SocketContext);


    const myVideo = useRef();
    const remoteVideo = useRef();
    const _pc = useRef(new RTCPeerConnection({
        iceServers: [
            {
                urls: "stun:stun.stunprotocol.org"
            }
        ]
    }));

    const createAndSendOffer = async () => {
        const offer = await _pc.current.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
        await _pc.current.setLocalDescription(new RTCSessionDescription(offer));
        socket.emit("offer", { from: myId, to: from, offer });

    }

    const createAndSendAnswer = async ({ from, to, offer }) => {
        await _pc.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await _pc.current.createAnswer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
        await _pc.current.setLocalDescription(new RTCSessionDescription(answer));
        socket.emit("answer", { from: to, to: from, answer });
    }

    useEffect(() => {
        // const pc = new RTCPeerConnection();
        // _pc.current = pc;




        if (init) {
            createAndSendOffer();
        }

        _pc.current.onicecandidate = ((e) => {
            if (e.candidate) {
                let data = {
                    from: myId,
                    to: from,
                    candidate: e.candidate
                }
                socket.emit("candidate", data);
            }
        });



        // Listen for connectionstatechange on the local RTCPeerConnection
        _pc.current.addEventListener('connectionstatechange', event => {
            if (_pc.current.connectionState === 'connected') {
                console.log("Peer Connected");
                navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
                    myVideo.current.srcObject = stream;
                    stream.getTracks().forEach((track) => {
                        _pc.current.addTrack(track);
                    });
                }).catch(err => {
                    console.log(err);
                });
            }
        });


        socket.on("offer", ({ from, to, offer }) => {
            console.log(typeof (offer));
            createAndSendAnswer({ from, to, offer });
        });

        socket.on("answer", async ({ from, to, answer }) => {
            console.log(typeof (answer));
            _pc.current.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socket.on("candidate", (data) => {
            console.log(data.candidate);
            _pc.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        });

        _pc.current.ontrack = (e) => {
            console.log(e);
            if (e.streams[0]) {
                remoteVideo.current.srcObject = e.streams[0];
            }
        }

    });



    return (
        <div>Call

            <video autoPlay ref={myVideo} muted />
            <video autoPlay ref={remoteVideo} muted />


        </div>
    )
}

export default Call