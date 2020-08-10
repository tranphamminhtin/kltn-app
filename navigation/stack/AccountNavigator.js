import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Account from '../../screens/Account/Account';
import Information from '../../screens/Account/Information';
import ChangePassword from '../../screens/Account/ChangePassword';

const Stack = createStackNavigator();

function AccountNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account"
                component={Account} 
                options={() => ({ title: 'Tài khoản' })} />
            <Stack.Screen name="Information"
                component={Information} 
                options={() => ({ title: 'Thông tin cá nhân' })} />
            <Stack.Screen name="ChangePassword"
                component={ChangePassword} 
                options={() => ({ title: 'Đổi mật khẩu' })} />
        </Stack.Navigator>
    );
}

export default AccountNavigator;