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
import  PauseButton  from './PlayerButton';
import HalwaiButton from './Button';
import Grid from './Grid';


const Narrator = ({ recipe }) => {
  const [index, setIndex] = useState(0);

  const [allStepsArePlayed, setIsPlaying] = useState(false);
  const steps = recipe.steps;
  const recipeName = recipe.recipe_name;

  useEffect(() => {
    console.log(`current index: ${index}`);
    if (allStepsArePlayed) {
      stopPlaying();
    } else {
      playStepAtIndex(index);
    }
  }, [allStepsArePlayed, index]);

  const speak = async index => {

  };

  const playStepAtIndex = async index => {
    await Speech.stop();
    Speech.speak(steps[index], {
      language: 'en',
      onDone: () => {
        if (index < steps.length - 1) {
          setIndex(index + 1);
        } else {
          setIsPlaying(true);
          setIndex(0);
        }
      },
    });

  };

  const handlePlayAll = async () => {
    setIsPlaying(false);
    setIndex(0);
    console.log(`current index handlePlayAll: ${index}`);
  };

  const stopPlaying = async () => {
    console.log('stop');
    await Speech.stop();
  };

  const handlePause = async () => {
    await Speech.pause();
  };

  const handlePress = () => {
    console.log(`Button pressed: `);

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
          <Grid steps={steps} index={index} onPress={handlePress}/>
      </ScrollView>
    </View>
  );
};



export default Narrator;
