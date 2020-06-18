import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DetailFacilities from '../../screens/Facilities/DetailFacilities';
import ListFacilities from '../../screens/Facilities/ListFacilities';

const Stack = createStackNavigator();

function FacilitiesNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ListFacilities"
                component={ListFacilities} />
            <Stack.Screen name="DetailFacilities"
                component={DetailFacilities}
                options={({ route }) => ({ title: route.params.title })} />
        </Stack.Navigator>
    );
}

export default FacilitiesNavigator;