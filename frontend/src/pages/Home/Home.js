import React, { useMemo } from 'react';
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.css";

const Home = () => {
    const isAuth = useMemo(() => {
        return sessionStorage.getItem("user") || false;
    }, []);

    const menu = useMemo(() => {
        return isAuth ? [{ title: "People", link: "people" }] : [{ title: "Login", link: "login" }, { title: "Signup", link: "signup" }];
    }, [isAuth]);

    return (
        <>
            <Navbar menus={menu} />
            <main className={styles.main}>
                <div className={styles.backImg}>
                    <img src="/images/home-bg.png" alt="background" />
                </div>
                <div className={styles.sideContent}>
                    <h1>Improve Your English</h1>
                    <p>Speak english fluently by doing practice of speaking english daily. Talk with a people through
                        live video call.</p>
                    <Link to="/people"><button>Start</button></Link>
                </div>
            </main>


            <Footer />
        </>
    )
}



export default Home;

