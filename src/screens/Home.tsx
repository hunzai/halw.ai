import React, { useState, useRef, useEffect } from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Theme from "../styles/Theme";
import { Prompt } from "../api/Prompt";

import AsyncStorage from '@react-native-async-storage/async-storage';
import Gpt from "../api/Gpt";

function Home() {

  const [gptResponse, setGptResponse] = useState<GPTResponse>(null);
  const navigation = useNavigation();

  const showApiError = (message: string) => {
    Alert.alert(
      "Error",
      message,
      [{ text: "OK", onPress: () => {} }],
      {
        cancelable: false,
      }
    );
  }


  useEffect(() => {
    if (gptResponse) {
      console.log('save to storage')
      AsyncStorage.setItem('gpt', JSON.stringify(gptResponse)).then(value => {
        navigation.navigate("StoryTeller")
      })
    }
  }, [gptResponse]);

  const sendGpt = async () => {
    Gpt.answer(Prompt.names()).then(response => {
      const text = response.choices[0].text;
      console.log(text)
      const answer: GPTResponse = JSON.parse(JSON.stringify(text));
      setGptResponse(answer);
    }).catch(error => {
      console.error('Error fetching data:', error);
      showApiError(error)
    })
  };

  return (
    <ImageBackground
      source={require("../../assets/kitchen.png")}
      style={Theme.background}
    >
      <View style={Theme.container}>
        <View style={Theme.inputContainer}>
          <Text style={Theme.heading}>Halw.ai</Text>

          <TouchableOpacity style={Theme.button} onPress={sendGpt}>
            <Text style={Theme.buttonText}>Let's Cook</Text>
          </TouchableOpacity>

        </View>
      </View>

    </ImageBackground>
  );
}


export default Home;
