
$(document).ready(function(){ 

  //Attaches a click event listener to the + and - buttons that changes attribute values appropriately   
  Game.AttributeList.forEach(function(sAttributeName){
    $("#"+sAttributeName + "+").on('click', ChangeAttributePoints);
    $("#"+sAttributeName + "-").on('click', ChangeAttributePoints);
  });
  
  //Makes the screen display data for the first character
  BindCharacterToView(lCharacters[0]);
  
});

//Takes a given character and displays it.
function BindCharacterToView(Character){
  var id;
  /*
   * This function is actually two rolled into one.  The first changes the viewed
   * character to the one most recently clicked.  The second is the one which 
   * initially handles binding a character (i.e. without any clicking having 
   * occurred.
   */
  if (Character.target){
    id = Character.target.id;
    Character = lCharacters[$('#' + id).data("character-index")];
  }
  else{
    id = "Character" + Character.index;
  }
  
  $('.char').css('background', 'white');
  $('#' + id).css('background', 'lightgray');

  Game.AttributeList.forEach(AssignAttribute, Character);    
  
  $("#PTS").data("character-index", Character.index);
  $("#PTS").text(Character.RemainingAttributeBuyPoints);
  
  //Update Class stats
  UpdateClassStatsTable();
  $("#class-list-1").val(Character.Classes[0] || "select");
  $("#class-list-2").val(Character.Classes[1] || "select");
  $("#class-list-3").val(Character.Classes[2] || "select");
};
     
  
