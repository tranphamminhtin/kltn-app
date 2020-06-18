import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class BasicItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { item, onUpdate, onRemove } = this.props;
        return (
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.container}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.icon}>
                        <FontAwesomeIcon name="wrench" size={35} color={'blue'} onPress={onUpdate(item)} />
                        <FontAwesomeIcon name="trash-o" size={35} color={'red'} style={{ marginLeft: 12 }} onPress={onRemove(item.id)} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default BasicItem;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#e9ebee',
        shadowColor: '#FFF',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        marginBottom: 3,
        flexDirection: 'row',
    },
    name: {
        fontSize: 22,
        alignSelf: 'center',
    },
    icon: {
        marginLeft: 'auto',
        flexDirection: 'row',
    }
});