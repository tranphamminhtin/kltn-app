import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import UserListItem from '../../components/UserListItem';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';

const ACTION = {
  CREATE: 0,
  UPDATE: 1
}

export default class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { id: 1, email: 'email 1', name: 'name 1' },
        { id: 2, email: 'email 2', name: 'name 2' },
        { id: 3, email: 'email 3', name: 'name 3' },
        { id: 4, email: 'email 4', name: 'name 4' },
        { id: 5, email: 'email 5', name: 'name 5' },
      ],
      units: [
        { id: 1, name: 'unit 1' },
        { id: 2, name: 'unit 2' },
        { id: 3, name: 'unit 3' },
        { id: 4, name: 'unit 4' },
        { id: 5, name: 'unit 5' },
      ],
      isModalVisible: false,
      titleModal: 'This is title modal',
      actionModal: '',
      selectModal: '',
    };
  }

  onUpdate = user => () => {
    this.setState({
      isModalVisible: true,
      actionModal: ACTION.UPDATE
    });
  }

  onRemove = email => () => {
    console.log(email);
  }

  onAdd = () => {
    this.setState({
      isModalVisible: true,
      actionModal: ACTION.CREATE
    })
  }

  onSaveModal = () => {
    this.setState({ isModalVisible: false })
  }

  render() {
    const { users, isModalVisible, selectModal } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <FlatList data={users}
          renderItem={({ item }) =>
            <View>
              <UserListItem
                user={item}
                onUpdate={this.onUpdate}
                onRemove={this.onRemove}
              />
            </View>
          }
          keyExtractor={(item) => `${item.email}`}
          contentContainerStyle={styles.container}
        />
        <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>
            <FontAwesomeIcon name='remove' size={35} color='red'
              style={{ marginVertical: 5, marginLeft: 'auto' }}
              onPress={() => this.setState({ isModalVisible: false })}
            />
            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>Update user's right</Text>
            <RNPickerSelect
              placeholder={{ label: 'Select a right for user' }}
              onValueChange={(value) => this.setState({ selectModal: value })}
              items={[
                { label: 'Admin', value: 0 },
                { label: 'Manager', value: 1 },
                { label: 'User', value: 2 }
              ]}
              value={selectModal}
              style={pickerSelectStyles}
              Icon={() => <FontAwesomeIcon name='chevron-down' size={30} color={'#a1a1a1'} />}
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginVertical: 10,
    fontSize: 15,
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