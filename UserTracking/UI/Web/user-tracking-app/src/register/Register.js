import React, {useState} from 'react';
import styles from "./Register.module.css";
import picture from "./register.jpg";
import {Link} from "react-router-dom";
import axios from "axios";
import urlConstants from "../helpers/urlConstants";

function Register() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const isValidEmail = () => {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    };


    const verify = () => {
        if (!isValidEmail()) alert("Email has to be valid!");
        else if (password !== confirmPass || password==="") {
            alert("Passwords do not match!");
        }
    };

    const register = async () => {
        const data = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password
        };

        verify();
        if (isValidEmail() && password === confirmPass && password!=="") {
        await axios
            .post(urlConstants.apiUrl + "/users/register", data)
            .then(() => {
                window.location="/";
            })
            .catch((err) => {
                console.log(err);
            });
    }}

    return (
        <div className={styles.app}>
            <div className={styles.registerContainer}>
                <div className={styles.registerContainerPicture}>
                    <img className={styles.registerPicture} src={picture} alt="register"/>
                </div>
                <div className={styles.registerContainerText}>
                    <div className={styles.TextHeader}>
                        Register
                    </div>
                    <div className={styles.inputArea}>
                        First name:
                        <input type="text" name="firstName" autoComplete="off" className={styles.inputText}
                               onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div className={styles.inputArea}>
                        Last name:
                        <input type="text" name="lastName" autoComplete="off" className={styles.inputText}
                               onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div className={styles.inputArea}>
                        Email:
                        <input type="text" name="email" autoComplete="off" className={styles.inputText}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className={styles.inputArea}>
                        Password:
                        <input type="password" name="password" className={styles.inputText}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className={styles.inputArea}>
                        Confirm password:
                        <input type="password" name="confirmPass" className={styles.inputText}
                               onChange={(e) => setConfirmPass(e.target.value)}/>
                    </div>
                    <Link to={"/"} className={styles.buttonBack}>
                        Back to Login
                    </Link>
                    <button type="button" className={styles.buttonRegister} onClick={register}>REGISTER</button>
                </div>
            </div>
        </div>
    );
}

export default Register;