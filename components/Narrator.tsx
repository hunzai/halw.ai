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
import { Recipe } from '../api/Recipe';

const { width } = Dimensions.get('window');
const iconSize = 25;

const Narrator = ({ recipe }) => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const steps = recipe.steps;
  const recipeName = recipe.recipe_name;

  useEffect(() => {
    console.log(`is playing? ${isPlaying}`);
  }, [isPlaying]);

  const playSteps = async startIndex => {
    if (startIndex < steps.length) {
      await Speech.speak(steps[startIndex]);
      setIsPlaying(true);
      startIndex++;
      setIndex(startIndex);
      await playSteps(startIndex);
    } else {
      setIsPlaying(false);
      setIndex(0);
    }
  };

  const handlePlayAll = async () => {
    await playSteps(index);
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
            <Ionicons
              name="play-circle-outline"
              size={iconSize}
              style={styles.icon}
            />
          </View>
          <View style={styles.textColumn}>
            <Text
              style={[
                styles.audioPlayerButtonText,
                isExpanded && styles.audioPlayerButtonTextExpanded,
              ]}
              numberOfLines={isExpanded ? undefined : 1}
            >
              {sentence}
            </Text>
          </View>
          <View style={styles.iconColumn}>
            <Text style={styles.playAllButtonText}></Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{recipeName}</Text>
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.playAllButton}
          onPress={() => handlePlayAll()}
        >
          <Ionicons
            name="play-circle-outline"
            size={iconSize * 1.5}
            color="white"
            style={styles.playAllButtonIcon}
          />
          <Text style={styles.playAllButtonText}>Play All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.buttonContainer}>
          {steps.map((sentence, index) => (
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
    alignContent: 'flex-end',
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
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10, // Reduced marginBottom
  },
  playAllButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8, // Reduced padding
    paddingHorizontal: 15, // Reduced padding
    borderRadius: 20, // Reduced border radius
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
    fontSize: 14, // Reduced font size
    textAlign: 'center',
  },

  iconColumn: {
    paddingRight: 5,
  },

  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  audioPlayerButton: {
    backgroundColor: '#fff',
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
    paddingRight: 1,
  },
  audioPlayerButtonExpanded: {
    backgroundColor: '#F0F0F0',
  },
  audioPlayerButtonTextExpanded: {
    color: '#000',
    fontSize: 14,
  },
  icon: {
    position: 'relative',
    color: '#10140b',
  },
});

export default Narrator;
