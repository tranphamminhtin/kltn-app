import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, RefreshControl } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FacilitiesListItem from '../../components/FacilitiesListItemDistinct';
import AsyncStorage from '@react-native-community/async-storage';
import { getFacilitiesByRoom } from './../../networking/FacilitiesAPI';
import { getListRoom } from './../../networking/RoomAPI';

const STATESHOW = {
  Request: 'Request',
  Allocate: 'Allocate',
  Revoke: 'Revoke'
};

const filter = 1;

class ByRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      right: 1,
      currentEmail: '',
      rooms: [
        { _id: 1, name: 'room 1' },
        { _id: 2, name: 'room 2' },
        { _id: 3, name: 'room 3' },
        { _id: 4, name: 'room 4' },
        { _id: 5, name: 'room 5' }
      ],
      room: null,
      facilities: [],
      refreshing: false,
      stateShow: ''
    };
  }

  componentDidMount() {
    const { stateShow } = this.props.route.params;
    this.setState({ stateShow: stateShow }, () => {
      this.refreshFacilitiesFromServer();
      this.refreshRoomsFromServer();
    });
  }

  getDataFromStorage = () => {
    AsyncStorage.getItem('right', (err, result) => {
      if (err) console.log(err);
      if (result) {
        this.setState({ right: JSON.parse(result) });
      }
    });
    AsyncStorage.getItem('email', (err, result) => {
      if (err) console.log(err);
      if (result) {
        this.setState({ currentEmail: result });
      }
    });
  }

  refreshFacilitiesFromServer = () => {
    const { room, stateShow } = this.state;
    this.setState({ refreshing: true });
    let idroom = 'null';
    if (room) {
      idroom = room;
    }
    getFacilitiesByRoom(idroom, stateShow)
      .then(facilities => {
        this.setState({
          facilities: facilities,
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

  refreshRoomsFromServer = () => {
    this.setState({ refreshing: true });
    getListRoom()
      .then(rooms => {
        this.setState({
          rooms: rooms,
          refreshing: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ rooms: [], refreshing: false });
      });
  }

  onRefresh = () => {
    this.refreshFacilitiesFromServer();
  }

  onFilter = (value) => {
    if (value) {
      this.setState({ room: value }, this.refreshFacilitiesFromServer);
    } else {
      this.setState({ room: 'null' }, this.refreshFacilitiesFromServer);
    }
  }

  render() {
    const { navigation } = this.props;
    const { stateShow, rooms, refreshing, room, facilities } = this.state;
    return (
      <View>
        <Text style={{ marginLeft: 7, marginTop: 4, fontSize: 18 }}>Room: </Text>
        {rooms.length > 0 &&
          <RNPickerSelect
            placeholder={{ label: 'Select a room' }}
            value={room}
            onValueChange={(value) => this.onFilter(value)}
            items={rooms.map(room => {
              var obj = {};
              obj.label = room.name;
              obj.value = room._id;
              return obj;
            })}
            style={pickerSelectStyles}
            Icon={() => <FontAwesomeIcon name='chevron-down' size={30} color={'#a1a1a1'} />}
          />
        }
        <FlatList data={facilities}
          renderItem={({ item }) =>
            <View>
              <FacilitiesListItem
                facilities={item}
                onPress={() => navigation.navigate('ListLoanFa', {
                  _id: item._id,
                  stateShow: stateShow,
                  filter: filter,
                  contentFilter: room
                })} />
            </View >
          }
          keyExtractor={(item) => `${item._id}`}
          contentContainerStyle={styles.container}
          refreshControl={< RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
        />
      </View>
    );
  }
}

export default ByRoom;
const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 100
  }
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginHorizontal: 7,
    marginTop: 7,
    marginBottom: 4,
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
    marginHorizontal: 7,
    marginTop: 7,
    marginBottom: 4,
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