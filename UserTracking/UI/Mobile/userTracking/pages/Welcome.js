import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default function Welcome({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../assets/logo.png")}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <View
                style={styles.footer}
            >
                <Text style={styles.title}>Stay connected with everyone!</Text>
                <View style={styles.buttonL}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}
                                      style={styles.buttonLogin}>
                        <Text style={styles.textLogin}>Login </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonR}>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.buttonRegister}>
                        <Text style={styles.textRegister}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#603247',
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    buttonLogin: {
        width: 120,
        height: 40,
        backgroundColor: '#603247',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    textLogin: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    buttonL: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    buttonRegister: {
        backgroundColor: '#fff',
    },
    textRegister: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#603247',
        textDecorationLine: 'underline'
    },
    buttonR: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
});