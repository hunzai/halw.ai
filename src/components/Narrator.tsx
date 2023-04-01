import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';

const Narrator = ({ sentences }) => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Automatically play the first sentence when component is mounted
    handlePlay();
  }, []);

  const handlePlay = async () => {
    if (index < sentences.length) {
      await Speech.speak(sentences[index]);
      setIsPlaying(true);
      setIndex(index + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePause = async () => {
    await Speech.pause();
    setIsPlaying(false);
  };

  const handleStop = async () => {
    await Speech.stop();
    setIsPlaying(false);
    setIndex(0);
  };

  return (
    <ImageBackground
      source={require('../../assets/spices.png')}
      style={styles.container}
    >
      <View style={styles.buttonContainer}>
        {sentences.map((sentence, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handlePlay()}
          >
            <Text style={styles.stopButtonText}>{index}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.stopButton} onPress={() => handlePause()}>
        <Text style={styles.stopButtonText}>Stop</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 10,
  },
  button: {
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#6AFF6A',
    borderRadius: 10,
    padding: 20,
    margin: 10,
  },
  buttonText: {
    color: '#6AFF6A',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  stopButton: {
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#6AFF6A',
    borderRadius: 10,
    padding: 20,
    marginTop: 50,
  },
  stopButtonText: {
    color: '#6AFF6A',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Narrator;
