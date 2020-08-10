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
                component={Report} 
                options={() => ({ title: 'Báo cáo' })} />
            <Stack.Screen name="Request"
                component={Request} 
                options={() => ({ title: 'Yêu cầu' })} />
            <Stack.Screen name="Allocate"
                component={Allocate} 
                options={() => ({ title: 'Cấp phát' })} />
            <Stack.Screen name="Revoke"
                component={Revoke} 
                options={() => ({ title: 'Thu hồi' })} />
            <Stack.Screen name="All"
                component={All} 
                options={() => ({ title: 'Tất cả' })} />
            <Stack.Screen name="ByRoom"
                component={ByRoom}
                options={() => ({ title: 'Tìm kiếm theo phòng' })} />
            <Stack.Screen name="ByManager"
                component={ByManager}
                options={() => ({ title: 'Tìm kiếm theo quản lý' })} />
            <Stack.Screen name="ListLoanFa"
                component={ListLoanFa}
                options={() => ({ title: 'Các thiết bị' })} />
            <Stack.Screen name="DetailLoan"
                component={DetailLoan}
                options={() => ({ title: 'Thiết bị cấp phát' })} />
        </Stack.Navigator>
    );
}

export default ReportNavigator;