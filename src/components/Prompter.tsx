import React, { useState, useRef, useEffect } from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Button,
} from "react-native";
import Constants from "expo-constants";

import { Audio } from "expo-av";
import * as FileSystem from 'expo-file-system';
import VoiceApiInstance from "../api/say";

interface Receipe {
  ingredients: string[]
  steps: string[]
}

export default function Prompter() {

  const [narration, setNarration] = useState(false);
  const [receipe, setReceipe] = useState<Receipe>(null);

  const scrollViewRef = useRef<ScrollView>(null);
  const openApiKey = Constants.expoConfig.extra.openApiKey;

  const prompt =
    "Act like the most famous Chef." + 
    "\nTopic: Food and Nutrition" +
    "\nContext: Cooking food at home that is nutritious, cheaper and easy to prepare" +
    "\nTask: Write a recipe of chicken biryani that is traditional and tasty. Respons should be in two sections, first section will contain ingredients and then second will contain steps to prepare the Biryani" +
    "\nConstraints:  Make it simple and clear" + 
    "\nAdditional prompts: Create a response in a  json. The json should match the following json structure. { \"ingredients\": [], \"steps\": [] }";


  const play = async () => {
    const fileUri = `${FileSystem.cacheDirectory}_chat.mp3`;
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( {uri: fileUri});

    console.log('Playing Sound');
    await sound.playAsync();
}

  useEffect(() => {
    if (receipe) {
      VoiceApiInstance.translate(receipe.steps[0])
        .then((response) => {
          setNarration(true)
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [receipe]);

  const handlePress = async () => {
    const requestBody: RequestBody = {
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 500,
      temperature: 0,
    };

    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openApiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data: APIResponse = await response.json();
    const gptResponse = data.choices[0].text 
    // console.log(data);

    if (response.ok) {
      console.log(gptResponse)
      const receipe: Receipe = JSON.parse(gptResponse)
      setReceipe(receipe)
      scrollViewRef.current?.scrollTo({ y: 0.5 });
    } else {
      Alert.alert(
        "Error",
        data.error.message,
        [{ text: "OK", onPress: () => {} }],
        {
          cancelable: false,
        }
      );
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/kitchen.png")}
      style={Theme.background}
    >
      <View style={Theme.container}>
        <View style={Theme.inputContainer}>
          <Text style={Theme.heading}>Mit.ai</Text>

          <TouchableOpacity style={Theme.button} onPress={handlePress}>
            <Text style={Theme.buttonText}>Let's Cook</Text>
          </TouchableOpacity>
          {receipe ? (
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={Theme.responseContainer}
              showsVerticalScrollIndicator={false}
            >
              <Text style={Theme.responseText}>info</Text>
            </ScrollView>
          ) : null}

          {narration ? (
            <View>
              <Button title="play" onPress={play}/>
            </View>
          ) : null}
        </View>
      </View>
    </ImageBackground>
  );
}

const Theme = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 30,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  heading: {
    color: "#4A4A4A",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#D3D3D3",
    color: "#4A4A4A",
    paddingHorizontal: 10,
    marginBottom: 30,
    fontSize: 16,
    backgroundColor: "#F5F5F5",
  },
  button: {
    backgroundColor: "#4A4A4A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  responseContainer: {
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  responseText: {
    color: "#4A4A4A",
    fontSize: 16,
  },
});
