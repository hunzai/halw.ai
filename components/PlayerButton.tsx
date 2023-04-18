import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

const PauseButton = ({ onPress, text }) => {
  const animationValue1 = useRef(new Animated.Value(0)).current;
  const animationValue2 = useRef(new Animated.Value(0)).current;
  const animationValue3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateBlock = (animationValue) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animationValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(animationValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
        ])
      );
    };
      animateBlock(animationValue1).start();
      setTimeout(() => animateBlock(animationValue2).start(), 200);
      setTimeout(() => animateBlock(animationValue3).start(), 400);
  }, []);

  const blockHeight1 = animationValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 30],
  });

  const blockHeight2 = animationValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 30],
  });

  const blockHeight3 = animationValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 30],
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.blocksContainer}>
        <Animated.View style={[styles.block, { height: blockHeight1 }]} />
        <Animated.View style={[styles.block, { height: blockHeight2 }]} />
        <Animated.View style={[styles.block, { height: blockHeight3 }]} />
        <Animated.View style={[styles.block, { height: blockHeight3 }]} />
      </View>
    </TouchableOpacity>
  );
};

const PlayButton = ({ onPress, text }) => {


  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>

      <View style={styles.blocksContainer}>
        <Animated.View style={[styles.block]} />
        <Animated.View style={[styles.block]} />
        <Animated.View style={[styles.block]} />
        <Animated.View style={[styles.block]} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 5,
    backgroundColor: '#1a0000',
    width: 150,
    height: 100,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10

  },
  text: {
    color: 'white',
    fontSize: 100,
    alignContent: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
    opacity: 0.4,
    position: 'absolute'
  },
  blocksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  block: {
    width: 10,
    borderRadius: 2,
    backgroundColor: 'white',
    marginLeft: 2,
    marginRight: 2,
    padding:15,
    opacity: 0.8
  },
});

export {PlayButton , PauseButton};
