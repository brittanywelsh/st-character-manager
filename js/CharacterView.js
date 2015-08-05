var CharacterView = (function () {

  /* Local Variables */
  h = HTMLShortcuts;

  /* Methods */
  var addToCharacterListView = function(Character, CharacterListIndex) {
    var newTab = document.createElement("li");
    newTab.innerHTML = '<a href="#">' + (Character.Name || 'Character ' + CharacterListIndex) + '</a>';
    newTab.className = "character-selector";
    newTab.id = newTab.className + "-" + CharacterListIndex;
    document.getElementById("character-list").appendChild(newTab);
    generateViews();
  };

	var removeFromCharacterListView = function(CharacterListIndex){
	  var characterList = document.getElementById("character-list");
	  characterList.removeChild(characterList.childNodes[CharacterListIndex]);
	};

	var generateViewOfCharacterSheet = function(Character) {
	  var viewTitle = h.encloseInHeadingTags(Character.Name || 'Character ' + Character.index);
	  var viewButtons = '\
	    <a href="#" class="medium success button">Save</a>\
	    <a href="#" class="medium button">Print</a>\
	    <a href="#" class="medium alert button">Delete</a>\
	    ';
	  var viewHeader = h.encloseInCenteredDiv( viewTitle + viewButtons );
		$("#character-sheet").html(viewHeader);
	};

	var generateViews = function(listOfCharacters) {
		//CharacterView.generateViewOfCharacterSheet( listOfCharacters[0] );
		console.log("this got called");
	};

  /* Public Methods */
  return {
    addToCharacterListView: addToCharacterListView,
    removeFromCharacterListView: removeFromCharacterListView,
  };

})();
