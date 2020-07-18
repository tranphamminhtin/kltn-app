import React, { Component } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';

import FacilitiesListItem from '../../components/FacilitiesListItemDistinct';
import AsyncStorage from '@react-native-community/async-storage';
import { getFacilitiesByManager } from '../../networking/FacilitiesAPI';

const STATESHOW = {
    Request: 'Request',
    Allocate: 'Allocate',
    Revoke: 'Revoke'
};

const filter = 0;

export default class All extends Component {
    constructor(props) {
        super(props);
        this.state = {
            right: 1,
            currentEmail: '',
            facilities: [],
            refreshing: false
        };
    }

    componentDidMount() {
        this.refreshFacilitiesFromServer();
    }

    getDataFromStorage = () => {
        AsyncStorage.getItem('right', (err, result) => {
            if (err) console.log(err);
            if (result) {
                this.setState({ right: JSON.parse(result) });
            }
        });
        AsyncStorage.getItem('email', (err, result) => {
            if (err) console.log(err);
            if (result) {
                this.setState({ currentEmail: result });
            }
        });
    }

    refreshFacilitiesFromServer = () => {
        const { stateShow } = this.props.route.params;
        this.setState({ refreshing: true });
        getFacilitiesByManager('null', stateShow)
            .then(facilities => {
                this.setState({
                    facilities: facilities,
                    refreshing: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    facilities: [],
                    refreshing: false
                });
            });
    }

    onRefresh = () => {
        this.refreshFacilitiesFromServer();
    }

    render() {
        const { stateShow } = this.props.route.params;
        const { navigation } = this.props;
        const { facilities, refreshing } = this.state;
        return (
            <FlatList data={facilities}
                renderItem={({ item }) =>
                    <View>
                        <FacilitiesListItem
                            facilities={item}
                            onPress={() => navigation.navigate('ListLoanFa', {
                                _id: item._id,
                                stateShow: stateShow,
                                filter: filter,
                                contentFilter: null
                            })} />
                    </View >
                }
                keyExtractor={(item) => `${item._id}`}
                contentContainerStyle={styles.container}
                refreshControl={< RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 4,
        paddingBottom: 100
    }
})
