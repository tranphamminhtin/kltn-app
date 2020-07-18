import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import moment from 'moment';
import domain from '../networking/domain';
import AsyncStorage from '@react-native-community/async-storage';

import { createLoan } from './../networking/LoanAPI';
import { searchType } from './../networking/TypeAPI';
import { getListUser, searchUser } from './../networking/UserAPI';
import { getListRoom } from './../networking/RoomAPI';

export default class FacilitiesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            right: 1,
            currentEmail: '',
            currentUnit: '',
            isModalVisible: false,
            toDate: null,
            datePicker: new Date(),
            isDatePickerVisible: false,
            type: null,
            managers: [],
            rooms: [],
            manager: null,
            room: null,
            facilities: null
        };
    }

    componentDidMount() {
        this.setState({ facilities: this.props.facilities });
        this.getDataFromStorage().then(r => {
            this.getTypeFromServer();
        });

    }

    getDataFromStorage = async () => {
        await AsyncStorage.getItem('right', (err, result) => {
            if (err) console.log(err);
            if (result) {
                this.setState({ right: JSON.parse(result) });
            }
        });
        await AsyncStorage.getItem('email', (err, result) => {
            if (err) console.log(err);
            if (result) {
                this.setState({ currentEmail: result });
            }
        });
        return '';
    }

    getTypeFromServer = () => {
        const { facilities } = this.props;
        if (facilities.type) {
            searchType(facilities.type)
                .then(type => this.setState({ type }))
                .catch(err => {
                    console.log(err);
                    this.setState({ type: null });
                });
        }
    }

    getManagersFromServer = () => {
        getListUser()
            .then(users => {
                const managers = users.filter(user => user.right === 1);
                this.setState({ managers });
            })
            .catch(err => {
                console.log(err);
                this.setState({ managers: [] });
            });
    }

    getRoomsFromServer = () => {
        getListRoom()
            .then(rooms => this.setState({ rooms }))
            .catch(err => {
                console.log(err);
                this.setState({ rooms: [] });
            });
    }

    searchManagerFromServer = () => {
        const { currentEmail } = this.state;
        searchUser(currentEmail)
            .then(manager => {
                this.setState({ managers: [], currentUnit: manager?.unit });
            })
            .catch(err => {
                console.log(err);
                this.setState({ managers: [] });
            });
    }

    getImage = () => {
        const { facilities } = this.props;
        if (facilities?.image) {
            const srcImage = facilities?.image.replace("http://localhost:3000", domain);
            return srcImage;
        }
        return null;
    }

    onShowModalRequest = () => {
        const { right } = this.state;
        if (right === 0) {
            this.getManagersFromServer();
        } else {
            this.searchManagerFromServer();
        }
        this.getRoomsFromServer();
        this.setState({ isModalVisible: true });
    }

    onSaveRequest = () => {
        this.setState({ isModalVisible: false });
        const { manager, managers, right, currentEmail, currentUnit } = this.state;
        let email = '';
        let unit = '';
        if (right === 0) {
            email = manager;
            unit = managers.find(m => m.email === manager)?.unit;
        } else {
            email = currentEmail;
            unit = currentUnit;
        }
        let { facilities } = this.state;
        let loan = {
            facilities: this.props.facilities._id,
            room: this.state.room,
            unit: unit,
            manager: email,
            from: Date.now(),
            to: this.state.toDate,
            state: 0,
            request: this.state.right === 1
        }
        createLoan(loan)
            .then(flag => {
                alert('Thành công');
                facilities.quantity = facilities.quantity - 1;
                this.setState({ facilities });
            })
            .catch(err => {
                console.log(err);
                alert('Thất bại');
            });
    }

    render() {
        const { onPress } = this.props;
        const { isModalVisible, type, rooms, managers, toDate, datePicker, isDatePickerVisible, manager, room, facilities, right }
            = this.state;
        const image = this.getImage();
        return (
            <View>
                <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
                    <View style={styles.container}>
                        {image &&
                            <Image style={styles.FacilitiesImage} source={{ uri: image }} />
                        }
                        <View style={styles.description}>
                            <Text style={styles.title}>{facilities?.name}</Text>
                            <Text>Loại: {type?.name}</Text>
                            <Text style={{ color: '#a1a1a1', marginTop: 7 }}>Số lượng: {facilities?.quantity}</Text>
                            <TouchableOpacity activeOpacity={0.5} onPress={this.onShowModalRequest}>
                                <RectButton style={styles.buttonRequest}>
                                    <FontAwesomeIcon name='inbox' size={25} />
                                    <Text style={{ fontSize: 18, paddingTop: 3 }}> Cấp phát</Text>
                                </RectButton>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
                <Modal isVisible={isModalVisible}>
                    <View style={modalStyles.container}>
                        <FontAwesomeIcon name='remove' size={35} color='red'
                            style={{ marginVertical: 5, marginLeft: 'auto' }}
                            onPress={() => this.setState({ isModalVisible: false, isDatePickerVisible: false })}
                        />
                        <View style={{ backgroundColor: 'gray', height: 1, marginBottom: 3 }} />
                        {right === 0 &&
                            <>
                                <Text style={{ fontSize: 17 }}>Manager</Text>
                                <RNPickerSelect
                                    placeholder={{ label: 'Select a room' }}
                                    value={manager}
                                    onValueChange={(value) => this.setState({ manager: value })}
                                    items={managers.map(manager => {
                                        var obj = {};
                                        obj.label = manager.name;
                                        obj.value = manager.email;
                                        return obj;
                                    })}
                                    style={pickerSelectStyles}
                                    Icon={() => <FontAwesomeIcon name='chevron-down' size={30} color={'#a1a1a1'} />}
                                />
                            </>
                        }
                        <Text style={{ fontSize: 17 }}>Room</Text>
                        <RNPickerSelect
                            placeholder={{ label: 'Select a room' }}
                            value={room}
                            onValueChange={(value) => this.setState({ room: value })}
                            items={rooms.map(room => {
                                var obj = {};
                                obj.label = room.name;
                                obj.value = room._id;
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
        paddingRight: 30,
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
        paddingRight: 30,
    },
    iconContainer: {
        top: 15,
        right: 10,
    },
});