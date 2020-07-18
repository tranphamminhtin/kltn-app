import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import OptionButton from '../../components/OptionButton';

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            right: 1
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('right', (err, result) => {
            if (err) console.log(err);
            if (result) {
                this.setState({ right: JSON.parse(result) });
            }
        });
    }

    onPress = (screenName) => () => {
        const { navigation } = this.props;
        navigation.navigate(screenName, {
            stateShow: 'Request'
        });
    }

    render() {
        const { right } = this.state;
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
                {right === 0 &&
                    <>
                        <OptionButton
                            icon="group"
                            label="Tìm kiếm theo người quản lý"
                            onPress={this.onPress('ByManager')}
                        />
                        <View style={{ backgroundColor: '#e9ebee', height: 3 }} />
                    </>
                }
            </ScrollView>
        );
    }
}

export default Request;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 16,
    }
});