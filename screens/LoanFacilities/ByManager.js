import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, RefreshControl } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FacilitiesListItem from '../../components/FacilitiesListItemDistinct';
import { getListUser } from './../../networking/UserAPI';
import { getFacilitiesByManager } from './../../networking/FacilitiesAPI';

const STATESHOW = {
  Request: 'Request',
  Allocate: 'Allocate',
  Revoke: 'Revoke'
};

const filter = 2;

class ByManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      managers: [],
      manager: null,
      facilities: [],
      refreshing: false,
      stateShow: ''
    };
  }

  componentDidMount() {
    const { stateShow } = this.props.route.params;
    this.setState({ stateShow: stateShow }, () => {
      this.refreshFacilitiesFromServer();
      this.refreshManagersFromServer();
    });
  }

  refreshFacilitiesFromServer = () => {
    const { manager, stateShow } = this.state;
    this.setState({ refreshing: true });
    let email = 'null';
    if (manager) {
      email = manager;
    }
    getFacilitiesByManager(email, stateShow)
      .then(facilities => {
        this.setState({
          facilities: facilities,
          refreshing: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          facilities: [],
          refreshing: false
        });
      });
  }

  refreshManagersFromServer = () => {
    this.setState({ refreshing: true });
    getListUser()
      .then(users => {
        const managers = users.filter(user => user.right === 1);
        this.setState({ managers: managers, refreshing: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ managers: [], refreshing: false });
      });
  }

  onRefresh = () => {
    this.refreshFacilitiesFromServer();
  }

  onFilter = (value) => {
    if (value) {
      this.setState({ manager: value }, this.refreshFacilitiesFromServer);
    } else {
      this.setState({ manager: 'null' }, this.refreshFacilitiesFromServer);
    }
  }

  render() {
    const { navigation } = this.props;
    const { stateShow, managers, refreshing, manager, facilities } = this.state
    return (
      <View>
        <Text style={{ marginLeft: 7, marginTop: 4, fontSize: 18 }}>Manager: </Text>
        {managers?.length > 0 &&
          <RNPickerSelect
            placeholder={{ label: 'Select a manager' }}
            value={manager}
            onValueChange={(value) => this.onFilter(value)}
            items={managers.map(manager => {
              var obj = {};
              obj.label = manager.name;
              obj.value = manager.email;
              return obj;
            })}
            style={pickerSelectStyles}
            Icon={() => <FontAwesomeIcon name='chevron-down' size={30} color={'#a1a1a1'} />}
          />
        }
        <FlatList data={facilities}
          renderItem={({ item }) =>
            <View>
              <FacilitiesListItem
                facilities={item}
                onPress={() => navigation.navigate('ListLoanFa', {
                  _id: item._id,
                  stateShow: stateShow,
                  filter: filter,
                  contentFilter: manager
                })} />
            </View >
          }
          keyExtractor={(item) => `${item._id}`}
          contentContainerStyle={styles.container}
          refreshControl={< RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
        />
      </View>
    );
  }
}

export default ByManager;
const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 100
  }
});
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
    paddingRight: 30,
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
    paddingRight: 30,
  },
  iconContainer: {
    top: 15,
    right: 10,
  },
});