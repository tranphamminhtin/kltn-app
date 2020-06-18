import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import OptionButton from '../../components/OptionButton';

export default class Management extends Component {
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
                    icon="university"
                    label="Quản lý phòng"
                    onPress={this.onPress('Room')}
                />
                <View style={{ backgroundColor: '#e9ebee', height: 3 }} />
                <OptionButton
                    icon="th-large"
                    label="Quản lý đơn vị"
                    onPress={this.onPress('Unit')}
                />
                <View style={{ backgroundColor: '#e9ebee', height: 3 }} />
                <OptionButton
                    icon="pie-chart"
                    label="Quản lý loại thiết bị"
                    onPress={this.onPress('TypeFa')}
                />
                <View style={{ backgroundColor: '#e9ebee', height: 3 }} />
                <OptionButton
                    icon="address-book"
                    label="Quản lý người dùng"
                    onPress={this.onPress('User')}
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
