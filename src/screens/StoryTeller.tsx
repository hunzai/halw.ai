import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Image, Text, Animated, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Theme from '../styles/Theme';
import VoiceApi from '../api/VoiceApi';
import Loading from '../components/Loading';
import DancingCards from '../components/Dancing';

const StoryTeller = () => {
  const waitingData = [
    'https://cdn.pixabay.com/photo/2023/03/25/10/59/hedgehog-fly-7875687_960_720.jpg',
    'https://cdn.pixabay.com/photo/2015/12/09/17/11/vegetables-1085063_640.jpg',
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [story, setStory] = useState('');
  const [animation] = useState(new Animated.Value(0));
  const voiceApi = new VoiceApi();

  const STORAGE_KEY = 'gpt'
  const getFromStorage = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const gptResponse : GPTResponse = JSON.parse(value)
        return gptResponse;
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log('generate voice');
    getFromStorage(STORAGE_KEY).then(gptResponse => {
      console.log(`from storage ${gptResponse}`)
      // voiceApi
      //   .translate(gptResponse)
      //   .then(response => {
      //     setStory(response);
      //     setIsLoading(false);
      //   })
      //   .catch(error => {
      //     console.error(error);
      //     setIsLoading(false);
      //   });
    });
  }, []);

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence(
          waitingData.map((image, index) =>
            Animated.timing(animation, {
              toValue: (index + 1) / waitingData.length,
              duration: 1000,
              useNativeDriver: true,
            })
          )
        )
      ).start();
    }
  }, [isLoading]);

  const overlayScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.max(Dimensions.get('window').height, Dimensions.get('window').width)],
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading/>
      ) : (
        <Text style={styles.storyText}>{story}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waitingContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: '80%',
    height: '80%',
  },
  waitingTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  waitingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  storyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
});

export default StoryTeller;
