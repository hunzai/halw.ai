
class Prompter {

  names() {
    const prompt =
    'Food and Beverages' +
    '\nTopic: Create a healthy receipe in Urdu language' +
    '\nTask: Create a simple chicken biryani '+
    '\nConstraints:  Keep the steps to prepare to max 10 steps' +
    '\nAdditional prompts:  convert choices text to a json with structure { "sentences": [] }. Add recipe steps in sentences array'

    return prompt
  }

  receipt() {
     const prompt =
    "Act like the most famous Chef." +
    "\nTopic: Food and Nutrition" +
    "\nContext: Cooking food at home that is nutritious, cheaper and easy to prepare" +
    "\nTask: Write a recipe of chicken biryani that is traditional and tasty. Respons should be in two sections, first section will contain ingredients and then second will contain steps to prepare the Biryani" +
    "\nConstraints:  Make it simple and clear" +
    '\nAdditional prompts: Create a response in a  json. The json should match the following json structure. { "receipe_name":"", "ingredients": [], "steps": [] }';
    return prompt
  }
}


export const  Prompt = new Prompter()
