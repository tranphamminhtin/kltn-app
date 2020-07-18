import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from './../../components/Context';
import OptionButton from '../../components/OptionButton';

export default function Account(props) {

    const onPress = (screenName) => () => {
        const { navigation } = props;
        navigation.navigate(screenName);
    }
    const { signOut } = React.useContext(AuthContext);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <OptionButton
                icon="info-circle"
                label="Sửa thông tin cá nhân"
                onPress={onPress('Information')}
            />
            <View style={{ backgroundColor: '#e9ebee', height: 3 }} />
            <OptionButton
                icon="key"
                label="Đổi mật khẩu"
                onPress={onPress('ChangePassword')}
            />
            <View style={{ backgroundColor: '#e9ebee', height: 3 }} />
            <OptionButton
                icon="sign-in"
                label="Log out"
                onPress={() => signOut()}
            />
            <View style={{ backgroundColor: '#e9ebee', height: 3 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 16,
    }
});