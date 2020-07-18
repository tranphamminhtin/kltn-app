import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import OptionButton from '../components/OptionButton';
import { Input } from 'galio-framework';
import logo from './../assets/logo.png';

import { AuthContext } from './../components/Context';

function Login() {

    const [data, setData] = React.useState({
        email: '',
        password: ''
    });

    const onChangeEmailInput = event => {
        let value = event.nativeEvent.text;
        setData({
            ...data,
            email: value
        });
    }

    const onChangePasswordInput = event => {
        let value = event.nativeEvent.text;
        setData({
            ...data,
            password: value
        });
    }

    const onLogin = (email, password) => {
        signIn({ email, password });
    }

    const { signIn } = React.useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} resizeMode='stretch' />
            <Text style={styles.title}> LOGIN </Text>
            <View style={styles.form}>
                <Input placeholder="email" type='email-address'
                    value={data.email} onChange={onChangeEmailInput}
                    style={styles.input} right
                    icon="mail"
                    family="antdesign"
                    iconSize={18}
                    iconColor="black" />
                <Input placeholder="password" password
                    viewPass value={data.password} onChange={onChangePasswordInput}
                    style={styles.input} iconSize={18} />
            </View>
            <OptionButton
                icon="sign-in"
                label="Login"
                backgroundColor='#5c83ea'
                colorLabel='white'
                style={styles.option}
                onPress={() => onLogin(data.email, data.password)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    logo: {
        width: 120,
        height: 150,
        marginTop: 30,
        alignSelf: 'center'
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 10,
        fontWeight: '500'
    },
    form: {
        padding: 30,
        marginHorizontal: 10,
        borderRadius: 30,
    },
    input: {
        height: 50
    },
    option: {
        borderRadius: 30,
        width: '50%',
        marginLeft: '25%',
        marginTop: 20
    }
});

export default Login;
