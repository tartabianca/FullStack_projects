import React, {useEffect, useRef, useState} from 'react';
import styles from "./MapPage.module.css";
import {Header} from "../header/Header";
import axios from "axios";
import urlConstants from "../../helpers/urlConstants";
import search from "./search.svg"
import Modal from "./modal/Modal";
import picture2 from "../myProfile/close.png";
import UserList from "./cards/UserList";
import {Card, Calendar} from 'react-rainbow-components';
import ok from "./ok.png"
import finish from "./finish.png"
import GoogleMapReact from 'google-map-react';
import mapLoc from "./mapLoc.jpg"

function MapPage() {

    const [email, setEmail] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const updateModal = useRef();
    const searchUsers = async () => {
        updateModal.current.openModal();
    };
    const closeModal = async () => {
        updateModal.current.close();
    };

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchCards = async () => {
            setLoading(true);
            let result = await axios.get(urlConstants.apiUrl + "/user/getAllUsers")
            let user = result.data;
            setUsers(user);
            setLoading(false);
        }
        fetchCards();
    }, []);

    const [state, setState] = useState([])
    const getDate = async () => {
        if (state.date === undefined)
            alert("Choose the date!")
        else {
            let d = state.date;
            let mnth = ("0" + (d.getMonth() + 1)).slice(-2),
                day = ("0" + d.getDate()).slice(-2);
            let date = [mnth, day, d.getFullYear()].join("/");
            document.getElementById("1").value = date;
            setStartDate(date);
        }
    }

    const getDate2 = async () => {
        if (state.date === undefined)
            alert("Choose the date!")
        else {
            let d = state.date;
            let mnth = ("0" + (d.getMonth() + 1)).slice(-2),
                day = ("0" + d.getDate()).slice(-2);
            let date = [mnth, day, d.getFullYear()].join("/");
            document.getElementById("2").value = date;
            setEndDate(date);
        }
    }

    const [locs, setLocs] = useState([])
    const searchOnMap = async () => {
        if (email && startDate && endDate) {
            let userID;
            for (let i = 0; i < users.length; i++)
                if (users[i].email === email)
                    userID = users[i].tokenID

            let result = await axios.post(urlConstants.apiUrl + "/location/filter?startDate=" + startDate + "&endDate=" + endDate + "&userID=" + userID)
            let locations = result.data;
            setLocs(locations);
        } else {
            alert("All fields are required!");
        }
    }

    const Marker = () => {
        if (locs.length > 0) {
            return (
                <div>
                    <img className={styles.mapLoc} src={mapLoc} alt={"marker"}/>
                </div>);
        } else
            return (<div/>);
    };

    const props = {
        center: {
            lat: 46.150835,
            lng: 24.333331,
        },
        zoom: 15
    };

    return (
        <div className={styles.app}>
            <Header/>
            <div className={styles.mapPage}>
                <div className={styles.buttonsArea}>
                    <div className={styles.selectUser}>
                        User email:
                        <div className={styles.searchEmail}>
                            <input type="text" name="email" className={styles.email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                            <img className={styles.search} src={search} alt="search" onClick={searchUsers}/>
                        </div>
                    </div>
                    <div className={styles.selectDate}>
                        Start date:
                        <input id="1" type="text" name="date" className={styles.date1}/>
                        <img className={styles.search} src={ok} alt="search" onClick={getDate}/>
                    </div>
                    <div className={styles.selectDate}>
                        End date:
                        <input id="2" type="text" name="date" className={styles.date2}/>
                        <img className={styles.search} src={ok} alt="search" onClick={getDate2}/>
                    </div>
                    <div>
                        <Card className={styles.calendarContainer}>
                            <Calendar
                                id="calendar-1"
                                locale="en-US"
                                value={state.date}
                                onChange={value => setState({date: value})}
                                className={styles.calendar}
                            />
                        </Card>
                    </div>
                    <img className={styles.finishSearch} src={finish} alt="close" onClick={searchOnMap}/>
                    <Modal ref={updateModal}>
                        <img className={styles.closeModal} src={picture2} alt="close" onClick={closeModal}/>
                        <UserList
                            users={users}
                            loading={loading}
                        />
                    </Modal>
                </div>
                <div className={styles.mapArea}>
                    <div id="a1" style={{height: '100%', width: '100%'}}>
                        <GoogleMapReact
                            //bootstrapURLKeys={{ key: "" }}
                            defaultCenter={props.center}
                            defaultZoom={props.zoom}
                        >

                            {locs.length>0 ? (
                                <Marker
                                    lat={locs[0].latitude}
                                    lng={locs[0].longitude}
                                />
                            ) : (
                                <Marker
                                    lat={0}
                                    lng={0}
                                />
                            )}
                            {locs.length>1 ? (
                                <Marker
                                    lat={locs[1].latitude}
                                    lng={locs[1].longitude}
                                />
                            ) : (
                                <Marker/>
                            )}
                            {locs.length>2 ? (
                                <Marker
                                    lat={locs[2].latitude}
                                    lng={locs[2].longitude}
                                />
                            ) : (
                                <Marker/>
                            )}
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MapPage;