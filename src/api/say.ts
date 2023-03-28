import Constants from "expo-constants";
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import { Buffer } from "buffer";

const elevenLabsApiKey = Constants.expoConfig.extra.elevenLabsApiKey;

class VoiceApi   {
    
    async translate(textToSpeak) {
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

    const fileUri = `${FileSystem.cacheDirectory}_chat.mp3`;
    await FileSystem.writeAsStringAsync(fileUri, song, { encoding: FileSystem.EncodingType.Base64 });
    // await Sharing.shareAsync(fileUri);
    }
  };

  const VoiceApiInstance = new VoiceApi()
  export default VoiceApiInstance;