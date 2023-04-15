import Constants from 'expo-constants';

const openApiKey = Constants.expoConfig.extra.openApiKey;

class GptApi {

  answer = async(prompt: string) => {

    console.log(`requesting gpt : ${openApiKey}` )
    const requestBody: RequestBody = {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 500,
      temperature: 0,
    };

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openApiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

      return response

  }
}

const Gpt = new GptApi()
export default Gpt;
