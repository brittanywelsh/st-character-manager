var AttributesController = (function () {

  /* Local Variables */
  var startingPoints: 15;
  var startingAttributeScore: 10;
  var minValueOfAttribute: 7;
  var maxValueOfAttribute: 18;

  /* Methods */
  var assignPointsToCharacterAttribute = function(cCharacter, sAttribute, nPoints) {
    if (cCharacter.BaseAttributeScore[sAttribute] == minValueOfAttribute && nPoints < 0){
      throw new Error("Value already at min!");
      return;
    }

    if (cCharacter.BaseAttributeScore[sAttribute] == maxValueOfAttribute && nPoints > 0){
      throw new Error("Value already at max!");
      return;
    }

    // nPoints = number of points to change BY (in this action)
    var newAttributeScore = cCharacter.BaseAttributeScore[sAttribute] + nPoints;
    var oldAttributeScore = cCharacter.BaseAttributeScore[sAttribute];
    var pointsNeeded = getPointsCost(newAttributeScore) - getPointsCost(oldAttributeScore);

    if (pointsNeeded > cCharacter.RemainingAttributeBuyPoints){
      throw new Error("Not enough points remaining");
    }
    else{                                  
      cCharacter.RemainingAttributeBuyPoints -= pointsNeeded;
      cCharacter.BaseAttributeScore[sAttribute] += nPoints;
    }     
  };

  /* Public Methods */
  return {
    assignPointsToCharacterAttribute: assignPointsToCharacterAttribute,
    assignAttribute: assignAttribute,
  };

})();


/* View/binding stuff - to refactor */
function ClearOldMessage(){
  document.getElementById("message").innerHTML = "";
}

function AssignAttribute(sAttributeName){
//  $("#"+sAttributeName).data("character-index", this.index); // for character selection
  $("#"+sAttributeName).text(this.AttributeScore(sAttributeName)); // for displaying the current attribute score
}

/* jQuery Event Hooks */

$(document).ready(function(){ 

  //Pushing any button clears message box
  $("button").on('click', ClearOldMessage);  
  
  // Add a point for an attribute
  $(".button-attribute-points").on('click', function() {
      var buttonID = event.target.id;
      var attribute = buttonID.substr(0, 3); // string.substr(start, length)
      var modifier; // +1 OR -1
      var selectedCharacter = CharacterController.getSelectedCharacter();

      switch(buttonID.slice(-1)) {
        case '-':
          modifier = -1;
          break;
        case '+':
          modifier = 1;
          break
      };

      try {
        AttributesController.assignPointsToCharacterAttribute(selectedCharacter, attribute, modifier);
      };

      catch(e) {
        $('#message').text(e.message);  
      };                            

      finally {
        $("#PTS").text(selectedCharacter.RemainingAttributeBuyPoints);
        $("#"+attribute).text(selectedCharacter.AttributeScore(attribute));  
      };
  });
});