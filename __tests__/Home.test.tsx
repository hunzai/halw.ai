import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Home from '../screens/Home';
import Gpt from '../src/api/Gpt';
import LocalStorage from '../src/utils/Storage';
import { Prompt } from '../src/api/Prompt';
import Nock from 'nock';

describe('Home', () => {
  beforeEach(() => {
    Nock.disableNetConnect();
  });

  afterEach(() => {
    Nock.cleanAll();
    Nock.enableNetConnect();
  });

  it('displays a "Let\'s Cook" button', () => {
    const { getByText } = render(<Home/>);
    const button = getByText('Let\'s Cook');
    expect(button).toBeDefined();
  });

  it('sends a prompt to Gpt when the "Let\'s Cook" button is pressed', async () => {
    const answer = { text: 'Test prompt' };
    const mockAnswer = { choices: [{ text: JSON.stringify(answer) }] };
    Nock('http://localhost:5000')
      .post('/answer', { prompt: Prompt.names() })
      .reply(200, mockAnswer);

    const { getByText } = render(<Home />);
    const button = getByText('Let\'s Cook');
    fireEvent.press(button);

    await waitFor(() => expect(Gpt.answer).toHaveBeenCalledTimes(1));
    expect(Gpt.answer).toHaveBeenCalledWith(Prompt.names());
    expect(LocalStorage.set).toHaveBeenCalledWith(answer);
  });

  it('displays an error message if the prompt request fails', async () => {
    Nock('http://localhost:5000')
      .post('/answer', { prompt: Prompt.names() })
      .reply(500, 'Internal Server Error');

    const { getByText } = render(<Home />);
    const button = getByText('Let\'s Cook');
    fireEvent.press(button);

    await waitFor(() => expect(Gpt.answer).toHaveBeenCalledTimes(1));
    expect(Gpt.answer).toHaveBeenCalledWith(Prompt.names());
    expect(getByText('Error')).toBeDefined();
  });
});
