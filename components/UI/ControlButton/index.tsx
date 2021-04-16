import React, {useContext, useState} from 'react';

import {StyleSheet, View, Pressable, Text} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import ThemeContext from '../../../contexts/theme';

interface ControlButtonProps {
    iconName: 'pause' | 'play',
    onPressFunction: () => void; 
}

const ControlButton: React.FC<ControlButtonProps> = ({iconName, onPressFunction}) => {

    const themeContext = useContext(ThemeContext);

    return(
        <View style={{...styles.buttonView, backgroundColor: themeContext.color}}>
            <Pressable onPress={onPressFunction} android_ripple={{borderless: false, color: 'black'}} style={styles.button}>
                <AntDesign name={iconName} size={45} color="white"/>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonView: {
        borderRadius: 15,
        overflow: 'hidden'
    },
    button: {
        elevation: 5,
        height: '70%',
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ControlButton;