import React, { Component } from 'react';
import { StyleSheet, View, Animated, Text } from 'react-native';

class WaveActivityIndicator extends Component {
  state = {
    animation: new Animated.Value(0),
    percentage: 'gpt ...',
  };

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation = () => {
    Animated.loop(
      Animated.timing(this.state.animation, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  render() {
    const { animation, percentage } = this.state;
    const interpolateWave = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const waveStyle = {
      transform: [
        {
          rotate: interpolateWave,
        },
      ],
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.wave, waveStyle]}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </Animated.View>
        <Text style={styles.percentageText}>{percentage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wave: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00ff00',
    margin: 10,
  },
  percentageText: {
    paddingTop: 15,
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ff00',
  },
});

export default WaveActivityIndicator;
