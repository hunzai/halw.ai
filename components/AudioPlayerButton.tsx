import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import buttonTexture from '../assets/play.png';
import pauseImage from '../assets/stop.png';
import { ImageBackground } from 'react-native';
import PlayerButton from './PlayerButton';

const iconSize = 50;
const buttonSize = Dimensions.get('window').width / 2.2;

const buttonStyle = StyleSheet.create({
  audioPlayerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: buttonSize,
    height: buttonSize,
    margin: 5,
  },

  buttonTexture: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: '#ffffff',
    zIndex: 1,
  },
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#1a0000',
    fontSize: 26,
    fontWeight: 'bold',
  },
});

const AudioPlayerButton = ({ sentence, handlePress, index, isPlaying }) => {
  return (
    <TouchableOpacity
      style={buttonStyle.audioPlayerButton}
      onPress={handlePress}
    >
      <ImageBackground
        source={isPlaying ? buttonTexture : pauseImage}
        style={buttonStyle.buttonTexture}
      >

        <PlayerButton onPress={handlePress} isPlaying={isPlaying}/>
      </ImageBackground>
      {/*
      <Image source={buttonTexture} style={buttonStyle.buttonTexture} />
      <Ionicons
        name="play-circle-outline"
        size={iconSize}
        style={buttonStyle.icon}
      />
      <Text>{index}</Text> */}
    </TouchableOpacity>
  );
};

export default AudioPlayerButton;
