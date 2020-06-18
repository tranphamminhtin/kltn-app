import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import OptionButton from '../../components/OptionButton';

class Allocate extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onPress = (screenName) => () => {
        const { navigation } = this.props;
        navigation.navigate(screenName, {
            stateShow: 'Allocate'
        });
    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <OptionButton
                    icon="list-ul"
                    label="Tất cả"
                    onPress={this.onPress('All')}
                />
                <View style={{ backgroundColor: '#e9ebee', height: 3 }} />
                <OptionButton
                    icon="university"
                    label="Tìm kiếm theo phòng"
                    onPress={this.onPress('ByRoom')}
                />
                <View style={{ backgroundColor: '#e9ebee', height: 3 }} />
                <OptionButton
                    icon="group"
                    label="Tìm kiếm theo người quản lý"
                    onPress={this.onPress('ByManager')}
                />
                <View style={{ backgroundColor: '#e9ebee', height: 3 }} />
            </ScrollView>
        );
    }
}

export default Allocate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 16,
    }
});