import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./People.module.css";
import Navbar from "../../components/Navbar/Navbar";
import swal from "sweetalert";
import { SocketContext } from "../../contexts/socketContext";











const People = () => {


    const navigate = useNavigate();
    const [users, setUsers] = useState();
    const [myId, setMyId] = useState();
    const user = JSON.parse(localStorage.getItem("user"));


    const socket = useContext(SocketContext);
    useEffect(() => {

        socket.on("connect", () => {
            console.log(`Socket Id ${socket.id} connected...`);
            setMyId(socket.id);
            socket.emit("new_user", user);
        });

        socket.on("connected_users", (data) => {
            setUsers(data);
        });

        socket.on("call_reply", ({ from, to, ans }) => {
            if (ans) {
                navigate(`/call/${to}/${from}/true`);
            } else {
                swal("Rejected", {
                    buttons: "Ok",
                });
            }
        });

        socket.on("call_request", async ({ from, to, name }) => {

            const ans = await swal(`${name} wants to talk with you.`, {
                buttons: ["Reject", true],
            });

            socket.emit("call_reply", { from: to, to: from, ans });
            if (ans) {
                navigate(`/call/${to}/${from}/false`);
            }
        });

    });


    const makeCall = (id, name) => {
        socket.emit("call_request", { from: myId, to: id, name });
    };


    return (
        <>
            <Navbar menus={[]} />
            <div className={styles.users_grid}>
                {
                    users && users.map((value) => {
                        return (value[1].id !== user.id ?
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
                    })
                }
            </div>
        </>
    )
};




export default People;

