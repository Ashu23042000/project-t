import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Signup.module.css";
import * as api from "../../api";


const Signup = () => {



    const navigate = useNavigate();

    const [name, setName] = useState(null);
    const [email, setEmail] = useState("");
    const [level, setLevel] = useState("");
    const [profession, setProfession] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    async function submitForm(e) {
        e.preventDefault();

        const userDetails = {
            name, email, level, profession, password, confirmPassword
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
    }


    return (
        <>
            <Navbar menus={[{ title: "Home", link: "" }, { title: "Login", link: "login" }]} />
            <div className={styles.form}>
                <form>
                    <i className="fas fa-user-plus"></i>

                    <input type="text" className={styles.user_input} placeholder="Username" name="name" required onChange={(e) => setName(e.target.value)} />

                    <input type="email" className={styles.user_input} placeholder="Email" name="email" required onChange={(e) => setEmail(e.target.value)} />

                    <select name="level" className={styles.selectBox} required onChange={(e) => setLevel(e.target.value)}>
                        <option value="">Select Level</option>
                        <option value="Low">Low</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>

                    <select name="profession" className={styles.selectBox} required onChange={(e) => setProfession(e.target.value)}>
                        <option value="">Select Profession</option>
                        <option value="Student">Student</option>
                        <option value="Employee">Employee</option>
                        <option value="Other">Other</option>
                    </select>

                    <input type="password" className={styles.user_input} placeholder="Password" name="password"
                        required onChange={(e) => setPassword(e.target.value)} />

                    <input type="password" className={styles.user_input} placeholder="Confirm Password"
                        name="confirmPassword" required onChange={(e) => setConfirmPassword(e.target.value)} />

                    {
                        password.length >= 6 && confirmPassword.length >= 6 ?
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
