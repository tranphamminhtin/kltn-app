import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './components/Context';
import AppNavigator from './navigation/BottomTabNavigator';
import LoginScreen from './screens/Login';

import { login } from './networking/UserAPI';

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            token: action.token,
            isLoading: false,
          };
        case 'LOGIN_IN':
          return {
            ...prevState,
            isLogin: true,
            token: action.token,
            isLoading: false,
          };
        case 'LOG_OUT':
          return {
            ...prevState,
            isLogin: false,
            token: null,
            isLoading: false,
          };
      }
    },
    {
      isLoading: true,
      isLogin: false,
      token: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;

      try {
        token = await AsyncStorage.getItem('token');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: token });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        login(data).then(res => {
          let token = null;
          if (res.success) {
            token = res.token;
            let email = res.email;
            let right = res.right;
            AsyncStorage.multiSet([
              ['isLogin', JSON.stringify(true)],
              ['email', email],
              ['right', JSON.stringify(right)],
              ['token', token]
            ], (err) =>{
              if(err) console.log(err);
              dispatch({ type: 'LOGIN_IN', token: token });
            });
          } else {
            alert(res.message);
          }
        }).catch(err => console.log(err));
      },
      signOut: async () => {
        await AsyncStorage.clear();
        dispatch({ type: 'LOG_OUT' });
      },
    }),
    []
  );

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large'/>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      {state.isLogin ? (<AppNavigator />) : (<LoginScreen />)}
    </AuthContext.Provider>
  );
}