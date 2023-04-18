import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

const PauseButton = ({ onPress, text, animating }) => {
  const animationValue1 = useRef(new Animated.Value(0)).current;
  const animationValue2 = useRef(new Animated.Value(10)).current;
  const animationValue3 = useRef(new Animated.Value(20)).current;

  const setAnimation = () => {
    const animateBlock = (animationValue, delay = 1) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animationValue, {
            toValue: 1,
            duration: 200,
            delay: delay,
            useNativeDriver: false,
          }),
          Animated.timing(animationValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
        ]),
      );
    };
    animateBlock(animationValue1).start();
    animateBlock(animationValue2).start();
    animateBlock(animationValue3).start();
  }

  useEffect(() => {
    let animations = [];

    if (animating) {
      setAnimation()
    } else {
      animationValue1.setValue(0);
      animationValue2.setValue(0);
      animationValue3.setValue(0);
    }

    return () => {
      animations.forEach(animation => animation && animation.stop());
    };
  }, [animating]);

  const blockHeight1 = animationValue1.interpolate({
    inputRange: [0, 30],
    outputRange: [10, 200],
  });

  const blockHeight2 = animationValue2.interpolate({
    inputRange: [0, 30],
    outputRange: [10, 30],
  });

  const blockHeight3 = animationValue3.interpolate({
    inputRange: [0, 30],
    outputRange: [10, 100],
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>

      {animating ? (
        <View style={styles.blocksContainer}>
          <Animated.View style={[styles.block, { height: blockHeight1 }]} />
          <Animated.View style={[styles.block, { height: blockHeight2 }]} />
          <Animated.View style={[styles.block, { height: blockHeight3 }]} />
        </View>
      ) : (
        <View style={styles.blocksContainer}>
          <Animated.View style={[styles.block, { height: blockHeight1 }]} />
          <Animated.View style={[styles.block, { height: blockHeight2 }]} />
          <Animated.View style={[styles.block, { height: blockHeight3 }]} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default PauseButton;

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
    marginHorizontal: 10,
  },
  text: {
    color: 'white',
    fontSize: 100,
    alignContent: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
    opacity: 0.4,
    position: 'absolute',
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
    padding: 15,
    opacity: 0.8,
  },
});
