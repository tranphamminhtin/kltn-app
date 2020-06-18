import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Swipeout from 'react-native-swipeout';
import SwipeoutSetting from './SwipeoutDelete';
import { RectButton } from 'react-native-gesture-handler';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import TV from '../assets/tv.jpg';

export default class LoanFaListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeId: null
        };
    }

    OpenSwipe = () => {
        this.setState({ activeId: this.props.facilities.id });
    }

    Delete = () => {
        console.log(this.state.activeId);
    }

    onAllocate = () => {

    }

    onRevoke = () => {

    }

    onRequest = () => {

    }

    render() {
        const { facilities, onPress, stateShow } = this.props;
        return (
            <Swipeout {...SwipeoutSetting(facilities.id, facilities.name, this.OpenSwipe, this.Delete)}>
                <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
                    <View style={styles.container}>
                        <Image style={styles.FacilitiesImage} source={TV} />
                        <View style={styles.description}>
                            <Text style={styles.title}>Name</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Text style={{ fontSize: 15 }}>Unit</Text>
                                    <Text style={styles.manager}>Manager</Text>
                                </View>
                                <View style={{ marginLeft: 'auto' }}>
                                    <Text style={{ fontSize: 15 }} >Room</Text>
                                    {stateShow == 'Request' &&
                                        <FontAwesomeIcon
                                            name="check-square-o"
                                            size={35}
                                            color={'green'}
                                            style={styles.button}
                                            onPress={this.onAllocate}
                                        />
                                    }
                                    {stateShow == 'Allocate' &&
                                        <FontAwesomeIcon
                                            name="external-link"
                                            size={35}
                                            color={'red'}
                                            style={styles.button}
                                            onPress={this.onRevoke}
                                        />
                                    }
                                    {stateShow == 'Revoke' &&
                                        <FontAwesomeIcon
                                            name="save"
                                            size={35}
                                            color={'blue'}
                                            style={styles.button}
                                            onPress={this.onRequest}
                                        />
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 5,
        borderRadius: 4,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        marginBottom: 3,
        flexDirection: 'row',
    },
    FacilitiesImage: {
        width: 100,
        height: 100
    },
    title: {
        textTransform: "uppercase",
        marginBottom: 8,
        fontSize: 20,
        fontWeight: 'bold'
    },
    description: {
        marginLeft: 20,
        paddingTop: 5,
        flex: 1
    },
    manager: {
        marginVertical: 5,
        fontSize: 15
    },
    button: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 'auto',
    },
});
