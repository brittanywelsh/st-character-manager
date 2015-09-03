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
      if (listOfCharacters.length >= maxNumberOfCharacters) {
        throw errorMessage_MaxNumberOfCharacters;
      };

      // Create new character object and add appropriate index:
      var newCharacter = new Character(sName, sLevel, sGender, sAlignment);
      var newCharacterIndex = listOfCharacters.length;
      newCharacter.index = newCharacterIndex;

      // Add to character list:
      listOfCharacters.push(newCharacter);
      indexOfSelectedCharacter = newCharacterIndex;

      // Update views:
      CharacterView.addToCharacterListView(newCharacter);
      CharacterView.updateViewOfCharacterSheet(newCharacter);
    }

    catch (error) {
      alert(error);
      return null;
    }

    return newCharacter;
  };

  var selectCharacterByIndex = function(characterIndex) {
    // Update selected character:
    indexOfSelectedCharacter = Number(characterIndex);

    // Update the view to display the selected character:
    var selectedCharacter = listOfCharacters[indexOfSelectedCharacter];
    CharacterView.updateViewOfCharacterSheet(selectedCharacter);

    return selectedCharacter;
  };

  var getSelectedCharacter = function() {
    var selectedCharacter = listOfCharacters[indexOfSelectedCharacter];
    return selectedCharacter;
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

    // If removing the LAST character, generate a new blank character:
    if (listOfCharacters.length == 0) {
      createNewCharacter();
    }

    // Update selected character & view:
    indexOfSelectedCharacter = 0;
    var selectedCharacter = listOfCharacters[indexOfSelectedCharacter];
    CharacterView.updateViewOfCharacterSheet(selectedCharacter);
  };

  /* Public Methods */
  return {
    createNewCharacter: createNewCharacter,
    selectCharacterByIndex: selectCharacterByIndex,
    getSelectedCharacter: getSelectedCharacter,
    removeSelectedCharacter: removeSelectedCharacter,
  };

})();
