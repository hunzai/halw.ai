
class Prompter {

  names() {
    const prompt =
    "Act like algorithm that creates new names" +
    "\nTopic: Names for male and female in Ancient world" +
    "\nTask: Generate 3 names based on Ancient European cultures"+
    "\nConstraints:  Generate names with max 5 characters" +
    '\nAdditional prompts: Create a response in a json and add names to the steps array. The json should match the following json structure. { "steps": [] }';

    return prompt
  }

  receipt() {
     const prompt =
    "Act like the most famous Chef." +
    "\nTopic: Food and Nutrition" +
    "\nContext: Cooking food at home that is nutritious, cheaper and easy to prepare" +
    "\nTask: Write a recipe of chicken biryani that is traditional and tasty. Respons should be in two sections, first section will contain ingredients and then second will contain steps to prepare the Biryani" +
    "\nConstraints:  Make it simple and clear" +
    '\nAdditional prompts: Create a response in a  json. The json should match the following json structure. { "ingredients": [], "steps": [] }';
    return prompt
  }
}


export const  Prompt = new Prompter()
