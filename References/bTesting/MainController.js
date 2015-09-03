function initializeApplication() {
  console.log("Initializing application...");
  var newCharacter = CharacterController.createNewCharacter("Mario", 1, "M", "Good");
  AttributesView.generateViewOfAttributeBuyer( newCharacter );
}