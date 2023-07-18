function main(apiKey, subject) {
  
  // Get the board data from test data in JSON format
  //const boardData = getBoardDataFromTestData();
  const boardData = getBoardDataFromChatGPT(apiKey, subject);

  // Parse the JSON to get the board in JavaScript Object
  const board = JSON.parse(boardData);

  // Create the Slides Presentation
  generateBoard(board);

}