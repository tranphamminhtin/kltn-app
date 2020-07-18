import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Input } from 'galio-framework';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RectButton } from 'react-native-gesture-handler';
import OptionButton from '../../components/OptionButton';
import Modal from 'react-native-modal';
import moment from 'moment';
import domain from '../../networking/domain';
import AsyncStorage from '@react-native-community/async-storage';
import { getListUser } from './../../networking/UserAPI';
import { getListRoom } from './../../networking/RoomAPI';
import { searchLoan, updateLoan } from './../../networking/LoanAPI';
import { searchFacilities } from './../../networking/FacilitiesAPI';
import { getVoteByIdLoanFa, updateVote, createVote } from './../../networking/VoteAPI';

const LABELSTATE = {
  Approve: 'Duyệt',
  Allocate: 'Cấp phát',
  Revoke: 'Thu hồi'
}
export default class DetailLoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      right: 1,
      currentEmail: '',
      managers: [],
      rooms: [],
      units: [],
      percent: [
        { label: '10%', value: 10 },
        { label: '20%', value: 20 },
        { label: '30%', value: 30 },
        { label: '40%', value: 40 },
        { label: '50%', value: 50 },
        { label: '60%', value: 60 },
        { label: '70%', value: 70 },
        { label: '80%', value: 80 },
        { label: '90%', value: 90 },
        { label: '100%', value: 100 },
      ],
      isModalVisible: false,
      _id: '',
      loan: null,
      facilities: null,
      isModalRequestVisible: false,
      isDatePickerVisible: false,
      toDate: null,
      datePicker: new Date(),
      labelStateFacilities: '',
      vote: {}
    };
  }

  componentDidMount() {
    const { _id } = this.props.route.params;
    this.getDataFromStorage().then(r => {
      this.setState({ _id: _id }, () => {
        this.onGetLoanFromServer();
        this.onGetListManagersFromServer();
        this.onGetListRoomsFromServer();
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
    await AsyncStorage.getItem('email', (err, result) => {
      if (err) console.log(err);
      if (result) {
        this.setState({ currentEmail: result });
      }
    });
    return '';
  }

  onGetLoanFromServer = () => {
    const { _id } = this.state;
    searchLoan(_id)
      .then(loan => {
        let label = '';
        if (loan.request === true) {
          label = LABELSTATE.Approve;
        } else {
          label = loan.state === 0 ? LABELSTATE.Revoke : LABELSTATE.Allocate;
        }
        this.setState({ loan: loan, labelStateFacilities: label });
        this.onGetFacilitiesFromServer(loan.facilities);
      })
      .catch(err => {
        console.log(err);
        this.setState({ loan: null });
      });
  }

  onGetFacilitiesFromServer = (id) => {
    searchFacilities(id)
      .then(facilities => {
        this.setState({ facilities: facilities });
      })
      .catch(err => {
        console.log(err);
        this.setState({ facilities: null });
      });
  }

  onGetListManagersFromServer = () => {
    getListUser()
      .then(users => {
        const managers = users.filter(user => user.right === 1);
        this.setState({ managers: managers });
      })
      .catch(err => {
        console.log(err);
        this.setState({ managers: [] });
      });
  }

  onGetListRoomsFromServer = () => {
    getListRoom()
      .then(rooms => {
        this.setState({ rooms: rooms });
      })
      .catch(err => {
        console.log(err);
        this.setState({ rooms: [] });
      })
  }

  getImage = () => {
    const { facilities } = this.state;
    if (facilities?.image) {
      const srcImage = facilities?.image.replace("http://localhost:3000", domain);
      return srcImage;
    }
    return null;
  }

  onChangeManager = value => {
    let { loan } = this.state;
    loan.manager = value;
    this.setState({ loan: loan });
  }

  onChangeRoom = value => {
    let { loan } = this.state;
    loan.room = value;
    this.setState({ loan: loan });
  }

  onChangeNote = event => {
    let { loan } = this.state;
    loan.note = event.nativeEvent.text;
    this.setState({ loan: loan });
  }

  onUpdate = () => {
    const { _id, loan } = this.state;
    updateLoan(_id, loan)
      .then(success => {
        alert('Thành công');
        let label = '';
        if (loan.request === true) {
          label = LABELSTATE.Approve;
        } else {
          label = loan.state === 0 ? LABELSTATE.Revoke : LABELSTATE.Allocate;
        }
        this.setState({ labelStateFacilities: label });
      })
      .catch(err => {
        console.log(err);
        alert('Thất bại');
      });
  }

  onChangeState = () => {
    //change state of loan with 0 is allocate and 1 is revoke
    let { loan, labelStateFacilities } = this.state;
    if (loan.request === true) {
      loan.request = !loan.request;
      loan.state = 0;
    } else {
      loan.state = loan.state === 0 ? 1 : 0;
    }
    if (labelStateFacilities === LABELSTATE.Allocate) {
      this.setState({ isModalRequestVisible: true, loan: loan });
    } else {
      this.setState({ loan: loan }, this.onUpdate);
    }
  }

  onModalAllocateSubmit = () => {
    let { loan, toDate } = this.state;
    loan.to = toDate;
    loan.from = new Date();
    this.setState({ loan: loan, isModalRequestVisible: false }, this.onUpdate);
  }

  setVote = (value, key) => {
    let { vote } = this.state;
    vote[key] = value;
    this.setState({ vote: vote });
  }

  onVote = () => {
    let { vote, _id, currentEmail } = this.state;
    if (!vote?.percent) {
      vote.percent = 100;
    }
    vote.email = currentEmail;
    if (vote?._id) {
      updateVote(vote._id, vote).then(r => alert('Thành công')).catch(err => alert('Thất bại'));
    } else {
      vote.loanFacilities = _id;
      createVote(vote).then(r => alert('Thành công')).catch(err => alert('Thất bại'));
    }
    this.setState({ isModalVisible: false });
  }

  onShowModal = () => {
    const { _id } = this.state;
    getVoteByIdLoanFa(_id)
      .then(vote => {
        if (vote?._id)
          this.setState({ vote: vote, isModalVisible: true });
        else
          this.setState({ vote: {}, isModalVisible: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ vote: {}, isModalVisible: true });
      });
    this.setState({
      isModalVisible: true,
    });
  }

  render() {
    const {
      managers,
      rooms,
      isModalVisible,
      percent,
      loan,
      facilities,
      isModalRequestVisible,
      isDatePickerVisible,
      toDate,
      datePicker,
      labelStateFacilities,
      right,
      vote } = this.state;
    const image = this.getImage();
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity activeOpacity={0.5} style={styles.iconVote} onPress={this.onShowModal}>
          <FontAwesomeIcon name='check-circle-o' size={40} color='white' />
        </TouchableOpacity>
        {/* This is modal for comment */}
        <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>
            <FontAwesomeIcon name='remove' size={35} color='red'
              style={{ marginVertical: 5, marginLeft: 'auto' }}
              onPress={() => this.setState({ isModalVisible: false })}
            />
            <Text style={{ alignSelf: 'center', fontSize: 22, fontWeight: 'bold', marginBottom: 10, marginTop: -10 }}>Đánh giá</Text>
            <Text style={{ fontSize: 17, marginBottom: 10 }}>Tình trạng thiết bị</Text>
            <RNPickerSelect
              placeholder={{ label: 'Tình trạng' }}
              onValueChange={(value) => this.setVote(value, 'percent')}
              value={vote?.percent}
              items={percent}
              style={pickerSelectStyles}
              Icon={() => <FontAwesomeIcon name='chevron-down' size={30} color={'#a1a1a1'} />}
            />
            <Text style={{ fontSize: 17 }}>Ghi chú</Text>
            <Input
              placeholder="Note"
              color='black'
              type='default'
              style={{ alignSelf: 'center', marginVertical: 10 }}
              value={vote?.note}
              onChange={event => this.setVote(event.nativeEvent.text, 'note')}
            />
            <TouchableOpacity
              onPress={this.onVote}
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
              <FontAwesomeIcon name='save' size={30} />
              <Text style={{ fontSize: 25 }}> Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {/* this is modal for allocate */}
        <Modal isVisible={isModalRequestVisible}>
          <View style={modalStyles.container}>
            <FontAwesomeIcon name='remove' size={35} color='red'
              style={{ marginVertical: 5, marginLeft: 'auto' }}
              onPress={() => this.setState({ isModalRequestVisible: false, isDatePickerVisible: false })}
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
            <TouchableOpacity onPress={this.onModalAllocateSubmit}
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
        {/* this is detail loan facilities*/}
        <ScrollView style={styles.container}>
          {image &&
            <Image source={{ uri: image }} style={styles.image} />
          }
          <Text style={styles.paragraph}>{facilities?.name}</Text>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={{ fontSize: 15, color: 'gray' }}>{moment(loan?.from).format('DD/MM/YYYY')}</Text>
            <Text style={styles.expirationDate}>{moment(loan?.to).format('DD/MM/YYYY')}</Text>
          </View>
          <Text style={styles.description}>Manager</Text>
          <RNPickerSelect
            placeholder={{ label: 'Select a manger' }}
            value={loan?.manager}
            onValueChange={this.onChangeManager}
            items={managers.map(manager => {
              var obj = {};
              obj.label = manager.name;
              obj.value = manager.email;
              return obj;
            })}
            style={pickerSelectStyles}
            Icon={() => <FontAwesomeIcon name='chevron-down' size={30} color={'#a1a1a1'} />}
          />
          <Text style={styles.description}>Room</Text>
          <RNPickerSelect
            placeholder={{ label: 'Select a room' }}
            value={loan?.room}
            onValueChange={this.onChangeRoom}
            items={rooms.map(room => {
              var obj = {};
              obj.label = room.name;
              obj.value = room._id;
              return obj;
            })}
            style={pickerSelectStyles}
            Icon={() => <FontAwesomeIcon name='chevron-down' size={30} color={'#a1a1a1'} />}
          />
          <Text style={styles.description}>Note</Text>
          <Input placeholder="Note" style={styles.inputNote} value={loan?.note} onChange={this.onChangeNote} />
          {right === 0 &&
            <>
              <OptionButton
                icon="wrench"
                label="Update"
                backgroundColor='#0069d9'
                colorLabel='white'
                style={styles.buttonUpdate}
                onPress={this.onUpdate}
              />
              <OptionButton
                icon="wrench"
                label={labelStateFacilities}
                backgroundColor='#0069d9'
                colorLabel='white'
                style={styles.buttonUpdate}
                onPress={this.onChangeState}
              />
            </>
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
    height: 200,
    resizeMode: 'stretch',
    width: '85%'
  },
  expirationDate: {
    fontSize: 15,
    color: '#e94047',
    marginLeft: 'auto',
  },
  description: {
    fontSize: 18,
  },
  inputNote: {
    height: 100,
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  buttonUpdate: {
    borderRadius: 30,
    marginVertical: 20,
    width: '50%',
    alignSelf: 'center',
  },
  iconVote: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    zIndex: 1,
    backgroundColor: '#0069d9',
    borderRadius: 30,
    width: 55,
    height: 55,
    paddingLeft: 10,
    paddingTop: 7
  },
  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderRadius: 20,
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