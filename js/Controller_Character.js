var listOfCharacters = [];
var maxNumberOfCharacters = 4;

// Two characters are made here for testing purposes.
listOfCharacters.push(createNewCharacter());
listOfCharacters[0].index = 0;
addToViewList(listOfCharacters[0]);
listOfCharacters.push(createNewCharacter());
listOfCharacters[1].index = 1;
addToViewList(listOfCharacters[1]);

function createNewCharacter() {
  try {
  	if (listOfCharacters.length > maxNumberOfCharacters)
		  throw "Too many characters. You can only have " + maxNumberOfCharacters + " characters.";
    var newCharacter = new Character();
  }
  catch (error) {
  	alert(error);
  	return null;
  }
  return newCharacter;      
}

$(document).ready(function(){ 

  //Adds a new character when the appropriate button is pushed.
  $("#button-new-character").on('click', function() {
    createNewCharacter();
  });

  //Sets up the infrastructure for switching characters when the character name is pushed
  $("#character-list").on('click', 'li', bindCharacterToView);

  //Makes the screen display data for the first character
  bindCharacterToView(listOfCharacters[0]);

});

//Takes a given character and displays it.
function bindCharacterToView(Character){
  var id;
  /*
   * This function is actually two rolled into one.  The first changes the viewed
   * character to the one most recently clicked.  The second is the one which 
   * initially handles binding a character (i.e. without any clicking having 
   * occurred.
   */
  if (Character.target){
    id = Character.target.id;
    Character = listOfCharacters[$('#' + id).data("character-index")];
  }
  else{
    id = "Character" + Character.index;
  }
  
  $('.char').css('background', 'lightblue');
  $('#' + id).css('background', '#000');
};
