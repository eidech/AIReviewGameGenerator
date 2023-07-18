function getBoardDataFromChatGPT(apiKey, subject) {

  const baseUrl = "https://api.openai.com/v1/chat/completions";
  const prompt = `Create a Jeopardy style game using the following JSON format with exact property and object names: { Name, Categories { Name, Boxes {Question, Answer, Value}}}. Respond ONLY with JSON. There should be 6 categories and 5 boxes per category with values of 100, 200, 300, 400, and 500. User will give game subject.`;
  const userMessage = { role: 'user', content: subject };
  const systemMessage = { role: 'system', content: prompt };
  const messages = [userMessage, systemMessage];

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    payload: JSON.stringify({
      messages: messages,
      max_tokens: 4000,
      model: 'gpt-3.5-turbo'
    })
  };

  const response = UrlFetchApp.fetch(baseUrl, requestOptions);
  const responseData = JSON.parse(response.getContentText());
  const generatedBoardData = responseData.choices[0].message.content;
  Logger.log(generatedBoardData);
  return generatedBoardData;

}