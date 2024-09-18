import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import React, { useEffect } from 'react';
import color from '../constants/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Home from './HomeScreen'
export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const navigation = useNavigation();
  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(5)), 100);
    setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(5.5)), 100);
    setTimeout(()=> navigation.navigate('Home'),2500);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={color.orange} 
      />
      <View style={styles.top}></View>
      {/* Logo màn chính */}
      <Animated.View style={[styles.center, { padding: ring2padding }]}>
        <Animated.View style={[styles.img, {padding: ring1padding}]}>
          <Image 
            source={require('../../assets/Images/banhmi.png')}
            style={{ width: hp(20), height: hp(20) }} 
          />
        </Animated.View>
      </Animated.View>
      {/* */}
      <View style={styles.bottom}>
        <Text style={styles.textBottom}>
          Meals App
        </Text>
        <Text style={styles.textBottoma}>
          Phương Nam
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.orange,
  },
  top:{
    flex:1,
  },
  center: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1000,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 1000,
  },
  bottom: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 10,
  },
  textBottom: {
    fontSize: hp(7),
    fontWeight: 'bold',
    color: color.grey,
  },
  textBottoma: {
    color: color.grey,
    fontSize: hp(2),
  },
});
