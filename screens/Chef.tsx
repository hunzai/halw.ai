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

const Chef = () => {
  const waitingData = [
    'https://cdn.pixabay.com/photo/2023/03/25/10/59/hedgehog-fly-7875687_960_720.jpg',
    'https://cdn.pixabay.com/photo/2015/12/09/17/11/vegetables-1085063_640.jpg',
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [audios, setAudios] = useState<string[]>(null);

  const [animation] = useState(new Animated.Value(0));
  const voiceApi = new VoiceApi();
  const recipe : Recipe = {
    recipe_name: 'Nutritious Chicken Biryani',
    ingredients: [
      '500g chicken pieces',
      '2 cups rice',
      '2 tbsp oil',
      '1 large onion, thinly sliced',
      '1 tbsp garam masala',
      '1/2 cup yogurt',
      '1/4 cup mint leaves',
      'Salt, to taste',
    ],
    steps: [
      'Step 1: Wash the rice thoroughly and soak it in water for 30 minutes. Drain and set aside.',
      'Step 2: Heat oil in a large pot over medium heat. Add sliced onions and sauté until golden brown.',
      'Step 3: Add chicken pieces to the pot and cook until they turn white.',
      'Step 4: Add garam masala and yogurt to the pot. Mix well and let it cook for 5 minutes.',
      'Step 5: Add soaked and drained rice to the pot. Mix gently with the chicken and spices.',
      'Step 6: Add enough water to the pot to cover the rice by about 2 inches. Season with salt.',
      'Step 7: Bring the mixture to a boil, then reduce the heat to low and cover the pot with a tight-fitting lid.',
      'Step 8: Let the biryani cook on low heat for 20-25 minutes or until the rice and chicken are fully cooked.',
      'Step 9: Once the biryani is cooked, turn off the heat and let it sit for 10 minutes.',
      'Step 10: Garnish with mint leaves before serving. Serve hot and enjoy your delicious homemade chicken biryani!',
    ],
  };

  useEffect(() => {
    // Speech.getAvailableVoicesAsync().then(voices => {
    //   console.log(voices)
    // })

    LocalStorage.get().then((promptAnswer: PromptText) => {
      // console.log(`from storage => ${promptAnswer.sentences[0]}`)

      // for(let  index=0; index < sentences.length; index++){
      //   const speak = sentences[index]
      //   console.log(speak)
      //   Speech.speak(speak, {language: "ur-PK-language"});
      // }

      setIsLoading(false);
      // voiceApi
      //   .translate(gptResponse)
      //   .then(audios => {
      //     setAudios(audios);
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
