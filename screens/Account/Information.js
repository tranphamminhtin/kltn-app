import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Input } from 'galio-framework';
import OptionButton from '../../components/OptionButton';
import { searchUser, updateUser } from '../../networking/UserAPI';


class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      numberphone: '',
      address: '',
      user: null
    };
  }

  componentDidMount() {
    this.getDataFromStorage().then(r => {
      this.getInformationFromServer();
    });
  }

  getDataFromStorage = async () => {
    await AsyncStorage.getItem('email', (err, result) => {
      if (err) console.log(err);
      if (result) {
        this.setState({ email: result });
      }
    });
  }

  getInformationFromServer = () => {
    searchUser(this.state.email).then(user => {
      if (user) {
        this.setState({
          name: user.name,
          numberphone: user.numberphone,
          address: user.address,
          user: user
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  onChangeInput = (name, event) => {
    this.setState({ [name]: event.nativeEvent.text });
  }

  onUpdate = () => {
    let { user, numberphone, address } = this.state;
    user.numberphone = numberphone;
    user.address = address;
    updateUser(user).then(r => alert('Thành công')).catch(err => alert('Thất bại'));
  }

  render() {
    const { email, name, numberphone, address } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.field}>Email: {email}</Text>
          <Text style={styles.field}>Họ và tên: {name}</Text>
          <Text style={styles.field}>Số điện thoại:</Text>
          <View style={{ marginHorizontal: 20 }} >
            <Input placeholder="Số điện thoại" style={styles.input} value={numberphone} type='numeric'
              onChange={event => this.onChangeInput('numberphone', event)} />
          </View>
          <Text style={styles.field}>Địa chỉ:</Text>
          <View style={{ marginHorizontal: 20 }} >
            <Input placeholder="Địa chỉ" style={styles.input} value={address}
              onChange={event => this.onChangeInput('address', event)} />
          </View>
        </View>
        <OptionButton
          icon="wrench"
          label="Lưu"
          backgroundColor='#0069d9'
          colorLabel='white'
          style={styles.button}
          onPress={this.onUpdate}
        />
      </View>
    );
  }
}

export default Information;

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    marginHorizontal: 10
  },
  field: {
    fontSize: 18,
    marginVertical: 10
  },
  button: {
    borderRadius: 30,
    marginVertical: 20,
    width: '45%',
    alignSelf: 'center',
  },
  input: {
    alignItems: 'flex-start',
    paddingTop: 10,
  },
});
