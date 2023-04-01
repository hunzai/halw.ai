import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Image, Text, Animated, Dimensions } from 'react-native';
import Theme from '../styles/Theme';
import VoiceApi from '../api/VoiceApi';
import Loading from '../components/Loading';
import LocalStorage from '../utils/Storage';

import Narrator from '../components/Narrator';

const StoryTeller = () => {
  const waitingData = [
    'https://cdn.pixabay.com/photo/2023/03/25/10/59/hedgehog-fly-7875687_960_720.jpg',
    'https://cdn.pixabay.com/photo/2015/12/09/17/11/vegetables-1085063_640.jpg',
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [audios, setAudios] = useState<string[]>(null);

  const [animation] = useState(new Animated.Value(0));
  const voiceApi = new VoiceApi();
  const sentences = [
    "1. آدھی کلو چکن دھو کر کاٹ لیں۔",
    "2. ایک پین میں دو کھانے کے چمچ زیتون کے تیل کو گرم کریں۔",
    "3. اس میں ٹماٹر، پیاز، لہسن، ہری مرچ، نمک، لال مرچ، ہلدی، زیرہ اور کٹی ہوئی کاری پتہ ڈال کر چکن کو اس میں ملا کر ٹھوس کر لیں۔",
    "4. اس میں چاول، دہی، پانی اور زردہ ڈال کر اچھی طرح مکس کر لیں۔",
    "5. اب اسے دم دیں۔ اس کے لئے، اسے اوپر سے دھک کر ایک دم دینے کے لئے کم از کم 20 منٹ تک پکائیں۔",
    "6. بریانی کے بیکنگ کے لئے ایک پین میں تیل گرم کریں اور اس میں کٹی ہوئی پیاز ڈال کر سونف، ہرا دھنیا، پودینہ، پیاز کے سلائس اور کشمیری لال مرچ ڈال کر 2 سے 3 منٹ تک پکائیں۔",
    "7. اب اس میں چاول کے اوپر سے ٹوپیں بنائیں۔",
    "8. پھر، ڈس پر بریانی کی لائے شامل کریں۔",
    "9. کچھ دیر کے لئے ڈم دینے کے بعد، بریانی کو ڈھک کر اتار لیں۔",
    "10. ہلدی، پیاز، لہسن، ہری مرچ اور نمک کے ساتھ سلاد کے ساتھ پیش کریں۔"
  ]

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
            })
          )
        )
      ).start();
    }
  }, [isLoading]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading/>
      ) : (
        <View>
          <Narrator sentences={sentences} />
        </View>

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
