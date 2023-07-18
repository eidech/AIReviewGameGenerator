function createCard() {
  var card = CardService.newCardBuilder();
  
  // Create the first textbox
  var apiKeyTextBox = CardService.newTextInput()
    .setFieldName("apikey_textbox")
    .setTitle("ChatGPT API Key")
    .setHint("Enter your API Key");
  
  // Create the second textbox
  var subjectTextBox = CardService.newTextInput()
    .setFieldName("subject_textbox")
    .setTitle("Review Game Subject")
    .setHint("Enter the game subject");
  
  // Create the submit button
  var submitButton = CardService.newTextButton()
    .setText("Submit")
    .setOnClickAction(CardService.newAction()
      .setFunctionName("submitForm"));
  
  // Create the section for the form elements
  var formSection = CardService.newCardSection()
    .addWidget(apiKeyTextBox)
    .addWidget(subjectTextBox)
    .addWidget(submitButton);
  
  // Add the form section to the card
  card.addSection(formSection);
  
  // Build and return the card
  return card.build();
}

function submitForm(e) {
  var apiKey = e.formInput.apikey_textbox;
  var subject = e.formInput.subject_textbox;
  
  // Process the form data (e.g., log values, perform actions)
  Logger.log('API Key: ' + apiKey);
  Logger.log('Review Game Subject: ' + subject);

  main(apiKey, subject);
  
  return CardService.newActionResponseBuilder()
    .setNotification(CardService.newNotification()
      .setText("Form submitted successfully!"))
    .build();
}