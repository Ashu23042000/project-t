import React from 'react';
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <>
            <footer>
                <div className={styles.footer_block}>
                    <Link to="#">
                        <i className="fab fa-facebook-square"></i>
                    </Link>
                    <Link to="#">
                        <i className="fab fa-instagram"></i>
                    </Link>
                    <Link to="#">
                        <i className="fab fa-twitter-square"></i>
                    </Link>
                    <Link to="#">
                        <i className="fab fa-linkedin"></i>
                    </Link>
                </div>
            </footer>
        </>
    )
}

export default Footer
