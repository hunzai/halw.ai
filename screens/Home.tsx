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

function Home() {
  const [textCompletion, setTextCompletion] = useState<PromptText>(null);
  const [promptSent, setPromptSent] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (textCompletion) {
      console.log(textCompletion);
      LocalStorage.set(textCompletion);
      navigation.navigate('StoryTeller');
    }
  }, [textCompletion]);

  const sendGpt = async () => {
    setPromptSent(true);
    Gpt.answer(Prompt.names())
      .then(response => response.json())
      .then(response => {
        console.log(`original response: ${JSON.stringify(response)}`);

        if (response.error) {
          setApiError(response);
          setPromptSent(false);
        } else {
          const txt = JSON.stringify(response.choices[0].text);
          const answer = JSON.parse(txt) as PromptText;
          console.log(`txt: ${JSON.stringify(answer)}`);
          setTextCompletion(answer);
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
