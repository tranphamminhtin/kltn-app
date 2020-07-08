import React, { Component } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import FacilitiesListItem from '../../components/FacilitiesListItem';

import { getListFacilities } from './../../networking/FacilitiesAPI';

export default class ListFacilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facilities: [
                { _id: 1, name: 'Bàn 1' },
                { _id: 2, name: 'Bàn 2' },
                { _id: 3, name: 'Bàn 3' },
                { _id: 4, name: 'Bàn 4' },
                { _id: 5, name: 'Bàn 5' },
                { _id: 6, name: 'Bàn 6' },
                { _id: 7, name: 'Bàn 7' },
                { _id: 8, name: 'Bàn 8' }
            ],
            typeId: '',
            refreshing: false
        };
    }

    componentDidMount() {
        const { typeId } = this.props.route.params;
        this.setState({ typeId }, () => {
            this.refreshFacilitiesFromServer();
        })
    }

    refreshFacilitiesFromServer = () => {
        this.setState({ refreshing: true });
        const {typeId} = this.state;
        getListFacilities()
            .then(facilities => {
                const arrFa = facilities.filter(fa => fa.type === typeId);
                this.setState({
                    facilities: arrFa,
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
        const { navigation } = this.props;
        const { facilities, refreshing } = this.state;
        return (
            <View>
                <FlatList data={facilities}
                    renderItem={({ item }) =>
                        <View>
                            <FacilitiesListItem
                                facilities={item}
                                onPress={() => navigation.navigate('DetailFacilities', {
                                    _id: item._id,
                                    title: item.name,
                                })} />
                        </View>
                    }
                    keyExtractor={(item) => `${item._id}`}
                    contentContainerStyle={styles.container}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 4,
        paddingBottom: 100
    }
});