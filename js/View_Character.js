function addToCharacterList(Character, CharacterListIndex){
  var newTab = document.createElement("li");
  newTab.innerHTML = '<a href="#charactersheet-' + Character.index + '">' + (Character.Name || 'Character ' + Character.index) + '</a>';
  newTab.className = "tab-title";
  newTab.id = "Character" + toString(CharacterListIndex);
  $("#" + newTab.id).data("character-index", CharacterListIndex);
  document.getElementById("character-list").appendChild(newTab);
}

function removeFromCharacterList(Character, CharacterListIndex){
  var characterList = document.getElementById("character-list");
  characterList.removeChild(characterList.childNodes[CharacterListIndex]);
}


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