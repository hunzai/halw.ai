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
import { Buffer } from "buffer";

import { Audio } from "expo-av";
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing";


export default function Prompter() {
  const [inputText, setInputText] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const [audioBlob, setAudioBlob] = useState(null);

  const openApiKey = Constants.expoConfig.extra.openApiKey;
  const elevenLabsApiKey = Constants.expoConfig.extra.elevenLabsApiKey;

  const prompt =
    "Act like a famous Indian chef and generate a biryani receipe. Breakdown the receipt into steps";
  const [textToSpeak, setTextToSpeak] = useState("");
  const [audioURL, setAudioURL] = useState("");

  const fetchBlob = async () => {
    const response = await axios(
      `https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM/stream`,
      {
        method: "POST",
        headers: {
          accept: "audio/mpeg",
          'xi-api-key': elevenLabsApiKey,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          text: textToSpeak,
          voice_settings: {
            stability: 0,
            similarity_boost: 0,
          },
        }),
        responseType: 'arraybuffer',
      }
    );

    const buff = Buffer.from(response.data, 'base64')
    const song = buff.toString('base64')

    // const arrayBuffer = Buffer.from(response.data).toString('base64')
    const fileUri = `${FileSystem.cacheDirectory}_chat.mp3`;
    await FileSystem.writeAsStringAsync(fileUri, song, { encoding: FileSystem.EncodingType.Base64 });
    await Sharing.shareAsync(fileUri);

  };

  const play = async () => {
    const fileUri = `${FileSystem.cacheDirectory}_chat.mp3`;
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( {uri: fileUri});

    console.log('Playing Sound');
    await sound.playAsync();

    // try {

    //   const fileInfo = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + '_chat.mp3');
    //   // console.log(fileInfo.exists)
    //   // const mpThree = await FileSystem.readAsStringAsync(fileInfo.uri, {
    //   //   encoding: FileSystem.EncodingType.Base64,
    //   // })

    //   // const dataUri = `data:audio/mp3;base64,${mpThree}`;
    //   // console.log(audioBlob)
    //   // const uri = URL.createObjectURL(audioBlob);

    //   // console.log(mpThree)
    //   // Load the audio file from the cache directory
    //   console.log(fileInfo.exists)
    //   console.log(fileInfo.uri)

    //   // await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    //   const sound = new Audio.Sound();
    //   await sound.loadAsync( {uri: `${FileSystem.cacheDirectory}_chat.mp3`});


    //   await sound.playAsync()

    //   // Play the audio file
    //   // await sound.play();
    // } catch (error) {
    //   console.log(error);
    // }
}

  useEffect(() => {
    console.log("useEffect " + textToSpeak);
    if (textToSpeak !== "") {
      fetchBlob()
        // .then((response) => response.blob())
        .then((response) => {
          console.log("setting blob ");
          // Store the blob in state

          setInputText("hi");
          // console.log(response.url)
          // Create an object URL for the blob and store it in state
          // setAudioBlob(response);
      
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [textToSpeak]);

  const handlePress = async () => {
    const requestBody: RequestBody = {
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
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
    console.log(data);

    if (response.ok) {
      setTextToSpeak("hello");
      setApiResponse(data.choices[0].text);
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
          {apiResponse ? (
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={Theme.responseContainer}
              showsVerticalScrollIndicator={false}
            >
              <Text style={Theme.responseText}>{apiResponse}</Text>
            </ScrollView>
          ) : null}

          {inputText ? (
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
