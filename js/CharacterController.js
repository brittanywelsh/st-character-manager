var CharacterController = (function () {

  /* Local Variables */
  var maxNumberOfCharacters = 15; // should inherit from Application Properties
  var listOfCharacters = [];
  var indexOfSelectedCharacter = 0;

  /* Messages */
  var errorMessage_MaxNumberOfCharacters = "That's too many characters. You can only have " + maxNumberOfCharacters + " at a time. Try removing one of the active characters.";

  /* Methods */
  var createNewCharacter = function(sName, sLevel, sGender, sAlignment) {
    try {
      // Check whether the existing character list is too big:
      if (listOfCharacters.length >= maxNumberOfCharacters)
        throw errorMessage_MaxNumberOfCharacters;
      // Create new character object and add appropriate index:
      var newCharacter = new Character(sName, sLevel, sGender, sAlignment);
      var newCharacterIndex = listOfCharacters.length;
      newCharacter.index = newCharacterIndex;
      // Add to character list:
      listOfCharacters.push(newCharacter);
      indexOfSelectedCharacter = newCharacterIndex;
      // Update corresponding view:
      CharacterView.addToCharacterListView(newCharacter, newCharacterIndex);
/*      // console stuff:
      console.log("success! new listOfCharacters is:");
      listOfCharacters.forEach( function(item) {console.log(item.Name, item.index)}); */
    }
    catch (error) {
      alert(error);
      return null;
    }
  };

  var selectCharacterByIndex = function(characterIndex) {
    indexOfSelectedCharacter = Number(characterIndex);
    return listOfCharacters[indexOfSelectedCharacter];
  };

  var getSelectedCharacter = function() {
    return listOfCharacters[indexOfSelectedCharacter];
  };

  var removeSelectedCharacter = function() {
    // Remove character object from list, via array methods:
    if (indexOfSelectedCharacter == 0) {
      listOfCharacters.shift();
    }
    else {
      listOfCharacters.splice(indexOfSelectedCharacter, 1);
    };
    // Remove from view objects:
    CharacterView.removeFromCharacterListView(indexOfSelectedCharacter);
    // Update character indices for the remaining characters:
    for (i = 0; i < listOfCharacters.length; i++) {
      listOfCharacters[i].index = i;
    };
    // Update selected character:
    indexOfSelectedCharacter = 0;
    // If removing the LAST character, generate a new blank character:
    if (listOfCharacters.length == 0) {
      createNewCharacter();
    }
/*    // console stuff...
    console.log("removed a character. new listOfCharacters is:");
    listOfCharacters.forEach( function(item) {console.log(item.Name, item.index)}); */
  };

  /* Public Methods */
  return {
    createNewCharacter: createNewCharacter,
    selectCharacterByIndex: selectCharacterByIndex,
    getSelectedCharacter: getSelectedCharacter,
    removeSelectedCharacter: removeSelectedCharacter,
  };

})();

/* jQuery Event Hooks */

$(document).ready(function(){ 

  // Adds a new character.
  $("#button-new-character").on('click', function() {
    CharacterController.createNewCharacter();
  });

  // Change selected character.
  $("#character-list").on('click', 'li', function() {
    var indexOfNode = HTMLShortcuts.getIndexOfChildNode(this);
    CharacterController.selectCharacterByIndex(indexOfNode);
  });

  // Remove selected character from application memory.
  $("#button-remove-character").on('click', function() {
    CharacterController.removeSelectedCharacter();
  });

});
