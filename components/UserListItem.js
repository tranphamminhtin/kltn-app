import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class UserListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { user, onUpdate, onRemove } = this.props;
        return (
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.email}>{user.email}</Text>
                    </View>
                    <View style={styles.icon}>
                        <FontAwesomeIcon
                            name="wrench"
                            size={35}
                            color={'blue'}
                            onPress={onUpdate(user)}
                        />
                        <FontAwesomeIcon
                            name="trash-o"
                            size={35}
                            color={'red'}
                            style={{ marginLeft: 12 }}
                            onPress={onRemove(user.email)}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

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
    },
    email: {
        fontSize: 18,
        color: '#a1a1a1',
    },
    icon: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center'
    }
});