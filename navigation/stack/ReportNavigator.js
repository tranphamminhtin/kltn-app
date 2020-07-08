import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Report from '../../screens/LoanFacilities/Report';
import DetailLoan from '../../screens/LoanFacilities/DetailLoan';
import Request from '../../screens/LoanFacilities/Request';
import Allocate from '../../screens/LoanFacilities/Allocate';
import Revoke from '../../screens/LoanFacilities/Revoke';
import ListLoanFa from '../../screens/LoanFacilities/ListLoanFa';
import All from '../../screens/LoanFacilities/All';
import ByRoom from '../../screens/LoanFacilities/ByRoom';
import ByManager from '../../screens/LoanFacilities/ByManager';


const Stack = createStackNavigator();

function ReportNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Report"
                component={Report} />
            <Stack.Screen name="Request"
                component={Request} />
            <Stack.Screen name="Allocate"
                component={Allocate} />
            <Stack.Screen name="Revoke"
                component={Revoke} />
            <Stack.Screen name="All"
                component={All} />
            <Stack.Screen name="ByRoom"
                component={ByRoom}
                options={() => ({ title: 'Filter by room' })} />
            <Stack.Screen name="ByManager"
                component={ByManager}
                options={() => ({ title: 'Filter by manager' })} />
            <Stack.Screen name="ListLoanFa"
                component={ListLoanFa}
                options={() => ({ title: 'List Loan Facilities' })} />
            <Stack.Screen name="DetailLoan"
                component={DetailLoan}
                options={() => ({ title: 'Detail Loan Facilities' })} />
        </Stack.Navigator>
    );
}

export default ReportNavigator;