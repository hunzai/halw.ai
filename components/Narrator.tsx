import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const iconSize = 25;

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

  const AudioPlayerButton = ({ sentence }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handlePress = async () => {
      setIsExpanded(!isExpanded);
      await Speech.speak(sentence);
    };

    return (
      <TouchableOpacity
        style={[
          styles.audioPlayerButton,
          isExpanded && styles.audioPlayerButtonExpanded,
        ]}
        onPress={handlePress}
      >
        <View style={styles.row}>

          <View style={styles.iconColumn}>
            <Ionicons name="play-circle-outline" size={iconSize} style={styles.icon} />
          </View>
          <View style={styles.textColumn}>
            <Text
              style={[
                styles.audioPlayerButtonText,
                isExpanded && styles.audioPlayerButtonTextExpanded,
              ]}
              numberOfLines={1}
            >
              {sentence}
            </Text>
          </View>
          <View style={styles.iconColumn}>
            <Text style={styles.playAllButtonText}>{1}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.playAllButton} onPress={() => handlePlay()}>
          <Ionicons name="play-circle-outline" size={iconSize * 2} color="white" style={styles.playAllButtonIcon} />
          <Text style={styles.playAllButtonText}>Play All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.buttonContainer}>
          {sentences.map((sentence, index) => (
            <View style={styles.makeSpace} key={`view-${index}`}>
              <AudioPlayerButton key={index} sentence={sentence} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  makeSpace: {
    paddingBottom: 20,
    paddingEnd: '15%',
    alignContent: 'flex-end'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  iconColumn:{
    paddingRight: 5,
  },
  playAllButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playAllButtonIcon: {
    marginRight: 5,
  },
  playAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  audioPlayerButton: {
    backgroundColor: '#eb8a3f',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,

  },
  audioPlayerButtonText: {
    color: '#0f0f0f',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 10,
  },
  textColumn: {
    paddingRight: 1
  },
  audioPlayerButtonExpanded: {
    backgroundColor: '#F0F0F0',
  },
  audioPlayerButtonTextExpanded: {
    color: '#4CAF50',
  },
  icon: {
    position: 'relative',
    color: '#10140b'
  }
});

export default Narrator;
