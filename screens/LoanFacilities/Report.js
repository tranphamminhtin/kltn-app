import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import OptionButton from '../../components/OptionButton';

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onPress = (screenName) => () => {
    const { navigation } = this.props;
    navigation.navigate(screenName);
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <OptionButton
          icon="file-text"
          label="Yêu cầu cấp phát"
          onPress={this.onPress('Request')}
        />
        <View style={{ backgroundColor: '#e9ebee', height: 3 }} />
        <OptionButton
          icon="share"
          label="Thiết bị cấp phát"
          onPress={this.onPress('Allocate')}
        />
        <View style={{ backgroundColor: '#e9ebee', height: 3 }} />
        <OptionButton
          icon="reply"
          label="Thiết bị thu hồi"
          onPress={this.onPress('Revoke')}
        />
        <View style={{ backgroundColor: '#e9ebee', height: 3 }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 16,
  }
});