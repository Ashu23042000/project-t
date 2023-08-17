import { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import styles from "./People.module.css";
import Navbar from "../../components/Navbar/Navbar";
import swal from "sweetalert";
import { SocketContext } from "../../contexts/socketContext";
import Call from '../Call/Call';

const People = () => {

    useEffect(() => {
        document.title = "People";
    }, []);

    const [users, setUsers] = useState();
    const [startCall, setStartCall] = useState(false)
    const [myId, setMyId] = useState();
    const [from, setFrom] = useState();
    const [init, setInit] = useState(true);

    const user = useMemo(() => {
        return JSON.parse(localStorage.getItem("user"));
    }, []);

    const socket = useContext(SocketContext);

    const handleCallRequest = useCallback(async ({ from, to, name }) => {
        const ans = await swal(`${name} wants to talk with you.`, {
            buttons: ["Reject", "Accept"],
        });

        socket.emit("call_reply", { from: to, to: from, ans });
        if (ans) {
            setInit(false);
            setFrom(from);
            setStartCall(true);
        }
    }, [socket]);

    const handleConnection = useCallback(() => {
        setMyId(socket.id);
        socket.emit("new_user", user);
    }, [socket, user]);

    const handleConnectedUsers = useCallback((data) => {
        setUsers(data);
    }, []);

    const handleCallReply = useCallback(({ from, to, ans }) => {
        if (ans) {
            setFrom(from);
            setStartCall(true)
        } else {
            swal("Rejected", {
                buttons: "Ok",
            });
        }
    }, []);

    useEffect(() => {
        socket.on("connect", handleConnection);
        socket.on("connected_users", handleConnectedUsers);
        socket.on("call_reply", handleCallReply);
        socket.on("call_request", handleCallRequest);

        return (() => {
            socket.off("connect", handleConnection);
            socket.off("connected_users", handleConnectedUsers);
            socket.off("call_reply", handleCallReply);
            socket.off("call_request", handleCallRequest);
        });

    }, [handleCallReply, handleCallRequest, handleConnectedUsers, handleConnection, socket, user]);



    const makeCall = useCallback((id, name) => {
        socket.emit("call_request", { from: myId, to: id, name });
        swal("Call Request Sent", {
            buttons: "Ok",
        });
    }, [myId, socket]);


    return (
        <>
            <Navbar menus={[]} />
            {!startCall ?
                <div className={styles.users_grid}>
                    {
                        users && users.map((value) => {
                            return (value[1].id !== user.id ?
                                //  return (

                                < div className={styles.users} key={value[0]}>
                                    <h2>{value[1].name}</h2>
                                    <div>
                                        <span>
                                            {value[1].profession}
                                        </span>
                                        <span>
                                            {value[1].level}
                                        </span>
                                    </div>
                                    <button className={styles.callBtn} onClick={() => makeCall(value[0], value[1].name)}>
                                        <span>Start Conversation</span>
                                    </button>
                                </div>
                                : null);
                            //  )
                        })
                    }
                </div> : <Call otherId={from} myId={myId} init={init} />
            }
        </>
    )
};




export default People;

