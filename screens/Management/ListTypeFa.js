import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import BasicItem from '../../components/BasicItem';
import Modal from 'react-native-modal';
import { Input } from 'galio-framework';

const ACTION = {
    CREATE: 0,
    UPDATE: 1
}

export default class ListTypeFa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: [
                { id: 1, name: 'type 1' },
                { id: 2, name: 'type 2' },
                { id: 3, name: 'type 3' },
                { id: 4, name: 'type 4' },
                { id: 5, name: 'type 5' },
            ],
            isModalVisible: false,
            titleModal: 'This is title modal',
            actionModal: '',
            inputModal: ''
        };
    }

    onUpdate = (item) => () => {
        this.setState({
            titleModal: 'Update type',
            inputModal: item.name,
            isModalVisible: true,
            actionModal: ACTION.UPDATE
        })
        console.log('update type ' + item.id);
    }

    onRemove = (id) => () => {
        console.log('remove type ' + id);
    }

    onAdd = () => {
        this.setState({
            titleModal: 'Create new type',
            inputModal: '',
            isModalVisible: true,
            actionModal: ACTION.CREATE
        })
    }

    onSaveModal = () => {
        console.log(this.state.inputModal);
        this.setState({ isModalVisible: true });
    }

    render() {
        const { types, isModalVisible, titleModal, inputModal } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity activeOpacity={0.5} style={styles.addIcon} onPress={this.onAdd}>
                    <FontAwesomeIcon name='plus' size={35} color='white' />
                </TouchableOpacity>
                <FlatList data={types}
                    renderItem={({ item }) =>
                        <View>
                            <BasicItem
                                item={item}
                                onUpdate={this.onUpdate}
                                onRemove={this.onRemove} />
                        </View>
                    }
                    keyExtractor={(item) => `${item.id}`}
                    contentContainerStyle={styles.container}
                />
                <Modal isVisible={isModalVisible}>
                    <View style={styles.modal}>
                        <FontAwesomeIcon name='remove' size={35} color='red'
                            style={{ marginVertical: 5, marginLeft: 'auto' }}
                            onPress={() => this.setState({ isModalVisible: false })}
                        />
                        <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>{titleModal}</Text>
                        <Input
                            placeholder="Type"
                            color='black'
                            type='default'
                            style={{ width: 300, alignSelf: 'center', marginVertical: 10 }}
                            value={inputModal}
                            onChange={event => this.setState({ inputModal: event.nativeEvent.text })}
                        />
                        <TouchableOpacity onPress={this.onSaveModal}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginHorizontal: 95,
                                paddingVertical: 3,
                                borderRadius: 15,
                                marginBottom: 10,
                                backgroundColor: 'mediumseagreen',
                            }}
                        >
                            <FontAwesomeIcon name='save' size={35} />
                            <Text style={{ fontSize: 25 }}> Save</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 7,
    },
    addIcon: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 15,
        zIndex: 1,
        backgroundColor: 'gray',
        opacity: 0.7,
        borderRadius: 15,
        padding: 10,
    },
    modal: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderRadius: 20,
    }
});