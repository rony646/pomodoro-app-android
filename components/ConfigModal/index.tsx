import React, { useState, useContext } from 'react';

import { AntDesign } from '@expo/vector-icons'
import { View, Text, Modal, StyleSheet, Button, Pressable } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../../constants/Colors';
import ThemeContext from '../../contexts/theme';

interface ConfigModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({isOpen, closeModal}) => {

    const themeContext = useContext(ThemeContext);

    console.log('Current color: ', themeContext.color)

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
                themeContext.setColor(Colors.themePrimaryColor);
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
                themeContext.setColor(Colors.themeSecondaryColor);
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
                themeContext.setColor(Colors.themeTertiaryColor);
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

                    <View style={styles.optionsContainer}>
                        <View style={styles.option}>
                            <View style={styles.color1}></View>
                            <CheckBox
                                value={colors.color1.selected}
                                onValueChange={() => onChangeColorHandler('color1')}
                            />
                        </View>

                        <View style={styles.option}>
                        <View style={styles.color2}></View>
                            <CheckBox
                                value={colors.color2.selected}
                                onValueChange={() => onChangeColorHandler('color2')}
                            />
                        </View>

                        <View style={styles.option}>
                            <View style={styles.color3}></View>
                            <CheckBox
                                value={colors.color3.selected}
                                onValueChange={() => onChangeColorHandler('color3')}
                            />
                        </View>
                        
                    </View>
                </View>
               
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
    },
    optionsContainer: {
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 40
    },
    option: {
        paddingHorizontal: 20
    },
    color1: {
        height: 35,
        width: 35,
        borderRadius: 17.5,
        backgroundColor: Colors.themePrimaryColor
    },
    color2: {
        height: 35,
        width: 35,
        borderRadius: 17.5,
        backgroundColor: Colors.themeSecondaryColor
    },
    color3: {
        height: 35,
        width: 35,
        borderRadius: 17.5,
        backgroundColor: Colors.themeTertiaryColor
    }
})

export default ConfigModal;