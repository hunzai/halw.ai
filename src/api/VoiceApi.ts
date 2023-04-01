import Constants from "expo-constants";
import axios, { AxiosRequestConfig } from "axios";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

const elevenLabsApiKey = Constants.expoConfig.extra.elevenLabsApiKey;

class VoiceApi {

  AUDIO_PREFIX : string = 'name'

  constructor() {
    // axios.interceptors.request.use((request) => {
    //   console.log("Starting Request", JSON.stringify(request, null, 2));
    //   return request;
    // });

    // axios.interceptors.response.use((response) => {
    //   console.log("Response:", JSON.stringify(response, null, 2));
    //   return response;
    // });
  }


  buildPayload(textToSpeak: string) {
    console.log(`generate voice for: ${textToSpeak}`)
    const requestConfig: AxiosRequestConfig = {
      url: "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM/stream",
      method: "POST",
      headers: { accept: "audio/mpeg", "Content-Type": "application/json",  "xi-api-key": elevenLabsApiKey },
      data: {
        text: `${textToSpeak}`,
        voice_settings: { stability: 0, similarity_boost: 0 },
      },
      responseType: "arraybuffer",
    };
    return requestConfig
  }

  async save(fileName: string, content: any) {
    const buff = Buffer.from(content, "base64");
      const song = buff.toString("base64");
      await FileSystem.writeAsStringAsync(fileName, song, {
        encoding: FileSystem.EncodingType.Base64,
      })
  }


  async translate(gptResponse: GPTResponse) {
    const instructions = gptResponse.Response.steps
    console.log(`instructions to voice: ${gptResponse}`)
    let audios: string[] = [];
    if (instructions.length < 1) return audios;

    for(let i=0; i < 1 ; i++) {
      const toTranslate = instructions[i]
      console.log(`translating: ${toTranslate} `)
      const payload = this.buildPayload(toTranslate)
      const response = await axios.request(payload);
      const audioPath = `${FileSystem.cacheDirectory}_${this.AUDIO_PREFIX}_${i}`
      console.log(audioPath)

      console.log(`voice response status: ${response.status}`)
      console.log(`saving to ${audioPath}`)
      await this.save(audioPath, response.data)
      audios.push(audioPath)
    }

    return audios

    //test
    // return ["file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fhalw.ai-09a1383f-4ef2-4716-8266-4fa9dcc05edc/_name_0"]

  }
}

export default VoiceApi;
