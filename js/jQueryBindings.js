$(document).ready(function(){ 

  // Adds a new character.
  $("#button-new-character").on('click', function() {
    CharacterController.createNewCharacter();
  });

  // Remove selected character from application memory.
  $("#button-remove-character").on('click', function() {
    CharacterController.removeSelectedCharacter();
  });

  // Change selected character.
  $("#dropdown-character-list").on('click', 'li', function() {
    var indexOfNode = HTMLShortcuts.getIndexOfChildNode(this);
    CharacterController.selectCharacterByIndex(indexOfNode);
  });

  // For text input -> name
  $("#input-name").on('input', function() {
    var character = CharacterController.getSelectedCharacter();
    character.Name = $("#input-name").val();
    CharacterView.updateViewOfCharacterSheet(character);
  });

});