import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import VoiceApi from '../api/VoiceApi';
import Loading from '../components/Loading';
import LocalStorage from '../utils/Storage';

import StoryTellerTheme from '../styles/StoryTellerStyle';
import { Recipe } from '../api/Recipe';
import Narrator from '../components/Narrator';

const Chef = ({route}) => {
  const waitingData = [
    'https://cdn.pixabay.com/photo/2023/03/25/10/59/hedgehog-fly-7875687_960_720.jpg',
    'https://cdn.pixabay.com/photo/2015/12/09/17/11/vegetables-1085063_640.jpg',
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [audios, setAudios] = useState<string[]>(null);

  const [animation] = useState(new Animated.Value(0));
  const voiceApi = new VoiceApi();

  const recipe : Recipe = route.params.recipe;
  const steps: string[] = recipe.steps
  const ingredients: string[] = recipe.ingredients


  useEffect(() => {
    // Speech.getAvailableVoicesAsync().then(voices => {
    //   console.log(voices)
    // })

    console.log(`chef data:  ${JSON.stringify(recipe.steps)}`);
    // LocalStorage.get().then((promptAnswer: PromptText) => {
      // console.log(`from storage => ${promptAnswer.sentences[0]}`)

      // for(let  index=0; index < sentences.length; index++){
      //   const speak = sentences[index]
      //   console.log(speak)
      //   Speech.speak(speak, {language: "ur-PK-language"});
      // }

      // setIsLoading(false);
      // voiceApi
      //   .translate(gptResponse)
      //   .then(audios => {
      //     setAudios(audios);
      //     setIsLoading(false);
      //   })
      //   .catch(error => {
      //     console.error(error);
          setIsLoading(false);
      //   });
    // });
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
            }),
          ),
        ),
      ).start();
    }
  }, [isLoading]);

  return (
    <View style={StoryTellerTheme.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <Narrator recipe={recipe} />
        </View>
      )}
    </View>
  );
};

export default Chef;
