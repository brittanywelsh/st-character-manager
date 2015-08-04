var CharacterController = (function () {

  /* Local Variables */
  var maxNumberOfCharacters = 15;
  var listOfCharacters = [];
  var indexOfSelectedCharacter = 0;

  /* Methods */
  var createNewCharacter = function(newCharacterName, sLevel, sGender, sAlignment) {
    try {
      // check whether character list is too big
      if (listOfCharacters.length >= maxNumberOfCharacters)
        throw "That's too many characters. You can only have " + maxNumberOfCharacters + " at a time. Try removing one of the active characters.";
      // create new character object
      var newCharacter = new Character(newCharacterName, sLevel, sGender, sAlignment);
      // add appropriate index:
      var newCharacterIndex = listOfCharacters.length;
      newCharacter.index = newCharacterIndex;
      // add to character list:
      listOfCharacters.push(newCharacter);
      indexOfSelectedCharacter = newCharacterIndex;
      // append the appropriate view objects:
      CharacterView.addToCharacterListView(newCharacter, newCharacterIndex);
      // console stuff...
      console.log("success! new listOfCharacters is:");
      listOfCharacters.forEach( function(item) {console.log(item.Name, item.index)});
    }
    catch (error) {
      alert(error);
      return null;
    }
  };

  var removeSelectedCharacterByIndex = function(CharacterIndex) {
    console.log("clicked a thing");
    try {
      // check whether character list is too big
      if (~ characterIndex) {
        throw "ERROR: Cannot remove character without appropriate index.";
      }
      // create new character object
      var newCharacter = new Character(newCharacterName, sLevel, sGender, sAlignment);
      // add appropriate index:
      var newCharacterIndex = listOfCharacters.length;
      newCharacter.index = newCharacterIndex;
      // add to character list:
      listOfCharacters.push(newCharacter);
      // append the appropriate view objects:
      CharacterView.addToCharacterListView(newCharacter, newCharacterIndex);
      // console stuff...
      console.log("success! new listOfCharacters is:");
      listOfCharacters.forEach( function(item) {console.log(item.Name, item.index)});
    }
    catch (error) {
      alert(error);
      return null;
    }
  };

  var selectCharacterByIndex = function(CharacterIndex) {
    indexOfSelectedCharacter = Number(CharacterIndex);
    return listOfCharacters[indexOfSelectedCharacter];
  }

  var getSelectedCharacter = function() {
    return listOfCharacters[indexOfSelectedCharacter];
  }

  /* Public Methods */
  return {
    createNewCharacter: createNewCharacter,
    getSelectedCharacter: getSelectedCharacter,
    selectCharacterByIndex: selectCharacterByIndex,
    removeSelectedCharacterByIndex: removeSelectedCharacterByIndex,
  };

})();

/* jQuery Event Hooks */

$(document).ready(function(){ 

  // Adds a new character.
  $("#button-new-character").on('click', function() {
    CharacterController.createNewCharacter("Betsy", 1, "gal", "bad");
  });

  // Change selected character.
  $("#character-list").on('click', 'li', function() {
    var indexString = this.id.substring(19);
    CharacterController.selectCharacterByIndex(indexString);
    console.log("clicked on (value):" + indexString);
    console.log("currently selected char:" + CharacterController.getSelectedCharacter(indexString).Name);
  });

  // Remove selected character from application memory.
  $("#button-remove-character").on('click', function() {
    CharacterController.removeSelectedCharacterByIndex();
  });

});


//Takes a given character and displays it.
/*function bindCharacterToView(Character){
  var id;*/
  /*
   * This function is actually two rolled into one.  The first changes the viewed
   * character to the one most recently clicked.  The second is the one which 
   * initially handles binding a character (i.e. without any clicking having 
   * occurred.
   */
/*  if (Character.target){
    id = Character.target.id;
    Character = listOfCharacters[$('#' + id).data("character-index")];
  }
  else{
    id = "Character" + Character.index;
  }
  
  $('.char').css('background', 'lightblue');
  $('#' + id).css('background', '#000');
};*/

