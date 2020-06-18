import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Management from '../../screens/Management/Management';
import ListUser from '../../screens/Management/ListUser';
import ListRoom from '../../screens/Management/ListRoom';
import ListUnit from '../../screens/Management/ListUnit';
import ListTypeFa from '../../screens/Management/ListTypeFa';


const Stack = createStackNavigator();

function ManagementNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Management"
                component={Management} />
            <Stack.Screen name="Room"
                component={ListRoom} />
            <Stack.Screen name="Unit"
                component={ListUnit} />
            <Stack.Screen name="TypeFa"
                component={ListTypeFa}
                options={() => ({ title: 'Type of Facilities' })} />
            <Stack.Screen name="User"
                component={ListUser} />
        </Stack.Navigator>
    );
}

export default ManagementNavigator;