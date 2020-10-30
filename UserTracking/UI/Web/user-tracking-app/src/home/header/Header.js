import React from 'react';
import styles from "./Header.module.css";
import picture from "./home.png";
import {Link} from "react-router-dom";

export function Header() {
    let user = localStorage.getItem("firstName");

    return (
        <div className={styles.header}>
            <img className={styles.headerPicture} src={picture} alt="header"/>
            <div className={styles.userName}>
                {user}
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