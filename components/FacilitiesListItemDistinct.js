import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import domain from '../networking/domain';

import { searchType } from './../networking/TypeAPI';

export default class FacilitiesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            right: 0,
            type: null
        };
    }

    componentDidMount() {
        this.getTypeFromServer();
    }

    getTypeFromServer = () => {
        const { facilities } = this.props;
        searchType(facilities.type)
            .then(type => this.setState({ type }))
            .catch(err => {
                console.log(err);
                this.setState({ type: null });
            });
    }

    getImage = () => {
        const { facilities } = this.props;
        const srcImage = facilities?.image.replace("http://localhost:3000", domain);
        return srcImage || '';
    }

    render() {
        const { facilities, onPress } = this.props;
        const { type } = this.state;
        return (
            <View>
                <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
                    <View style={styles.container}>
                        <Image style={styles.FacilitiesImage} source={{uri: this.getImage()}} />
                        <View style={styles.description}>
                            <Text style={styles.title}>{facilities.name}</Text>
                            <Text>{type?.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
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
        fontSize: 21,
        fontWeight: '600'
    },
    description: {
        marginLeft: 20,
        paddingTop: 5,
        flex: 1
    }
});