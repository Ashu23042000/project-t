import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Login.module.css";
import * as api from "../../api";


const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function submitForm(e) {
        e.preventDefault();
        const userDetails = {
            email,
            password
        }
        try {
            if (email !== "" && password !== "") {
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

                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(user));

                    swal(response.data.message, "", "success");
                    navigate("/people");
                    // window.location.reload();
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar menus={[{ title: "Home", link: "" }, { title: "Signup", link: "signup" }]} />

            <div className={styles.form}>
                <form >
                    <i className="fas fa-user-circle"></i>

                    <input type="email" className={styles.user_input} placeholder="Email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                    <input type="password" className={styles.user_input} placeholder="Password" name="password"
                        required value={password} onChange={(e) => setPassword(e.target.value)} />

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
