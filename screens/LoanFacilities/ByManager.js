import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import LoanFaListItem from '../../components/LoanFaListItem';

class ByManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loanfacilities: [
        { id: 1, name: 'Bàn 1' },
        { id: 2, name: 'Bàn 2' },
        { id: 3, name: 'Bàn 3' },
        { id: 4, name: 'Bàn 4' },
        { id: 5, name: 'Bàn 5' },
        { id: 6, name: 'Bàn 6' },
        { id: 7, name: 'Bàn 7' },
        { id: 8, name: 'Bàn 8' }
      ],
      managers: [
        { id: 1, email: 'asd1@gmail', name: 'name 1' },
        { id: 2, email: 'asd2@gmail', name: 'name 2' },
        { id: 3, email: 'asd3@gmail', name: 'name 3' },
        { id: 4, email: 'asd4@gmail', name: 'name 4' },
        { id: 5, email: 'asd5@gmail', name: 'name 5' }
      ],
      stateShow: this.props.route.params.stateShow
    };
  }

  render() {
    const { navigation } = this.props;
    const { stateShow, loanfacilities, managers } = this.state
    return (
      <View>
        <Text style={{ marginLeft: 7, marginTop: 4, fontSize: 18 }}>Manager: </Text>
        <RNPickerSelect
          placeholder={{ label: 'Select a manager' }}
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
        <FlatList data={loanfacilities}
          renderItem={({ item }) =>
            <View>
              <LoanFaListItem
                facilities={item}
                onPress={() => navigation.navigate('DetailLoan', {
                  facilities: item
                })}
                stateShow={stateShow}
              />
            </View>
          }
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{ paddingTop: 4, paddingBottom: 90 }}
        />
      </View>
    );
  }
}

export default ByManager;
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
    paddingRight: 30, // to ensure the text is never behind the icon
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
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 15,
    right: 10,
  },
});