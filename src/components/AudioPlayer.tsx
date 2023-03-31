import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";

const AudioPlayer = ({ uri }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);

  const handlePlayPause = async () => {
    if (!playbackInstance) {
      const { sound } = await Audio.Sound.createAsync({ uri: uri });
      setPlaybackInstance(sound);
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        await playbackInstance.pauseAsync();
        setIsPlaying(false);
      } else {
        await playbackInstance.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const handleStop = async () => {
    if (playbackInstance) {
      await playbackInstance.stopAsync();
      setPlaybackInstance(null);
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
        <AntDesign name={isPlaying ? "pause" : "play"} size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleStop}>
        <AntDesign size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#4A4A4A",
    borderRadius: 25,
    padding: 10,
    marginHorizontal: 10,
  },
});

export default AudioPlayer;
