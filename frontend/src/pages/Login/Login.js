import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Login.module.css";
import * as api from "../../api";

const menu = [{ title: "Home", link: "" }, { title: "Signup", link: "signup" }];

const Login = () => {

    useEffect(() => {
        document.title = "Login";
    }, []);

    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const [password, setPassword] = useState("");

    const submitForm = useCallback(async (e) => {
        e.preventDefault();
        const userDetails = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        try {
            if (userDetails.email !== "" && userDetails.password !== "") {
                const response = await api.login(userDetails);

                if (response.isError) {
                    swal(response.error.response.data.message, "Try again", "error");
                } else {

                    const user = {
                        id: response.data.user.id,
                        name: response.data.user.name,
                        level: response.data.user.level,
                        profession: response.data.user.profession,
                        reportCount: response.data.user.reportCount
                    };


                    localStorage.setItem("user", JSON.stringify(user));

                    swal(response.data.message, "", "success");
                    navigate("/people");
                }
            }

        } catch (error) {
            console.log(error);
        }
    }, [navigate]);


    return (
        <>
            <Navbar menus={menu} />

            <div className={styles.form}>
                <form >
                    <i className="fas fa-user-circle"></i>

                    <input type="email" className={styles.user_input} placeholder="Email" name="email" required ref={emailRef} />
                    <input type="password" className={styles.user_input} placeholder="Password" name="password" ref={passwordRef} onChange={(e) => { setPassword(e.target.value) }}
                        required />

                    <div className={styles.option_1}>
                        <Link to="/forgot-password">Forgot Password</Link>
                    </div>

                    {
                        password.length >= 6 ?
                            <button type="submit" className={styles.btn} onClick={submitForm}>Login</button> :
                            <button type="submit" className={` ${styles.disable}`} onClick={submitForm}
                                disabled>Login</button>
                    }



                    <div>
                        <p>Not Registered?<Link to="/signup" className={styles.option_2}> Create an Account</Link></p>
                    </div>
                </form>
            </div>
            {/* <Footer /> */}
        </>
    )
}








export default Login;
