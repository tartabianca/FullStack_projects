import React, {useState} from "react";
import axios from "axios";
import urlConstants from "../helpers/urlConstants";
import styles from "./Login.module.css";
import picture from "./login.png";
import {Link} from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isValidEmail = () => {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    };

    const verify = () => {
        if (!isValidEmail()) alert("Email has to be valid!");
    };

    const login = async () => {
        let ok=false;
        const data = {
            email: email,
            password: password
        };
        let res = {
            user: {}
        };

        verify();

        await axios
            .post(urlConstants.apiUrl + "/users/login", data)
            .then((response) => {
                res = response.data;
                if(res==="" && isValidEmail()) {
                    alert("Incorrect email or password!");
                }
                else{
                    if(isValidEmail() && res){
                        ok=true;
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
        localStorage.setItem("userID", res.tokenID);
        if(ok)
            window.location="/profile";

    };

return (
    <div className={styles.app}>
        <div className={styles.loginContainer}>
            <div className={styles.loginContainerText}>
                <div className={styles.TextHeader}>
                    User Login
                </div>
                <div className={styles.inputArea}>
                    Email:
                    <input type="text" name="email" className={styles.email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={styles.inputArea}>
                    Password:
                    <input type="password" name="password" className={styles.password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="button" className={styles.buttonSubmit} onClick={login}>
                    SUBMIT
                </button>
                <Link to={"/register"} className={styles.buttonRegister}>
                    Register
                </Link>
            </div>
            <div className={styles.loginContainerPicture}>
                <img className={styles.loginPicture} src={picture} alt="login"/>
            </div>
        </div>
    </div>
);
}

export default Login;