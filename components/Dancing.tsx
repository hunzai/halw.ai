import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Animated, Easing } from 'react-native';

const MAX_IMAGES = 5;

const DancingCards = () => {
  const [images, setImages] = useState([]);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newImages = Array.from({ length: MAX_IMAGES }, () =>
        `https://picsum.photos/200/300?random=${Math.floor(
          Math.random() * 1000
        )}`
      );
      setImages(newImages);
      setAnimation(new Animated.Value(0));
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <Animated.View
          key={image}
          style={[
            styles.card,
            {
              transform: [
                {
                  translateY: translateY,
                },
              ],
            },
            {
              zIndex: index,
            },
          ]}
        >
          <Image source={{ uri: image }} style={styles.image} />
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    position: 'absolute',
    width: 200,
    height: 300,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
});

export default DancingCards;
