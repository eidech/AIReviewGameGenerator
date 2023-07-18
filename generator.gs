function generateBoard(board) {

  // Create a new slide presentation
  const presentation = SlidesApp.getActivePresentation();

  // Create the title slide
  const titleSlide = presentation.getSlides()[0];
  titleSlide.getShapes()[0].getText().setText(`${board.Name} - ${getCurrentDate()}`);

  // Create the game board slide
  const boardSlide = presentation.appendSlide();
  const grid = boardSlide.insertTable(6, 6);
  const categoryRow = grid.getRow(0);
  const valueRow = grid.getRow(1);

  // Set category names in the first row
  for (let i = 0; i < board.Categories.length; i++) {
    const category = board.Categories[i];
    categoryRow.getCell(i).getText().setText(category.Name);
  }

  // Set question values in boxes underneath
  for (let i = 0; i < board.Categories.length; i++) {
    const category = board.Categories[i];
    var categoryCol = grid.getColumn(i)
    for (let j = 0; j < category.Boxes.length; j++) {
      const box = category.Boxes[j];
      categoryCol.getCell(j + 1).getText().setText(box.Value.toString());
    }
  }

  // Iteratively create the question and answer slides
  for (let i = 0; i < board.Categories.length; i++) {
    const category = board.Categories[i];
    for (let j = 0; j < category.Boxes.length; j++) {
      const box = category.Boxes[j];

      // Create question slide
      const questionSlide = presentation.appendSlide();
      const questionTextBox = questionSlide.insertTextBox(box.Question, 0, 0, 720, 405);
      questionTextBox.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE);

      // Create answer slide
      const answerSlide = presentation.appendSlide();
      const answerTextBox = answerSlide.insertTextBox(box.Answer, 0, 0, 720, 405);
      answerTextBox.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE);
      answerTextBox.setLinkSlide(boardSlide);

      // Link value text from board slide to question slide
      const valueTextRange = grid.getCell(j + 1, i).getText();
      valueTextRange.getTextStyle().setLinkSlide(questionSlide);
    }
  }
}

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}