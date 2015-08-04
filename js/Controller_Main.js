function Character(sName) {
  this.Name = sName || null;
  this.BaseAttributeScore = new Object();
  this.AttributeModifier = new Object();
  this.Classes = new Object();
  this.FeatsList = new Object();
  this.BaseClassStat = new Object();
  this.ClassStatsModifier = new Object();                              
  this.RemainingAttributeBuyPoints = 0;  
}
  
/*Character.prototype.HasClass = function (sClassName){
  return (sClassName in this.Classes); 
}*/

/*Character.prototype.AttributeScore = function (sAttributeName){
  return this.BaseAttributeScore[sAttributeName] + //
    this.AttributeModifier[sAttributeName];
}*/

/*function addToCharacterList(Character, CharacterListIndex){
  var newTab = document.createElement("li");
  newTab.innerHTML = '<a href="#charactersheet-' + Character.index + '">' + (Character.Name || 'Character ' + Character.index) + '</a>';
  newTab.className = "tab-title";
  newTab.id = "Character" + toString(CharacterListIndex);
  $("#" + newTab.id).data("character-index", CharacterListIndex);
  document.getElementById("character-list").appendChild(newTab);
}*/

/*function removeFromCharacterList(Character, CharacterListIndex){
  var characterList = document.getElementById("character-list");
  characterList.removeChild(characterList.childNodes[CharacterListIndex]);
}*/


function encloseInHeadingTags(string) {
  outputString = '<h2>' + string + '</h2>';
  return outputString;
}

function encloseInCenteredDiv(string) {
  outputString = '<div align="center">' + string + '</div>';
  return outputString;
}

function generateViews() {
  generateViewOfCharacterSheet( listOfCharacters[0] );
  console.log("this got called");
}

function generateViewOfCharacterSheet(Character) {
  var viewTitle = encloseInHeadingTags(Character.Name || 'Character ' + Character.index);
  var viewButtons = '\
    <a href="#" class="medium success button">Save</a>\
    <a href="#" class="medium button">Print</a>\
    <a href="#" class="medium alert button">Delete</a>\
    ';
  var viewHeader = encloseInCenteredDiv( viewTitle + viewButtons );
  $("#div-character-sheet").html(viewHeader);
}

// Two characters are made here for testing purposes.
/*listOfCharacters.push(createNewCharacter());
listOfCharacters[0].index = 0;
addToCharacterList(listOfCharacters[0]);
listOfCharacters.push(createNewCharacter());
listOfCharacters[1].index = 1;
addToCharacterList(listOfCharacters[1]);*/

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


/* */ /* */ /* */ /* */ /* */ /* */ /* */ /* */ 



/* controller vairables */
var maxNumberOfCharacters = 4;
var listOfCharacters = [];

/* controller */
/*function createNewCharacter() {
  console.log("enter create new character routine...");
  try {
    if (listOfCharacters.length > maxNumberOfCharacters)
      throw "Too many characters. You can only have " + maxNumberOfCharacters + " characters.";
    var newCharacter = new Character();
    newCharacter.index = listOfCharacters.length-1;
    listOfCharacters.push(newCharacter);
  }
  catch (error) {
    console.log("error caught...");
    alert(error);
    return null;
  }
  return newCharacter;      
}*/

function createNewCharacter() {
  console.log("enter createNewCharacter function");
  var newCharacter = new Character();
  newCharacter.index = listOfCharacters.length-1;
  listOfCharacters.push(newCharacter);
  console.log("DONE: createNewCharacter function");
}

/* controller */
$(document).ready(function(){ 
  // Add a new character when the approprite button is pushed.
  $("#button-new-character").on('click', function() {
    console.log("test - you pushed the 'create new character' button!");
    createNewCharacter();
  });

  //Sets up the infrastructure for switching characters when the character name is pushed
//  $("#character-list").on('click', 'li', bindCharacterToView);

  //Makes the screen display data for the first character
//  bindCharacterToView(listOfCharacters[0]);
});
