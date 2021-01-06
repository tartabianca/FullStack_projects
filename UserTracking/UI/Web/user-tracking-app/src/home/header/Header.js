import React, {useEffect, useState} from 'react';
import styles from "./Header.module.css";
import picture from "./home.png";
import {Link} from "react-router-dom";
import axios from "axios";
import urlConstants from "../../helpers/urlConstants";

export function Header() {

    const [user, setUser] = useState([]);

    useEffect(() => {
        const currentUser = async () => {
            const data = localStorage.getItem("userID");
            let res = {
                user: {}
            };
            await axios
                .get(urlConstants.apiUrl + "/users/me?tokenID=" + data)
                .then((response) => {
                    res = response.data;
                    setUser(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        currentUser();
    }, []);

    return (
        <div className={styles.header}>
            <img className={styles.headerPicture} src={picture} alt="header"/>
            <div className={styles.userName}>
                {user.firstname+" "+user.lastname}
            </div>
            <div className={styles.navBar}>
                <Link to={"/profile"} className={styles.navTab}>
                    <div className={styles.navTab}>
                    My profile
                    </div>
                </Link>
                <Link to={"/map"} >
                    <div className={styles.navTab}>
                        Map
                    </div>
                </Link>
            </div>
        </div>
    );
}