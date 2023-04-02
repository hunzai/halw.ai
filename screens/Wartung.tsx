import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Theme from '../src/styles/Theme';


const Wartung = ({ visible, audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  const loadAudio = async () => {
    // const { sound } = await Audio.Sound.createAsync(require(audioUrl));
    // setSound(sound);
    const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
    setSound(sound);
    await sound.playAsync();
  };

  const handlePlay = async () => {
    if (sound === null) {
      await loadAudio();
    }
    await sound.playAsync();
    setIsPlaying(true);
  };

  const handleStop = async () => {
    if (sound !== null) {
      await sound.stopAsync();
    }
    setIsPlaying(false);
  };

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={Theme.background}>
        <View style={Theme.container}>
          <View style={Theme.container}>
            <TouchableOpacity onPress={handlePlay}>
              <AntDesign name="play" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleStop}>
              <AntDesign name="pause" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Wartung;
