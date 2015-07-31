var gInstance = new Game();
var lCharacters = [];

lCharacters.push(gInstance.CreateNewCharacter());
lCharacters.push(gInstance.CreateNewCharacter());

lCharacters[0].index = 0;
lCharacters[1].index = 1;

$(document).ready(function(){                    
  $("button").on('click', ClearOldMessage);//Pushing any button clears message box
  $("#add-char").on('click', function(){
    lCharacters.push(gInstance.CreateNewCharacter());
    lCharacters[lCharacters.length - 1].index = lCharacters.length - 1;
    AddToViewList(lCharacters[lCharacters.length - 1]);
  }); 
  
  $("#char-list").on('click', 'td', BindCharacterToView);//Sets up the infrastructure for switching characters
   
  $('#Character0').css('background', 'lightgray');//Sets selected character to gray
    
  gInstance.AttributeList.forEach(function(sAttributeName){
  //Attaches a click event listener to the + and - buttons that changes attribute values appropriately 
    $("#"+sAttributeName + "+").on('click', ChangeAttributePoints);
    $("#"+sAttributeName + "-").on('click', ChangeAttributePoints);
  });
                                                                                              
  lCharacters.forEach(AddToViewList); //Adds existing characters to the list of viewable characters
  BindCharacterToView(lCharacters[0]);//Makes the screen display data for the first character
});

function AddToViewList(Character){
  var CharViewList = document.getElementById("char-list");
  var newRow = CharViewList.insertRow(Character.index);
  var newCell = newRow.insertCell(0);
  newCell.innerHTML = Character.Name || "Character " + Character.index; 
  newCell.className = "char";
  newCell.id = "Character" + Character.index;   
  $("#" + newCell.id).data("character-index", Character.index);

}

function BindCharacterToView(Character){
  var id;
  if (Character.target){
    id = Character.target.id;
    Character = lCharacters[$('#' + id).data("character-index")];
  }
  else{
    id = "Character" + Character.index;
  }
  
  $('.char').css('background', 'white');
  $('#' + id).css('background', 'lightgray');

  gInstance.AttributeList.forEach(AssignAttribute, Character);
    
  
  $("#PTS").data("character-index", Character.index);
  $("#PTS").text(Character.RemainingAttributeBuyPoints);
};
  

function AssignAttribute(sAttributeName){

  $("#"+sAttributeName).data("character-index", this.index);
  $("#"+sAttributeName).text(this.AttributeScore(sAttributeName));
  
}            
  

function ChangeAttributePoints(event){

  var buttonID = event.target.id;
  var attribute = buttonID.substr(0, 3);// string.substr(start, length)
  var modifier;
  var Character = lCharacters[$("#"+attribute).data("character-index")];
    
  switch(buttonID.slice(-1)){
    case '-':
      modifier = -1;
      break;
    case '+':
      modifier = 1;
      break
  }
  
  if (Character.BaseAttributeScore[attribute] == 7 && modifier == -1){
    $("#message").text("Value already at min");
    return;
  }                                

  
  if (Character.BaseAttributeScore[attribute] == 18 && modifier == 1){
    $("#message").text("Value already at max");
    return;
  }                         
  

  var pointsNeeded = gInstance.PointsCost[Character.BaseAttributeScore[attribute] + modifier]//
   - gInstance.PointsCost[Character.BaseAttributeScore[attribute]];
    
  if (pointsNeeded > Character.RemainingAttributeBuyPoints){
    $("#message").text("Not enough points remaining")
  }
  else{                                  
    Character.RemainingAttributeBuyPoints -= pointsNeeded;
    Character.BaseAttributeScore[attribute] += modifier;
    $("#PTS").text(Character.RemainingAttributeBuyPoints);
    $("#"+attribute).text(Character.AttributeScore(attribute));
  }     
}

function ClearOldMessage(){
  document.getElementById("message").innerHTML = "";
}