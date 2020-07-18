import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

import FacilitiesNavigator from './stack/FacilitiesNavigator';
import CameraNavigator from './stack/CameraNavigator';
import ReportNavigator from './stack/ReportNavigator';
import AccountNavigator from './stack/AccountNavigator';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="ListFacilities"
                    component={FacilitiesNavigator}
                    options={{
                        tabBarLabel: 'Facilities',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesomeIcon name="briefcase" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Report"
                    component={ReportNavigator}
                    options={{
                        tabBarLabel: 'Report',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesomeIcon name="clipboard" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Camera"
                    component={CameraNavigator}
                    options={{
                        tabBarLabel: 'Camera',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesomeIcon name="qrcode" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Account"
                    component={AccountNavigator}
                    options={{
                        tabBarLabel: 'Account',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesomeIcon name="user" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default BottomTabNavigator;