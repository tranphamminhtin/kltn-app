import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import LoanFaListItem from '../../components/LoanFaListItem';

class ListLoanFa extends Component {
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
      stateShow: this.props.route.params.stateShow
    };
  }

  render() {
    const { navigation } = this.props;
    const { loanfacilities, stateShow } = this.state;
    return (
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
        contentContainerStyle={styles.container}
      />
    );
  }
}

export default ListLoanFa;

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  }
})
