interface TextCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: [{
    text: string[];
    index: number;
    logprobs: any;
    finish_reason: string;
    response?: {
      steps: string[];
    };
  }];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface PromptText {
  sentences: string[];
}
