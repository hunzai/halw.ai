import Constants from "expo-constants";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

const elevenLabsApiKey = Constants.expoConfig.extra.elevenLabsApiKey;
const options = {
  method: 'POST',
  url: 'https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM/stream',
  headers: {accept: 'audio/mpeg', 'Content-Type': 'application/json'},
  data: {
    text: 'a cat is a wonderful animal',
    voice_settings: {stability: 0, similarity_boost: 0}
  },
  responseType: "arraybuffer"
};

class VoiceApi {
  constructor() {
    axios.interceptors.request.use((request) => {
      console.log("Starting Request", JSON.stringify(request, null, 2));
      return request;
    });

    axios.interceptors.response.use((response) => {
      console.log("Response:", JSON.stringify(response, null, 2));
      return response;
    });
  }

  
  // async request(textToSpeak: string) {
  //   console.log(`sending request ${elevenLabsApiKey} `);
  //   const response = await axios(
  //       `https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM/stream`,
  //       {
  //         method: "POST", 
  //         headers: {
  //           accept: "audio/mpeg",
  //           "xi-api-key": elevenLabsApiKey,
  //           "Content-Type": "application/json",
  //         },
  //         data: JSON.stringify({
  //           text: textToSpeak,
  //           voice_settings: {
  //             stability: 0,
  //             similarity_boost: 0,
  //           },
  //         }),
  //         responseType: "arraybuffer"
  //       }
  //     );
  //   return response
  // }

  async translate(textToSpeak) {
    console.log(`sending text to translate: ${textToSpeak}`);
    options.data.text = textToSpeak
    const response = await axios.request(options);

    if (response.status != 200) {
      console.log(`request failed with ${response.status}`);
    } else {
      const buff = Buffer.from(response.data, "base64");
      const song = buff.toString("base64");

      const fileUri = `${FileSystem.cacheDirectory}_chat2.mp3`;
      await FileSystem.writeAsStringAsync(fileUri, song, {
        encoding: FileSystem.EncodingType.Base64,
      });
    }

  }
}

export default VoiceApi;
