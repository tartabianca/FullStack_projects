import React from 'react';
import * as Animatable from 'react-native-animatable';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import { AsyncStorage } from 'react-native';
import urlConstants from "../helpers/urlConstants";

export default function Login({ navigation }) {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        secureTextEntry: true,
        isValidUser: false,
        isValidPassword: false
    });

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 3 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const isValidEmail = (val) => {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val);
    };

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 && isValidEmail(val)) {
            setData({
                ...data,
                email: val,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

     const storeData = async (tokenID,firstName) => {
            await AsyncStorage.setItem('tokenID',tokenID);
            await AsyncStorage.setItem('username',firstName);
    };

    const login = async () => {
        const dta = {
            email: data.email,
            password: data.password
        };
        let res = {
            user: {tokenID: "", firstname: "", lastname: "", email: "", password: ""}
        };
        if(data.isValidUser && data.isValidPassword) {
            axios.post( urlConstants.apiUrl + "/users/login", dta).then(response => response.data)
                .then((data) => {
                    res = data;
                    if (res == "") {
                        alert("Incorrect email or password!");
                    }
                    else{
                        storeData(res.tokenID,res.firstname);
                        navigation.navigate('Home');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
         }
        else {
            alert("Incorrect email or password!");
        }
    }

return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Login</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                    name="user"
                    color="#000000"
                    size={22}/>
                    <TextInput
                    placeholder="Your Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={(val) => handleValidUser(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    {data.isValidUser ?
                        <View
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </View>
                        : null}
                </View>
                <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                        onEndEditing={(e)=>handlePasswordChange(e.nativeEvent.text)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-slash"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonV}>
                    <TouchableOpacity style={styles.button} onPress={login}>
                        <Text style={styles.buttonT}>Login</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#603247',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 50,
        paddingHorizontal: 20
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 30
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff'
    },
    text_footer:{
        fontSize: 20
    },
    action: {
        flexDirection: 'row',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
        fontSize: 16
    },
    button:{
        width: 140,
        height: 40,
        backgroundColor: '#603247',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    buttonV: {
        marginTop: 100,
        alignItems: 'center'
    },
    buttonT: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
});