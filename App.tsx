import React, { useState, useContext } from 'react';

import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import Colors from './constants/Colors';
import { StyleSheet, View, Pressable } from 'react-native';
import Timer from './components/Timer';
import ConfigModal from './components/ConfigModal/index';
import { ThemeContextProvider } from './contexts/theme';

const App: React.FC = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 1500); // 25 minutes timer

  const setModalVisibleHandler = () => {
    return(
      setModalVisible(!modalVisible)
    )
  }

  console.log(modalVisible)


  return (
    <ThemeContextProvider>
      <View style={styles.container}>
        <LinearGradient 
                  start={[0,1]}
                  end={[1,0]}
                  colors={[Colors.primary1, Colors.primary2]}
                  style={styles.background}
        />
        <Timer expiryTimestamp={time}/>

        <View>
              <Pressable onPress={setModalVisibleHandler}  style={styles.configButton}>
                  <FontAwesome name="gear" size={48} color="#929292"/>
              </Pressable>
        </View>
        <ConfigModal isOpen={modalVisible} closeModal={setModalVisibleHandler}/>
      </View>
    </ThemeContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  configButton: {
    marginBottom: 18,
  }
});
