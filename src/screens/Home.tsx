import React, { useState, useRef, useEffect } from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Theme from "../styles/Theme";
import { Prompt } from "../api/Prompt";

import Gpt from "../api/Gpt";
import LocalStorage from "../utils/Storage";
import Loading from '../components/Loading';


function Home() {

  const [textCompletion, setTextCompletion] = useState<PromptText>(null);
  const [promptSent, setPromptSent] = useState(false)
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
    if (textCompletion) {
      console.log(textCompletion)
      LocalStorage.set(textCompletion)
      navigation.navigate("StoryTeller")
    }
  }, [textCompletion]);

  const sendGpt = async () => {
    setPromptSent(true)

    Gpt.answer(Prompt.names()).then(response => {

      console.log(`original response: ${JSON.stringify(response)}`)

      const txt = JSON.stringify(response.choices[0].text)

      const answer = JSON.parse(txt) as PromptText;
      console.log(`txt: ${JSON.stringify(answer)}`)
      setTextCompletion(answer);

    }).catch(error => {
      console.error('Error fetching data:', error);
      showApiError(error)
    })
  };


  return (

    <View style={styles.container}>
    {promptSent ? (
      <Loading/>
    ) : (
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
    )}
  </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  }});


export default Home;
