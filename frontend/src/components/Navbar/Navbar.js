import React, { useState, memo, useCallback, useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = (props) => {

    const navigate = useNavigate();

    const [toggle, settoggle] = useState(false);

    const showMenu = useCallback(() => {
        settoggle(!toggle);
    }, [toggle]);

    const user = useMemo(() => {
        return JSON.parse(localStorage.getItem("user")) || false;
    }, []);

    const logoutFun = useCallback(async () => {
        localStorage.removeItem("user");
        navigate("/login");
        window.location.reload();
    }, [navigate]);

    return (
        <>
            <div className={styles.navbar}>
                <div className={`container ${styles.navbar_wraper}`}>
                    <div className={styles.brand}>
                        <h1><Link to="/">talkrs</Link></h1>
                    </div>
                    <div className={styles.navMenu}>
                        <ul>
                            {props.menus.map((menu, i) => { return (<li key={i}><Link to={`/${menu.link}`}>{menu.title}</Link></li>) })}

                            {user ? <li> <button className={styles.logoutBtn} onClick={logoutFun}>Logout</button></li> : null}
                        </ul>
                    </div>

                    <div className={`${styles.hamburger} ${toggle ? styles.show : null}`} onClick={showMenu} >
                        <i className={`fal fa-bars ${styles.hamburger_img}`}></i>
                    </div>
                </div>
            </div>

            <div className={`${styles.hamburger_navMenu} ${toggle ? styles.show : null}`}  >
                <ul>
                    {props.menus.map((menu, i) => { return (<li key={i}><Link to={`/${menu.link}`}>{menu.title}</Link></li>) })}
                    {user ? <button className={styles.logoutBtn} onClick={logoutFun}>Logout</button> : null}
                </ul>
            </div>
        </>
    )
}




export default memo(Navbar);
