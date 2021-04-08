import React, {} from 'react';

import { AntDesign } from '@expo/vector-icons'
import { View, Text, Modal, StyleSheet, Button, Pressable } from 'react-native';

interface ConfigModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({isOpen, closeModal}) => {
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
    }
})

export default ConfigModal;