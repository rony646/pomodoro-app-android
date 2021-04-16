import React, { useState } from 'react';

import { AntDesign } from '@expo/vector-icons'
import { View, Text, Modal, StyleSheet, Button, Pressable } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../../constants/Colors';

interface ConfigModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({isOpen, closeModal}) => {

    const [colors, setColors] = useState({
        color1: {
            colorCode: Colors.themePrimaryColor,
            selected: true,
        },
        color2: {
            colorCode: Colors.themeSecondaryColor,
            selected: false,
        },
        color3: {
            colorCode: Colors.themeTertiaryColor,
            selected: false,
        }
    })

    const onChangeColorHandler = (color: string) => {
        switch(color) {
            case 'color1':
                let newColors = {
                    color1: {
                        colorCode: Colors.themePrimaryColor,
                        selected: true,
                    },
                    color2: {
                        colorCode: Colors.themeSecondaryColor,
                        selected: false,
                    },
                    color3: {
                        colorCode: Colors.themeTertiaryColor,
                        selected: false,
                    }
                };
                setColors(newColors);
                break;
            case 'color2':
                newColors = {
                    color1: {
                        colorCode: Colors.themePrimaryColor,
                        selected: false,
                    },
                    color2: {
                        colorCode: Colors.themeSecondaryColor,
                        selected: true,
                    },
                    color3: {
                        colorCode: Colors.themeTertiaryColor,
                        selected: false,
                    }
                };
                setColors(newColors);
                break;
            case 'color3':
                newColors = {
                    color1: {
                        colorCode: Colors.themePrimaryColor,
                        selected: false,
                    },
                    color2: {
                        colorCode: Colors.themeSecondaryColor,
                        selected: false,
                    },
                    color3: {
                        colorCode: Colors.themeTertiaryColor,
                        selected: true,
                    }
                };
                setColors(newColors);
                break;
        }
    };

    return(
        <Modal
            animationType="slide"
            transparent
            visible={isOpen}
        >
            <View style={styles.modal}>
                <Pressable style={styles.closeButton} onPress={closeModal}>
                    <AntDesign name="close" size={40} color="black"/>
                </Pressable>
                <View style={styles.colorOptionsContainer}>
                    <Text style={styles.title}>Color Settings</Text>
                    <Text>Select a theme color to the app: </Text>
                </View>
                <Text>Color 1</Text>
                <CheckBox
                    value={colors.color1.selected}
                    onValueChange={() => onChangeColorHandler('color1')}
                />
                 <Text>Color 2</Text>
                 <CheckBox
                    value={colors.color2.selected}
                    onValueChange={() => onChangeColorHandler('color2')}
                />
                 <Text>Color 3</Text>
                 <CheckBox
                    value={colors.color3.selected}
                    onValueChange={() => onChangeColorHandler('color3')}
                />
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        alignSelf: "center",
        marginTop: "23%",
        backgroundColor: "#fff",
        overflow: "hidden",
        borderRadius: 35,
        width: "90%",
        height: "85%"
    },
    closeButton: {
        marginLeft: 20,
        marginTop: 10
    },
    colorOptionsContainer: {
        height: '40%',
        // backgroundColor: 'red',
        alignItems: 'center'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    }
})

export default ConfigModal;