import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Signup.module.css";
import * as api from "../../api";

const menu = [{ title: "Home", link: "" }, { title: "Login", link: "login" }];
const Signup = () => {

    useEffect(() => {
        document.title = "Signup";
    }, []);

    const navigate = useNavigate();

    const name = useRef();
    const email = useRef();
    const level = useRef();
    const profession = useRef();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const submitForm = useCallback(async (e) => {
        e.preventDefault();

        const userDetails = {
            name: name.current.value,
            email: email.current.value,
            level: level.current.value,
            profession: profession.current.value,
            password,
            confirmPassword
        }

        try {
            const response = await api.signup(userDetails);

            if (response.isError) {
                swal(response.error.response.data.message, "Try again", "error");
            } else {
                swal(response.data.message, "", "success");
                navigate("/login");
            }

        } catch (error) {
            console.log(error);
        }
    }, [confirmPassword, email, level, name, navigate, password, profession]);


    return (
        <>
            <Navbar menus={menu} />
            <div className={styles.form}>
                <form>
                    <i className="fas fa-user-plus"></i>

                    <input type="text" className={styles.user_input} placeholder="Username" name="name" required ref={name} />

                    <input type="email" className={styles.user_input} placeholder="Email" name="email" required ref={email} />

                    <select name="level" className={styles.selectBox} required ref={level}>
                        <option value="">Select Level</option>
                        <option value="Begineer">Begineer</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                    </select>

                    <select name="profession" className={styles.selectBox} required ref={profession}>
                        <option value="">Select Profession</option>
                        <option value="Student">Student</option>
                        <option value="Working professional">Working professional</option>
                        <option value="Other">Other</option>
                    </select>

                    <input type="password" className={styles.user_input} placeholder="Password" name="password"
                        required onChange={(e) => setPassword(e.target.value)} />

                    <input type="password" className={styles.user_input} placeholder="Confirm Password"
                        name="confirmPassword" required onChange={(e) => setConfirmPassword(e.target.value)} />

                    {
                        password.length >= 6 && confirmPassword.length >= 6 && password === confirmPassword ?
                            <button type="submit" className={styles.btn} onClick={submitForm}>Signup</button> :
                            <button type="submit" className={` ${styles.disable}`} onClick={submitForm}
                                disabled>Signup</button>
                    }

                    <div>
                        <p>Already Registered? <Link to="/login" className={styles.option_2}>Login</Link></p>
                    </div>
                </form>
            </div>

        </>
    )
}





export default Signup;
