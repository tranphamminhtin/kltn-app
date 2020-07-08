import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';

import { getListType } from './../../networking/TypeAPI';

export default class Facilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: [
                { _id: 1, name: 'type 1' },
                { _id: 2, name: 'type 2' },
                { _id: 3, name: 'type 3' },
                { _id: 4, name: 'type 4' },
                { _id: 5, name: 'type 5' },
            ],
            refreshing: false
        };
    }

    componentDidMount() {
        this.refreshFacilitiesTypeFromServer();
    }

    refreshFacilitiesTypeFromServer = () => {
        this.setState({ refreshing: true });
        getListType()
            .then(types => {
                this.setState({
                    types: types,
                    refreshing: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    types: [],
                    refreshing: false
                });
            });
    }

    onRefresh = () => {
        this.refreshFacilitiesTypeFromServer();
    }

    onPress = (type) => () => {
        const { navigation } = this.props;
        navigation.navigate('ListFacilities', {
            typeId: type._id,
            title: type.name,
        });
    }

    render() {
        const { types, refreshing } = this.state;
        return (
            <FlatList data={types}
                renderItem={({ item }) =>
                    <View>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.onPress(item)}>
                            <View style={styles.typeContainer}>
                                <Text style={styles.name}>{item?.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
                keyExtractor={(item) => `${item?._id}`}
                contentContainerStyle={styles.container}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
        paddingBottom: 100
    },
    typeContainer: {
        paddingVertical: 20,
        paddingLeft: 30,
        borderRadius: 20,
        backgroundColor: '#e9ebee',
        shadowColor: '#FFF',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        marginBottom: 8,
        flexDirection: 'row'
    },
    name: {
        fontSize: 22,
        alignSelf: 'center',
    },
});