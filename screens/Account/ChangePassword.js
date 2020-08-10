import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Input } from 'galio-framework';
import OptionButton from '../../components/OptionButton';
import { changePassword } from '../../networking/UserAPI';

class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      oldpassword: '',
      password: '',
      password2: ''
    }
  }

  componentDidMount(){
    this.getDataFromStorage();
  }

  getDataFromStorage = async () => {
    await AsyncStorage.getItem('email', (err, result) => {
      if (err) console.log(err);
      if (result) {
        this.setState({ email: result });
      }
    });
  }

  onChangeInput = (name, event) => {
    this.setState({ [name]: event.nativeEvent.text });
  }

  onUpdate = () => {
    const {password, password2, email} = this.state;
    const {navigation} = this.props;
    if(password != password2){
      alert('Xác nhận mật khẩu không đúng');
      return;
    }
    changePassword(email, this.state).then(r => {
      alert('Thành công');
      navigation.navigate('Account');
    }).catch(err => alert(err));
  }

  render() {
    const { oldpassword, password, password2 } = this.state;
    return (
      <View>
        <View style={styles.container}>
          <Input placeholder="Mật khẩu cũ" style={styles.input} value={oldpassword} password viewPass
            onChange={event => this.onChangeInput('oldpassword', event)} />
          <Input placeholder="Mật khẩu mới" style={styles.input} value={password} password viewPass
            onChange={event => this.onChangeInput('password', event)} />
          <Input placeholder="Xác nhận mật khẩu" style={styles.input} value={password2} password viewPass
            onChange={event => this.onChangeInput('password2', event)} />
        </View>
        <OptionButton
          icon="wrench"
          label="Đổi mật khẩu"
          backgroundColor='#0069d9'
          colorLabel='white'
          style={styles.button}
          onPress={this.onUpdate}
        />
      </View>
    );
  }
}

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    marginHorizontal: 30
  },
  button: {
    borderRadius: 30,
    marginVertical: 20,
    width: '55%',
    alignSelf: 'center',
  },
  input: {
    alignItems: 'flex-start',
    paddingTop: 10,
  },
});
