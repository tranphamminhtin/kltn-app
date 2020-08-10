import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Camera from '../../screens/Camera';
import DetailLoan from '../../screens/LoanFacilities/DetailLoan';

const Stack = createStackNavigator();

function CameraNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Camera"
                component={Camera} />
            <Stack.Screen name="DetailLoan"
                component={DetailLoan} 
                options={() => ({ title: 'Chi tiết thiết bị' })} />
        </Stack.Navigator>
    );
}

export default CameraNavigator;