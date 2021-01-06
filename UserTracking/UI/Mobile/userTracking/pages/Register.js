import React from 'react';
import * as Animatable from 'react-native-animatable';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";
import urlConstants from "../helpers/urlConstants";

export default function Register({ navigation }) {

    const [user, setUser] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const register = async () => {
        const data = {
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            password: user.password
        };
        if(user.firstName && user.lastName && user.email && user.password) {
            axios.post( urlConstants.apiUrl + "/users/register", data).then(response => response.data)
                .catch((err) => {
                    console.log(err);
                });
            navigation.navigate('Login');
        }
        else {
            alert("All fields are required!");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Register</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#000000"
                        size={22}/>
                    <TextInput
                        placeholder="First name"
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={(val) => setUser({
                            ...user,
                            firstName: val,
                        })}
                    />
                </View>
                <View style={[styles.action, {marginTop: 35}]}>
                    <FontAwesome
                        name="user-o"
                        color="#000000"
                        size={22}/>
                    <TextInput
                        placeholder="Last name"
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={(val) => setUser({
                            ...user,
                            lastName: val,
                        })}
                    />
                </View>
                <View style={styles.action}>
                    <Fontisto
                        name="email"
                        color="#000000"
                        size={22}/>
                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={(val) => setUser({
                            ...user,
                            email: val,
                        })}
                    />
                </View>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        size={20}
                    />
                    <TextInput
                        placeholder="Password"
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={(val) => setUser({
                            ...user,
                            password: val,
                        })}
                    />
                </View>
                <View style={styles.buttonV}>
                    <TouchableOpacity onPress={register}
                                      style={styles.button}>
                        <Text style={styles.buttonT}>Register</Text>
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
        paddingBottom: 40,
        paddingHorizontal: 20
    },
    footer: {
        flex: 3,
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
        marginTop: 30,
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