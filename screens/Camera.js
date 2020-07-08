import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import OptionButton from '../components/OptionButton';
import { searchLoan } from './../networking/LoanAPI';

export default function Camera({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // console.log(data);
    // navigation.navigate('DetailLoan', {
    //   id: data,
    // });
    searchLoan(data)
      .then(res => {
        navigation.navigate('DetailLoan', {
          id: data,
        });
        setScanned(false);
      })
      .catch(err => {
        console.log(err);
        alert('Không tìm thấy thiết bị');
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned &&
        <OptionButton
          icon="hand-o-up"
          label="Tap to Scan Again"
          backgroundColor='black'
          colorLabel='white'
          style={styles.option}
          onPress={() => setScanned(false)}
        />
      }
      {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    opacity: 0.5,
    borderRadius: 30,
  }
});