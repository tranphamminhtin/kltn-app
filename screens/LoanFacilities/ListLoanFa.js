import React, { Component } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Text } from 'react-native';

import LoanFaListItem from '../../components/LoanFaListItem';

import { getListLoan, searchLoanByFacilities } from './../../networking/LoanAPI';

const STATESHOW = {
  Request: 'Request',
  Allocate: 'Allocate',
  Revoke: 'Revoke'
};

class ListLoanFa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loanfacilities: [
        { _id: 1, name: 'Bàn 1' },
        { _id: 2, name: 'Bàn 2' },
        { _id: 3, name: 'Bàn 3' },
        { _id: 4, name: 'Bàn 4' },
        { _id: 5, name: 'Bàn 5' },
        { _id: 6, name: 'Bàn 6' },
        { _id: 7, name: 'Bàn 7' },
        { _id: 8, name: 'Bàn 8' }
      ],
      idFacilities: null,
      refreshing: false,
      stateShow: ''
    };
  }

  componentDidMount() {
    const { stateShow, _id } = this.props.route.params;
    this.setState({ stateShow: stateShow, idFacilities: _id }, () => {
      this.refreshLoanFacilitiesFromServer();
    });
  }

  refreshLoanFacilitiesFromServer = () => {
    const { stateShow, idFacilities } = this.state;
    this.setState({ refreshing: true });
    searchLoanByFacilities(idFacilities)
      .then(loanfacilities => {
        let loanFas = [];
        if (stateShow === STATESHOW.Request) {
          loanFas = loanfacilities.filter(f => f.request === true && f.state === 0);
        }
        if (stateShow === STATESHOW.Allocate) {
          loanFas = loanfacilities.filter(f => f.state === 0 && f.request === false);
        }
        if (stateShow === STATESHOW.Revoke) {
          loanFas = loanfacilities.filter(f => f.state === 1 && f.request === false);
        }
        this.setState({
          loanfacilities: loanFas,
          refreshing: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loanfacilities: [],
          refreshing: false
        });
      });
  }

  onRefresh = () => {
    this.refreshLoanFacilitiesFromServer();
  }

  render() {
    const { navigation } = this.props;
    const { loanfacilities, stateShow, refreshing } = this.state;
    return (
      <FlatList data={loanfacilities}
        renderItem={({ item }) =>
          <View>
            <LoanFaListItem
              loan={item}
              onPress={() => navigation.navigate('DetailLoan', {
                _id: item._id
              })}
              stateShow={stateShow}
            />
          </View>
        }
        keyExtractor={(item) => `${item._id}`}
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
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
