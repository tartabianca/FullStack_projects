import React, {useEffect, useState} from 'react';
import styles from "./MapPage.module.css";
import {Header} from "../header/Header";
import axios from "axios";
import urlConstants from "../../helpers/urlConstants";
import {Card, Calendar} from 'react-rainbow-components';
import ok from "./ok.png"
import finish from "./finish.png"
import GoogleMapReact from 'google-map-react';
import mapLoc from "./mapLoc.jpg"
import Dropdown from "react-dropdown"

function MapPage() {

    const [email, setEmail] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [users, setUsers] = useState([])
    const [usersEmail, setUsersEmails] = useState([])
    const [locs, setLocs] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            let result = await axios.get(urlConstants.apiUrl + "/users")
            let user = result.data;
            let emails=[];
            for(let i=0;i<user.length;i++)
                emails.push(user[i].email.toString())
            setUsersEmails(emails);
            setUsers(user);
        }
        getUsers();
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

    const searchOnMap = async () => {
        if (email && startDate && endDate) {
            let userID;
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === email)
                    userID = users[i].tokenID
            }
            let result = await axios.get(urlConstants.apiUrl + "/locations/filter?startDate=" + startDate + "&endDate=" + endDate + "&userID=" + userID)
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
                        User email: &nbsp; &nbsp; &nbsp;
                        <div className={styles.searchEmail}>
                            {(usersEmail.length>0) ?
                            <Dropdown
                                className={styles.dropdown}
                                options={usersEmail}
                                onChange={(e) => setEmail(e.value.toString())}
                                placeholder="Select user  ▼"
                            >
                            </Dropdown>
                                : null}
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
                </div>
                <div className={styles.mapArea}>
                    <div id="a1" style={{height: '100%', width: '100%'}}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyD488tM6svNIFaNsYhKUW3tcB6ewNnwdmw" }}
                            defaultCenter={props.center}
                            defaultZoom={props.zoom}
                        >

                            {locs.length>0 ? (
                                <Marker
                                    lat={locs[0].latitude}
                                    lng={locs[0].longitude}
                                />
                            ) :
                                null
                            }
                            {locs.length>1 ? (
                                <Marker
                                    lat={locs[1].latitude}
                                    lng={locs[1].longitude}
                                />
                            ) :
                                null
                            }
                            {locs.length>2 ? (
                                <Marker
                                    lat={locs[2].latitude}
                                    lng={locs[2].longitude}
                                />
                            ) :
                                null
                            }
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MapPage;