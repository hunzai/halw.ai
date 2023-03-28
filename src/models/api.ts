interface APIResponse {
    choices: {
      text: string;
      index: number;
      logprobs: any;
      finish_reason: string;
    }[];
  }
  
  interface RequestBody {
    model: string;
    prompt: string;
    max_tokens: number;
    temperature: number;
  }
  