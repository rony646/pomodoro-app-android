import React from 'react';

import { View, Text, Pressable, StyleSheet } from 'react-native';

import Colors from '../../../constants/Colors';


interface ModeSelectButtonProps {
    text: string;
    onPressFunction: () => void;
    color: string;
}

const ModeSelectButton: React.FC<ModeSelectButtonProps> = ({color, text, onPressFunction}) => {
    return(
        <View style={styles.buttonView}>
            <Pressable style={{...styles.button, backgroundColor: color}} onPress={onPressFunction}>
                <Text style={styles.buttonText}>{text}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonView: {
        overflow: 'hidden',
        borderRadius: 20
    },
    button: {
        borderRadius: 20,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: '48%',
        width: 100
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#fff'
    }
})

export default ModeSelectButton;