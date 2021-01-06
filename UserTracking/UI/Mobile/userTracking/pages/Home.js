import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, AsyncStorage, Image, TouchableOpacity, Switch} from 'react-native';
import axios from "axios";
import urlConstants from "../helpers/urlConstants";
import * as Location from 'expo-location';


export default function Home() {

    const [tokenID, setTokenID] = useState('');
    const [username, setUsername] = useState('');
    useEffect(() => {
        const retrieveData = async () => {
            const tokenId = await AsyncStorage.getItem('tokenID');
            setTokenID(tokenId);
            const username = await AsyncStorage.getItem('username');
            setUsername(username);
        };
        retrieveData();
    }, []);

    const [switchValue, setSwitchValue] = useState(false);

    const toggleSwitch = (value) => {
        setSwitchValue(value);
        if (value === true) {
            console.log("start");
            componentDidMount()
        }
        else {
            console.log("stop");
            componentWillUnmount();
        }
    };

    const [timeout, setTimeout] = useState(0);

    const componentDidMount=()=> {
        setTimeout(setInterval(e => sendLocationNow(), 10000));//600000));//10 min
    }
    const componentWillUnmount=()=> {
        clearInterval(timeout);
    }

    const sendLocationNow = async () => {

        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
        }
        let p = await Location.getCurrentPositionAsync({});

        const location = {
            latitude: p.coords.latitude,
            longitude: p.coords.longitude,
            startDate: new Date(),
            endDate: new Date(),
            userID: tokenID
        };

        axios.post( urlConstants.apiUrl + "/locations/newLocation", location).then(response => response.data)
                .catch((err) => {
                    console.log(err);
                });

        alert("The location has been sent");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hi {username}!</Text>
            <TouchableOpacity style={styles.button} onPress={sendLocationNow}>
                <Text style={styles.buttonT}>Send location now</Text>
            </TouchableOpacity>
            <Image
                source={require("../assets/location.png")}
                style={styles.location}
                resizeMode="stretch"
            />
            <View style={styles.button}>
                <Text style={styles.buttonT}>Automatically send</Text>
                <Switch
                    style={styles.switch}
                    onValueChange={toggleSwitch}
                    value={switchValue}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#603247',
    },
    title: {
        marginTop: 100,
        marginLeft: 30,
        marginBottom: 60,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff'
    },
    location: {
        marginTop: 20,
        marginLeft: 100,
        width: 180,
        height: 180
    },
    button: {
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 40,
        width: 300,
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    buttonT: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    switch: {
        marginLeft: 30
    }
});