import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY = 'gpt';

class Storage {

  async set(gptResponse: PromptText) {
    console.log(`save locally: ${gptResponse}`)
    await  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(gptResponse));
  }

  async get() {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        console.log(`parsing from storage: ${value} `)
        const textCompletion = JSON.parse(value) as PromptText
        return textCompletion;
      }
    } catch (e) {
      console.error(e);
    }
  }
}

const LocalStorage = new Storage()
export default LocalStorage;
