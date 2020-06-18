import React from 'react';
import { Alert } from 'react-native';

function SwipeoutDelete(index, name, onOpenSwipe, onDelete) {
    return {
        autoClose: true,
        onOpen: onOpenSwipe,
        right: [
            {
                onPress: () => {
                    Alert.alert(
                        'Alert ',
                        `'Are you sure you want to delete ${name} ?'`,
                        [
                            { text: 'No', style: 'cancel' },
                            { text: 'Yes', onPress: onDelete }
                        ],
                        { cancelable: true }
                    );
                },
                text: 'Xóa',
                type: 'delete'
            }
        ],
        rowId: index,
        sectionId: 1
    }
}

export default SwipeoutDelete;