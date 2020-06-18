import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import OptionButton from '../../components/OptionButton';

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onPress = (screenName) => () => {
        const { navigation } = this.props;
        navigation.navigate(screenName);
    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <OptionButton
                    icon="info-circle"
                    label="Sửa thông tin cá nhân"
                    onPress={this.onPress('Information')}
                />
                <View style={{ backgroundColor: '#e9ebee', height: 3 }} />
                <OptionButton
                    icon="key"
                    label="Đổi mật khẩu"
                    onPress={this.onPress('ChangePassword')}
                />
                <View style={{ backgroundColor: '#e9ebee', height: 3 }} />
                <OptionButton
                    icon="sign-in"
                    label="Log out"
                />
                <View style={{ backgroundColor: '#e9ebee', height: 3 }} />
            </ScrollView>
        );
    }
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