import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RectButton } from 'react-native-gesture-handler';
import domain from '../networking/domain';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import { updateLoan } from './../networking/LoanAPI';
import { searchFacilities } from './../networking/FacilitiesAPI';
import { searchRoom } from './../networking/RoomAPI';
import { searchUser } from './../networking/UserAPI';
import { searchUnit } from './../networking/UnitAPI';
import { getVoteByIdLoanFa } from './../networking/VoteAPI';

const STATESHOW = {
    Request: 'Request',
    Allocate: 'Allocate',
    Revoke: 'Revoke',
};

export default class LoanFaListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            right: 1,
            loan: null,
            facilities: null,
            room: null,
            manager: null,
            unit: null,
            isModalVisible: false,
            isDatePickerVisible: false,
            toDate: null,
            datePicker: new Date(),
            isShow: true,
            percentVote: 100
        };
    }

    componentDidMount() {
        const { loan } = this.props;
        this.getDataFromStorage().then(r => {
            this.setState({ loan }, () => {
                this.getFacilitiesFromServer();
                this.getRoomFromServer();
                this.getManagerFromServer();
                this.getUnitFromServer();
                this.getVoteFromServer();
            });
        });
    }

    getDataFromStorage = async () => {
        await AsyncStorage.getItem('right', (err, result) => {
            if (err) console.log(err);
            if (result) {
                this.setState({ right: JSON.parse(result) });
            }
        });
        return '';
    }

    getFacilitiesFromServer = () => {
        const id = this.state.loan?.facilities;
        if (id) {
            searchFacilities(id)
                .then(facilities => this.setState({ facilities }))
                .catch(err => {
                    console.log(err, 'getFa LoanFaListItem');
                    this.setState({ facilities: null });
                });
        }
    }

    getRoomFromServer = () => {
        const id = this.state.loan?.room;
        if (id) {
            searchRoom(id)
                .then(room => this.setState({ room }))
                .catch(err => {
                    console.log(err, 'getRoom LoanFaListItem');
                    this.setState({ room: null });
                });
        }
    }

    getUnitFromServer = () => {
        const id = this.state.loan?.unit;
        if (id) {
            searchUnit(id)
                .then(unit => this.setState({ unit }))
                .catch(err => {
                    console.log(err, 'getUnit LoanFaListItem');
                    this.setState({ unit: null });
                });
        }
    }

    getManagerFromServer = () => {
        const email = this.state.loan?.manager;
        if (email) {
            searchUser(email)
                .then(manager => this.setState({ manager }))
                .catch(err => {
                    console.log(err, 'getmanager LoanFaListItem');
                    this.setState({ manager: null });
                });
        }
    }

    getVoteFromServer = () => {
        const id = this.state.loan?._id;
        getVoteByIdLoanFa(id)
            .then(vote => this.setState({ percentVote: vote?.percent }))
            .catch(err => console.log(err));
    }

    getImage = () => {
        const { facilities } = this.state;
        const srcImage = facilities?.image.replace("http://localhost:3000", domain);
        return srcImage;
    }

    onAllocate = () => {
        let { loan } = this.state;
        loan.state = 0;
        loan.request = false;
        this.setState({ loan: loan }, () => {
            this.updateLoanFacilities();
        });
    }

    onRevoke = () => {
        let { loan } = this.state;
        loan.state = 1;
        loan.request = false;
        this.setState({ loan: loan }, () => {
            this.updateLoanFacilities();
        });
    }

    onRequest = () => {
        let { loan } = this.state;
        loan.to = this.state.toDate;
        loan.state = 0;
        loan.request = this.state.right === 1;
        this.setState({ loan: loan }, () => {
            this.updateLoanFacilities();
        });
    }

    updateLoanFacilities = () => {
        const { loan } = this.state;
        console.log(loan);
        const id = loan._id;
        updateLoan(id, loan)
            .then(flag => {
                alert('Thành công');
                this.setState({ isShow: false });
            })
            .catch(err => {
                console.log(err);
                alert('Thất bại');
            });
    }

    render() {
        const { onPress, stateShow } = this.props;
        const { facilities, room, manager, unit, isModalVisible, isDatePickerVisible, toDate, datePicker, isShow, right, percentVote }
            = this.state;
        return (
            <View>
                {isShow &&
                    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
                        <View style={styles.container}>
                            <Image style={styles.FacilitiesImage} source={{ uri: this.getImage() }} />
                            <View style={styles.description}>
                                <Text style={styles.title}>{facilities?.name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={{ fontSize: 15 }}>{unit?.name}</Text>
                                        <Text style={styles.manager}>{manager?.name}</Text>
                                        <Text style={{ fontSize: 15 }}>Tình trạng: {percentVote||100}%</Text>
                                    </View>
                                    <View style={{ marginLeft: 'auto' }}>
                                        <Text style={{ fontSize: 15 }} >{room?.name}</Text>
                                        {right === 0 &&
                                            <>
                                                {stateShow == STATESHOW.Request &&
                                                    <FontAwesomeIcon
                                                        name="check-square-o"
                                                        size={35}
                                                        color={'green'}
                                                        style={styles.button}
                                                        onPress={this.onAllocate}
                                                    />
                                                }
                                                {stateShow == STATESHOW.Allocate &&
                                                    <FontAwesomeIcon
                                                        name="external-link"
                                                        size={35}
                                                        color={'red'}
                                                        style={styles.button}
                                                        onPress={this.onRevoke}
                                                    />
                                                }
                                                {stateShow == STATESHOW.Revoke &&
                                                    <FontAwesomeIcon
                                                        name="save"
                                                        size={35}
                                                        color={'blue'}
                                                        style={styles.button}
                                                        onPress={() => this.setState({ isModalVisible: true })}
                                                    />
                                                }
                                            </>
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
                <Modal isVisible={isModalVisible}>
                    <View style={modalStyles.container}>
                        <FontAwesomeIcon name='remove' size={35} color='red'
                            style={{ marginVertical: 5, marginLeft: 'auto' }}
                            onPress={() => this.setState({ isModalVisible: false, isDatePickerVisible: false })}
                        />
                        <View style={{ backgroundColor: 'gray', height: 1, marginBottom: 3 }} />
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
                        <TouchableOpacity onPress={this.onRequest}
                            style={modalStyles.buttonSave}
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
        fontSize: 20,
        fontWeight: 'bold'
    },
    description: {
        marginLeft: 20,
        paddingTop: 5,
        flex: 1
    },
    manager: {
        marginVertical: 5,
        fontSize: 15
    },
    button: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 'auto',
    },
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
    },
    buttonSave: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 95,
        paddingVertical: 3,
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: 'mediumseagreen',
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