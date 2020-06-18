import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import FacilitiesListItem from '../../components/FacilitiesListItem';
import Modal from 'react-native-modal';

export default class ListFacilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facilities: [
                { id: 1, name: 'Bàn 1' },
                { id: 2, name: 'Bàn 2' },
                { id: 3, name: 'Bàn 3' },
                { id: 4, name: 'Bàn 4' },
                { id: 5, name: 'Bàn 5' },
                { id: 6, name: 'Bàn 6' },
                { id: 7, name: 'Bàn 7' },
                { id: 8, name: 'Bàn 8' }
            ]
        };
    }

    render() {
        const { navigation } = this.props;
        const { facilities } = this.state;
        return (
            <View>
                <FlatList data={facilities}
                    renderItem={({ item }) =>
                        <View>
                            <FacilitiesListItem
                                facilities={item}
                                onPress={() => navigation.navigate('DetailFacilities', {
                                    facilities: item,
                                    title: item.name,
                                })} />
                        </View>
                    }
                    keyExtractor={(item) => `${item.id}`}
                    contentContainerStyle={styles.container}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 4,
    }
});