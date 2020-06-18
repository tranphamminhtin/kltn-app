import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Input } from 'galio-framework';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import OptionButton from '../../components/OptionButton';

import tv from '../../assets/tv.jpg';

export default class DetailLoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  onUpdate = () => {

  }

  render() {
    const { facilities } = this.props.route.params;
    const { managers, rooms, units } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Image source={tv} style={styles.image} />
        <Text style={styles.paragraph}>
          Local files and sets can be imported by dragging and dropping them into
          the editor
      </Text>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Text style={{ fontSize: 15, color: 'gray' }}>06/06/2019</Text>
          <Text style={styles.expirationDate}>06/06/2020</Text>
        </View>
        <Text style={styles.description}>Manager</Text>
        <RNPickerSelect
          placeholder={{ label: 'Select a manger' }}
          onValueChange={(value) => console.log(value)}
          items={managers.map(manager => {
            var obj = {};
            obj.label = manager.name;
            obj.value = manager.email;
            return obj;
          })}
          style={pickerSelectStyles}
          Icon={()=> <FontAwesomeIcon name='chevron-down' size={30} color={'#a1a1a1'}/>}
        />
        <Text style={styles.description}>Room</Text>
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
          Icon={()=> <FontAwesomeIcon name='chevron-down' size={30} color={'#a1a1a1'}/>}
        />
        <Text style={styles.description}>Unit</Text>
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
          Icon={()=> <FontAwesomeIcon name='chevron-down' size={30} color={'#a1a1a1'}/>}
        />
        <Text style={styles.description}>Note</Text>
        <Input placeholder="Note" style={styles.inputNote} />
        <OptionButton
          icon="wrench"
          label="Update"
          backgroundColor='#0069d9'
          colorLabel='white'
          style={styles.buttonUpdate}
          onPress={this.onUpdate}
        />
      </ScrollView>
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