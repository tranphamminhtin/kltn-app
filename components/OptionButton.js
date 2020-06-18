import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

function OptionButton({ icon, label, onPress, style, backgroundColor, colorLabel }) {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={style}>
            <RectButton style={[ styles.option, {backgroundColor: backgroundColor}]} >
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.optionIconContainer}>
                        <FontAwesomeIcon name={icon} size={30} color={colorLabel} />
                    </View>
                    <View>
                        <Text style={[styles.optionText, {color: colorLabel}]}>{label}</Text>
                    </View>
                </View>
            </RectButton>
        </TouchableOpacity>
    );
}

export default OptionButton;
const styles = StyleSheet.create({
    optionIconContainer: {
        marginRight: 16,
        width: 50,
    },
    option: {
        marginBottom: 4,
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 1,
        borderRadius: 25,
        borderColor: '#ededed',
    },
    optionText: {
        fontSize: 20,
        alignSelf: 'flex-start',
        marginTop: 2,
    },
});