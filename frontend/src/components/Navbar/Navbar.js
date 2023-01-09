import React, { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = (props) => {

    useEffect(() => {
        console.log("Navbar")
    }, []);

    const navigate = useNavigate();
    console.log("Navbar")

    const [toggle, settoggle] = useState(false);

    const showMenu = useCallback(() => {
        settoggle(!toggle);
    }, [toggle]);

    const user = useMemo(() => {
        return JSON.parse(sessionStorage.getItem("user")) || false;
    }, []);

    const logoutFun = useCallback(async () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        navigate("/login");
    }, [navigate]);

    return (
        <>
            <div className={styles.navbar}>
                <div className={`container ${styles.navbar_wraper}`}>
                    <div className={styles.brand}>
                        <h2><Link to="/">ASHAPP</Link></h2>
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
