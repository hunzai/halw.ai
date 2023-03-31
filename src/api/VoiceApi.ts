import Constants from "expo-constants";
import axios, { AxiosRequestConfig } from "axios";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

const elevenLabsApiKey = Constants.expoConfig.extra.elevenLabsApiKey;
// const options = {
//   method: "POST",
//   url: "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM/stream",
//   headers: { accept: "audio/mpeg", "Content-Type": "application/json", "xi-api-key": elevenLabsApiKey  },
//   data: {
//     text: "a cat is a wonderful animal",
//     voice_settings: { stability: 0, similarity_boost: 0 },
//   },
//   responseType: "arraybuffer",
// };

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

  buildPayload(textToSpeak: string) {
    console.log(`generate voice for: ${textToSpeak}, key: ${elevenLabsApiKey}`)
    const requestConfig: AxiosRequestConfig = {
      url: "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM/stream",
      method: "POST",
      headers: { accept: "audio/mpeg", "Content-Type": "application/json",  "xi-api-key": elevenLabsApiKey },
      data: {
        text: `pin`,
        voice_settings: { stability: 0, similarity_boost: 0 },
      },
      responseType: "arraybuffer",
    };
    return requestConfig
  }

  async save(content, fileName) {
    const buff = Buffer.from(content, "base64");
      const song = buff.toString("base64");
      const fileUri = `${FileSystem.cacheDirectory}_${fileName}`;
      await FileSystem.writeAsStringAsync(fileUri, song, {
        encoding: FileSystem.EncodingType.Base64,
      })
      return fileUri
  }


  async translate(steps: GPTResponse) {
    let filePaths: string[] = [];
    for(let i=0; i < 1; i++) {
      const toTranslate = steps[i]
      console.log(`translating: ${toTranslate} `)
      const payload = this.buildPayload(toTranslate)
      const response = await axios.request(payload);
      const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.cacheDirectory}_teez_${i}`);
      console.log(dirInfo.uri)

      console.log(`voice response status: ${response.status}`)
      const voicPath = await this.save(response.data, `voice_${i}`)
      filePaths.push(voicPath)
    }

    return filePaths

  }
}

export default VoiceApi;
