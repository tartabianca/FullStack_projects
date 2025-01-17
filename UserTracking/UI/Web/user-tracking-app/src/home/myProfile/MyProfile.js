import React, {useEffect, useRef, useState} from "react";
import styles from "./MyProfile.module.css";
import {Header} from "../header/Header";
import axios from "axios";
import urlConstants from "../../helpers/urlConstants";
import picture from "./logout.png";
import picture2 from "./close.png";
import Modal from "./modal/Modal";

function MyProfile() {

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
                    setFirstName(res.firstname);
                    setLastName(res.lastname);
                    setEmail(res.email);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        currentUser();
    }, []);

    const deleteAccount = async () => {
        const tokenID = localStorage.getItem("userID")
        await axios.delete(urlConstants.apiUrl + "/users/delete?tokenID=" + tokenID)
        localStorage.clear();
        window.location = "/";
    };

    const logout = async () => {
        localStorage.clear();
        window.location = "/";
    };

    const updateModal = useRef();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const updateAccount = async () => {
        updateModal.current.openModal();
    };

    const finishUpdate = async () => {
        const data = {

            tokenID: user.tokenID,
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password

        };
        await axios.put(urlConstants.apiUrl + "/users/update",data)
        window.location="/profile"
    };

    const closeModal = async () => {
        updateModal.current.close();
    };

    return (
        <div className={styles.app}>
            <Header/>
            <div className={styles.profilePage}>
                <div className={styles.details}>
                    <div className={styles.detailsTitle}>
                        User details
                    </div>
                    <div className={styles.detailsTab}>
                        First name: &nbsp; {user.firstname}
                    </div>
                    <div className={styles.detailsTab}>
                        Last name: &nbsp; {user.lastname}
                    </div>
                    <div className={styles.detailsTab}>
                        Email: &nbsp; {user.email}
                    </div>
                    <div className={styles.buttons}>
                        <button type="button" className={styles.button}
                                onClick={updateAccount}>
                            Update account
                        </button>
                        <button type="button" className={styles.button} onClick={deleteAccount}>
                            Delete account
                        </button>
                    </div>
                    <img className={styles.logout} src={picture} alt="logout" onClick={logout}/>
                </div>
                <Modal ref={updateModal}>
                    <div className={styles.modal}>
                        <div className={styles.TextHeader}>
                            Update account
                        </div>
                        <div className={styles.inputArea}>
                            First name:
                            <input type="text" name="firstName" autoComplete="off" className={styles.inputText}
                                   onChange={(e) => setFirstName(e.target.value)}
                                   placeholder={user.firstname}>
                            </input>
                        </div>
                        <div className={styles.inputArea}>
                            Last name:
                            <input type="text" name="lastName" autoComplete="off" className={styles.inputText}
                                   onChange={(e) => setLastName(e.target.value)}
                                   placeholder={user.lastname}
                            />
                        </div>
                        <div className={styles.inputArea}>
                            Email:
                            <input type="text" name="email" autoComplete="off" className={styles.inputText}
                                   onChange={(e) => setEmail(e.target.value)}
                                   placeholder={user.email}
                            />
                        </div>
                        <div className={styles.inputArea}>
                            Password:
                            <input type="password" name="password" className={styles.inputText}
                                   onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputArea}>
                            Confirm password:
                            <input type="password" name="confirmPass" className={styles.inputText}/>
                        </div>
                        <button type="button" className={styles.buttonRegister} onClick={finishUpdate}>UPDATE</button>
                        <img className={styles.close} src={picture2} alt="close" onClick={closeModal}/>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default MyProfile;