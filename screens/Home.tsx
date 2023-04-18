import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Theme from '../styles/Theme';

import { Prompt } from '../api/Prompt';

import Gpt from '../api/Gpt';
import LocalStorage from '../utils/Storage';
import Loading from '../components/Loading';
import { Recipe } from '../api/Recipe';

function Home({ navigation }) {
  const [gptResponse, setGptResponse] = useState<PromptText>(null);
  const [promptSent, setPromptSent] = useState(false);
  const [apiError, setApiError] = useState(null);


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

  const NEXT_SCREEN_NAME = 'Chef';

  useEffect(() => {
    if (gptResponse && promptSent) {
      navigation.navigate(NEXT_SCREEN_NAME, { recipe });
    }
  }, [gptResponse]);

  const sendGpt = async () => {
    setPromptSent(true);
    Gpt.answer(Prompt.names())
      .then(response => response.json())
      .then(response => {
        // console.log(`original response: ${JSON.stringify(response)}`);

        if (response.error) {
          setApiError(response);
          setPromptSent(false);
        } else {
          const txt = JSON.stringify(response.choices[0].text);
          const answer = JSON.parse(txt) as PromptText;
          // console.log(`txt: ${JSON.stringify(answer)}`);
          setGptResponse(answer);
        }
      });
  };

  return (
    <View style={Theme.container}>
      {promptSent ? (
        <Loading />
      ) : (
        <ImageBackground
          source={require('../assets/kitchen.png')}
          style={Theme.background}
        >
          <View style={Theme.container}>
            <View style={Theme.inputContainer}>
              <Text style={Theme.heading}>Halw.ai</Text>

              <TouchableOpacity style={Theme.button} onPress={sendGpt}>
                <Text style={Theme.buttonText}>Let's Cook</Text>
              </TouchableOpacity>
            </View>

            {apiError ? (
              <View style={Theme.inputContainer}>
                <Text numberOfLines={1} style={Theme.greenText}>
                  {`"Api Error: ${apiError.error.message}"`}{' '}
                </Text>
              </View>
            ) : null}
          </View>
        </ImageBackground>
      )}
    </View>
  );
}

export default Home;
