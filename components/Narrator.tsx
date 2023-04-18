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
import narratorStyles from '../styles/NarratorTheme';
import { PlayButton, PauseButton } from './PlayerButton';
import HalwaiButton from './Button';
import Grid from './Grid';

const iconSize = 25;

const Narrator = ({ recipe }) => {
  const [index, setIndex] = useState(0);
  const [rows, setRows] = useState([]);

  const [allStepsArePlayed, setIsPlaying] = useState(false);
  const steps = recipe.steps;
  const recipeName = recipe.recipe_name;

  useEffect(() => {
    console.log(`current index: ${index}`);
    if (allStepsArePlayed) {
      stopPlaying();
    } else {
      speak(index);
    }
  }, [allStepsArePlayed, index]);

  const speak = async index => {
    Speech.speak(steps[index], {
      language: 'en',
      onDone: () => {
        if (index < steps.length - 1) {
          setIndex(index + 1);
          updateRows()
        } else {
          // setIsPlaying(true);
          setIndex(0);
        }
      },
    });
  };

  const playStepAtIndex = async index => {
    await Speech.stop();
    await speak(steps[index]);
  };

  const handlePlayAll = async () => {
    setIsPlaying(false);
    console.log(`current index handlePlayAll: ${index}`);
  };

  const stopPlaying = async () => {
    console.log('stop');
    await Speech.stop();
  };

  const handlePause = async () => {
    await Speech.pause();
  };

  const handlePress = async index => {
    await playStepAtIndex(index);
  };

  const updateRows = () => {
    const rows = [];

    for (let i = 0; i < steps.length; i++) {
      console.log(`button ${i}`);
      const button1 =
        index == i ? (
          <PauseButton key={`pause-${i}`} onPress={() => handlePress(i)} text={i} />
        ) : (
          <PlayButton key={`play-${i}`} onPress={() => handlePress(i + 1)} text={i}/>
        );

      rows.push(
        <View key={`btn-${i}`} style={styles.row}>
          {button1}
        </View>,
      );
    }

    console.log(`length ${rows.length}`);
    return rows;
  };

  return (
    <View style={narratorStyles.container}>
      <View style={narratorStyles.titleContainer}>
        <Text style={narratorStyles.title}>{recipeName}</Text>
      </View>
      <View style={narratorStyles.header}>

        <HalwaiButton name={'Play'} onPress={handlePlayAll} key={'play'}/>
        <HalwaiButton name={'Pause'} onPress={handlePause} key={'pause'}/>

      </View>
      <ScrollView>
          <Grid buttons={updateRows()} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
});

export default Narrator;
