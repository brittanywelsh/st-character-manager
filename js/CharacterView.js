var CharacterView = (function () {

  /* Local Variables */
  h = HTMLShortcuts;

  /* Methods */
  var addToCharacterListView = function(character) {
    var newTab = document.createElement("li");
    newTab.innerHTML = '<a href="#">' + (character.Name || 'Character ' + character.index) + '</a>';
    document.getElementById("character-list").appendChild(newTab);
  };

  var removeFromCharacterListView = function(characterListIndex){
    var characterList = document.getElementById("character-list");
    characterList.removeChild(characterList.childNodes[characterListIndex]);
  };

  var updateListOfCharacters = function(listOfCharacters) {
    
  }

  var updateViewOfCharacterSheet = function(character) {
    // Header: name, level, buttons
    var viewName = h.encloseInHeading(character.Name || 'Character ' + character.index);
    var viewLevel = h.encloseInP('Level ' + character.Level);
    var viewHeader = h.encloseInCenteredDiv(viewName + viewLevel);

    // Summary: info, race, classes
    var infoValues = [
      h.encloseInB('Gender:'), character.Gender,
      h.encloseInB('Alignment:'), character.Alignment,
      h.encloseInB('Race:'), character.Race,
    ];
    var classValues = [
      h.encloseInB('Classes:'), '[class 1]', '', '[class 2]', '', '[class 2]',      
    ]
    var viewInfo = h.f_encloseInGrid(3, 2, [6,6], infoValues);
    var viewClasses = h.f_encloseInGrid(3, 2, [5,7], classValues);
    var viewSummary = 
      h.encloseInSubheading('Summary') +
      h.f_encloseInGrid(1, 2, [6,6], [viewInfo, viewClasses]);

    // Stats: attributes, class stats
    var attributesValues = [
      '<p></p>', '<p></p>', h.encloseInB('Mod.'),
      h.encloseInCenteredDiv(h.encloseInB('STR')), h.encloseInCenteredDiv('4'), h.encloseInCenteredDiv('+1'),
      h.encloseInCenteredDiv(h.encloseInB('DEX')), h.encloseInCenteredDiv('7'), h.encloseInCenteredDiv('+7'),
      h.encloseInCenteredDiv(h.encloseInB('CON')), h.encloseInCenteredDiv('10'), h.encloseInCenteredDiv('+12'),
      h.encloseInCenteredDiv(h.encloseInB('WIS')), h.encloseInCenteredDiv('4'), h.encloseInCenteredDiv('+1'),
      h.encloseInCenteredDiv(h.encloseInB('INT')), h.encloseInCenteredDiv('4'), h.encloseInCenteredDiv('+1'),
      h.encloseInCenteredDiv(h.encloseInB('CHA')), h.encloseInCenteredDiv('4'), h.encloseInCenteredDiv('+1'),
    ]

    // Get character's base stats
    var stats = character.Stats;
    var baseStatsValues = [];
    for (var statKey in stats) {
      if (stats.hasOwnProperty(statKey)) {
        var statValue = character.Stats[statKey];
        baseStatsValues.push(
          h.encloseInB(statKey)
        );
        baseStatsValues.push(
          h.encloseInCenteredDiv(statValue)
        );
      }
    }

    var viewAttributes = h.f_encloseInGrid(7, 3, [5,3,4], attributesValues);
    var viewBaseStats = h.f_encloseInGrid(baseStatsValues.length/2, 2, [8,4], baseStatsValues);
    var viewStats =
      h.encloseInSubheading('Stats') +
      h.f_encloseInGrid(1, 3, [5,1,6], [viewAttributes, '', viewBaseStats])
    ;

    // Skills

    var skillsTestingMuchThanks = '\
    <ul class="accordion" data-accordion>\
      <li class="accordion-navigation">\
        <a href="#panel1c">Accordion 1</a>\
        <div id="panel1c" class="content active">\
          Panel 1. Lorem ipsum dolor\
        </div>\
      </li>\
      <li class="accordion-navigation">\
        <a href="#panel2c">Accordion 2</a>\
        <div id="panel2c" class="content">\
          Panel 2. Lorem ipsum dolor\
        </div>\
      </li>\
      <li class="accordion-navigation">\
        <a href="#panel3c">Accordion 3</a>\
        <div id="panel3c" class="content">\
          Panel 3. Lorem ipsum dolor\
        </div>\
      </li>\
    </ul>';

    var viewSkills =
      h.encloseInSubheading('Skills') + skillsTestingMuchThanks;
    ;

    $("#character-sheet").html(
      viewHeader +
      viewSummary +
      viewStats +
      viewSkills
    );
  };

  /* Public Methods */
  return {
    addToCharacterListView: addToCharacterListView,
    removeFromCharacterListView: removeFromCharacterListView,
    updateViewOfCharacterSheet: updateViewOfCharacterSheet,
  };

})();
