import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.css";



const Home = () => {
    const isAuth = localStorage.getItem("user") || false;
    return (
        <>
            {isAuth
                ?
                < Navbar menus={[{ title: "People", link: "people" }]} />
                :
                < Navbar menus={[{ title: "Login", link: "login" }, { title: "Signup", link: "signup" }]} />
            }
            {/* <main className={styles.main}>
                <div className={styles.backImg}>
                    <img src="/images/video-chat.png" alt="background" />
                </div>
                <div className={styles.sideContent}>
                    <h1>Improve Your English</h1>
                    <p>You can speak english fluently by doing practice of speaking english daily. Talk with a people through
                        live video call.</p>
                    <Link to="/people"><button>Start</button></Link>
                </div>
            </main> */}


            <Footer />
        </>
    )
}



export default Home;
