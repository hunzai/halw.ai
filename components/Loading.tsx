import React, { useState, useEffect } from 'react';
import { View, Image, Animated, StyleSheet, Text } from 'react-native';

const images = [
  require('../assets/1.png'),
  require('../assets/2.png'),
  require('../assets/3.png')
];

const foodFacts = ["Bananas are berries", "Carrots were purple", "Avocado is a fruit", "Lobster was prison food", "Coffee is a fruit"]

const Loading = () => {
  const [opacityAnimation] = useState(new Animated.Value(0.1)); // set initial value to 0.1
  const [reverseAnimation, setReverseAnimation] = useState(true); // keep track of animation direction
  const [imageIndex, setImageIndex] = useState(0); // keep track of current image index
  const opacityStyle = {
    opacity: opacityAnimation
  };

  useEffect(() => {
    Animated.timing(opacityAnimation, {
      toValue: reverseAnimation ? 0.0 : 0.8, // change direction of animation based on state
      duration: 2000,
      useNativeDriver: true
    }).start(() => {
      setReverseAnimation(!reverseAnimation); // toggle animation direction on completion
      setImageIndex((imageIndex + 1) % images.length); // update image index
    });
  }, [opacityAnimation, reverseAnimation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.image, opacityStyle]}
        source={images[imageIndex]} // use current image source
      />
      <Text style={styles.text}>{foodFacts[imageIndex]}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default Loading;
