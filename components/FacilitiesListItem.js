import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Swipeout from 'react-native-swipeout';
import SwipeoutSetting from './SwipeoutDelete';
import { RectButton } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { Input } from 'galio-framework';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import TV from '../assets/tv.jpg';
import moment from 'moment';

export default class FacilitiesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeId: null,
            isModalVisible: false,
            toDate: null,
            datePicker: new Date(),
            isDatePickerVisible: false,
            managers: [
                { id: 1, email: 'asd1@gmail', name: 'name 1' },
                { id: 2, email: 'asd2@gmail', name: 'name 2' },
                { id: 3, email: 'asd3@gmail', name: 'name 3' },
                { id: 4, email: 'asd4@gmail', name: 'name 4' },
                { id: 5, email: 'asd5@gmail', name: 'name 5' }
            ],
            rooms: [
                { id: 1, name: 'room 1' },
                { id: 2, name: 'room 2' },
                { id: 3, name: 'room 3' },
                { id: 4, name: 'room 4' },
                { id: 5, name: 'room 5' }
            ],
            units: [
                { id: 1, name: 'unit 1' },
                { id: 2, name: 'unit 2' },
                { id: 3, name: 'unit 3' },
                { id: 4, name: 'unit 4' },
                { id: 5, name: 'unit 5' }
            ]
        };
    }

    OpenSwipe = () => {
        this.setState({ activeId: this.props.facilities.id });
    }

    Delete = () => {
        console.log(this.state.activeId);
    }

    onSaveRequest = () => {
        console.log(1)
        this.setState({ isModalVisible: false });
    }

    render() {
        const { facilities, onPress } = this.props;
        const { isModalVisible, rooms, units, managers, toDate, datePicker, isDatePickerVisible } = this.state;
        return (
            <View>
                <Swipeout {...SwipeoutSetting(facilities.id, facilities.name, this.OpenSwipe, this.Delete)}>
                    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
                        <View style={styles.container}>
                            <Image style={styles.FacilitiesImage} source={TV} />
                            <View style={styles.description}>
                                <Text style={styles.title}>{facilities.name}</Text>
                                <Text>Type</Text>
                                <Text style={{ color: '#a1a1a1', marginTop: 7 }}>Quantity</Text>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => this.setState({ isModalVisible: true })}>
                                    <RectButton style={styles.buttonRequest}>
                                        <FontAwesomeIcon name='inbox' size={25} />
                                        <Text style={{ fontSize: 18, paddingTop: 3 }}> Cấp phát</Text>
                                    </RectButton>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Swipeout>
                <Modal isVisible={isModalVisible}>
                    <View style={modalStyles.container}>
                        <FontAwesomeIcon name='remove' size={35} color='red'
                            style={{ marginVertical: 5, marginLeft: 'auto' }}
                            onPress={() => this.setState({ isModalVisible: false, isDatePickerVisible: false })}
                        />
                        <View style={{ backgroundColor: 'gray', height: 1, marginBottom: 3 }} />
                        <Text style={{ fontSize: 17 }}>Manager</Text>
                        <RNPickerSelect
                            placeholder={{ label: 'Select a room' }}
                            onValueChange={(value) => console.log(value)}
                            items={managers.map(manager => {
                                var obj = {};
                                obj.label = manager.name;
                                obj.value = manager.email;
                                return obj;
                            })}
                            style={pickerSelectStyles}
                            Icon={() => <FontAwesomeIcon name='chevron-down' size={30} color={'#a1a1a1'} />}
                        />
                        <Text style={{ fontSize: 17 }}>Room</Text>
                        <RNPickerSelect
                            placeholder={{ label: 'Select a room' }}
                            onValueChange={(value) => console.log(value)}
                            items={rooms.map(room => {
                                var obj = {};
                                obj.label = room.name;
                                obj.value = room.id;
                                return obj;
                            })}
                            style={pickerSelectStyles}
                            Icon={() => <FontAwesomeIcon name='chevron-down' size={30} color={'#a1a1a1'} />}
                        />
                        <Text style={{ fontSize: 17 }}>Unit</Text>
                        <RNPickerSelect
                            placeholder={{ label: 'Select a unit' }}
                            onValueChange={(value) => console.log(value)}
                            items={units.map(unit => {
                                var obj = {};
                                obj.label = unit.name;
                                obj.value = unit.id;
                                return obj;
                            })}
                            style={pickerSelectStyles}
                            Icon={() => <FontAwesomeIcon name='chevron-down' size={30} color={'#a1a1a1'} />}
                        />
                        <Text style={{ fontSize: 17 }}>To date:</Text>
                        <RectButton
                            style={modalStyles.inputToDate}
                            onPress={() => this.setState({ isDatePickerVisible: true })}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>{toDate === null ? 'Select a date' : moment(toDate).format('DD/MM/YYYY')}</Text>
                                <View style={{ marginLeft: 'auto' }}>
                                    <FontAwesomeIcon name="calendar" size={20} />
                                </View>
                            </View>
                        </RectButton>
                        <View style={{ backgroundColor: 'gray', height: 1, marginVertical: 10 }} />
                        <TouchableOpacity onPress={this.onSaveRequest}
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
                    {isDatePickerVisible &&
                        <View style={pickerDateStyles.container}>
                            <Text
                                onPress={() => { this.setState({ isDatePickerVisible: false, toDate: this.state.datePicker }) }}
                                style={pickerDateStyles.confirm}>
                                Comfirm
                            </Text>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={datePicker}
                                mode={'date'}
                                display="default"
                                onChange={(event, selectedDate) => {
                                    this.setState({ datePicker: selectedDate, toDate: selectedDate });
                                }}
                                style={{ height: 150 }}
                            />
                        </View>
                    }
                </Modal>
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
    },
    buttonRequest: {
        marginLeft: 'auto',
        marginRight: 3,
        flexDirection: 'row',
        backgroundColor: '#3fccc5',
        padding: 5,
        borderRadius: 10
    }
});
const modalStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderRadius: 20,
        zIndex: 1,
    },
    inputToDate: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 5,
        height: 45,
        justifyContent: 'center',
        borderWidth: 2,
        padding: 8,
        marginTop: 4
    }
});
const pickerDateStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        bottom: 0,
        borderRadius: 10,
        marginTop: 4
    },
    confirm: {
        alignSelf: 'flex-end',
        fontSize: 15,
        marginRight: 10,
        color: 'blue',
        marginTop: 10,
        fontSize: 15
    }
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginVertical: 10,
        fontSize: 18,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        marginVertical: 10,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 15,
        right: 10,
    },
});