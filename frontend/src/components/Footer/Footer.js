import React from 'react';
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <>
            <footer>
                <div className={styles.footer_block}>
                    <a href="https://www.facebook.com/people/Talkrs/61550274603516/" target="_blank" rel="noreferrer">
                        <i className="fab fa-facebook-square"></i>
                    </a>
                    <a href="https://www.instagram.com/talkrs.online/" target="_blank" rel="noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                    {/* <Link to="#">
                        <i className="fab fa-twitter-square"></i>
                    </Link> */}
                    <a href="https://www.linkedin.com/company/talkrs-online" target="_blank" rel="noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
            </footer>
        </>
    )
}

export default Footer
