import React, { Component } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';

import LoanFaListItem from '../../components/LoanFaListItem';
import AsyncStorage from '@react-native-community/async-storage';
import { searchLoanByFacilities } from './../../networking/LoanAPI';

const STATESHOW = {
  Request: 'Request',
  Allocate: 'Allocate',
  Revoke: 'Revoke'
};

const FILTER = {
  All: 0,
  ByRoom: 1,
  ByManager: 2
}

class ListLoanFa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      right: 1,
      currentEmail: '',
      loanfacilities: [],
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

  refreshLoanFacilitiesFromServer = () => {
    const { filter, contentFilter } = this.props.route.params;
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
        if (contentFilter) {
          if (filter === FILTER.ByRoom) {
            loanFas = loanfacilities.filter(f => f.room === contentFilter);
          }
          if (filter === FILTER.ByManager) {
            loanFas = loanfacilities.filter(f => f.manager === contentFilter);
          }
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
