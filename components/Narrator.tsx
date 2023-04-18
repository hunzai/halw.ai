import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import * as Speech from 'expo-speech';
import narratorStyles from '../styles/NarratorTheme';
import HalwaiButton from './Button';
import Grid from './Grid';


const Narrator = ({ recipe }) => {
  const [index, setIndex] = useState(0);

  const [allStepsArePlayed, setAllStepsArePlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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

  const playStepAtIndex = async index => {
    await Speech.stop();
    setIsPlaying(true)
    console.log(isPlaying)
    Speech.speak(steps[index], {
      language: 'en',
      onDone: () => {
        if (index < steps.length - 1) {
          setIndex(index + 1);
        } else {
          setAllStepsArePlayed(true);
          setIndex(0);
        }
      },
    });

  };

  const handlePlayAll = async () => {

    if(isPlaying) {
      stopPlaying()
      setAllStepsArePlayed(true);
    }else{
      setAllStepsArePlayed(false);
      setIndex(0);
      console.log(`current index handlePlayAll: ${index}`);
    }

  };

  const stopPlaying = async () => {
    console.log('stop');
    setIsPlaying(false)
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

        {isPlaying ?
          (<HalwaiButton onPress={handlePlayAll} key={'play'} iconName={"pause-circle-outline"} />) : (<HalwaiButton onPress={handlePlayAll} key={'play'} iconName={"play-circle-outline"} />)}


      </View>
      <ScrollView>
        <Grid steps={steps} index={index} onPress={handlePress} />
      </ScrollView>
    </View>
  );
};



export default Narrator;
