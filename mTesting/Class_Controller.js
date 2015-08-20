

$(document).ready(function (){
  Object.getOwnPropertyNames(Game.Classes).forEach(function (NewClass){
    for (i = 1; i <= 3; i++){
      $("#class-list-"+i).data("lastSelection", null);
      
      var newOption = document.createElement("option");
      newOption.id = Game.Classes[NewClass].ClassName + i;
      newOption.innerHTML = Game.Classes[NewClass].ClassName;
      newOption.value = Game.Classes[NewClass].ClassName;
      document.getElementById("class-list-" + i).appendChild(newOption);
    }
  });
  
  for (i = 1; i <= 3; i++){
    $("#class-list-"+i).on("change", BindClassToChar);
  } 
  
  var classStatsTable = document.getElementById("ClassStatsTable");
  Game.StatsList.forEach(function (sStat) {
    var cCurrentCharacter = lCharacters[$('#STR').data('character-index')];
    var newRow = classStatsTable.insertRow();
    var newLabelCell = newRow.insertCell(0);
    var newDataCell = newRow.insertCell(1);
    
    newLabelCell.innerHTML = sStat;
    newDataCell.id = sStat; 
  });
    UpdateClassStatsTable();
});

function BindClassToChar(event){
  var nIndex = event.target.id.substr(event.target.id.length - 1);
  var sClass = event.target.value;
  var sPreviousClass = $('#' + event.target.id).data("lastSelection");                                                                                          
  var cCurrentCharacter = lCharacters[$("#STR").data("character-index")]
  
  Game.RemoveClassFromChar(sPreviousClass, cCurrentCharacter);
  Game.AddClassToChar(sClass, cCurrentCharacter);
  
  $('#' + event.target.id).data("lastSelection", sClass); 
  
  UpdateClassStatsTable();
  
  for (i = 1; i <= 3; i++){        
    if (i != nIndex){
      $('#'+ sPreviousClass + i).removeAttr('disabled');
      $('#' + sClass + i).attr('disabled', 'disabled');//.siblings().removeAttr('disabled'); this is cool
    }
  }
  
}

function UpdateClassStatsTable(){
  var cCurrentCharacter = lCharacters[$("#STR").data("character-index")];
  Game.StatsList.forEach(function (sStat){                               
    //console.log(cCurrentCharacter.Stats[sStat], cCurrentCharacter.StatScore[sStat]);
    if (sStat == "HitDice"){ 
      var nDieValue = 6 + 2*cCurrentCharacter.StatScore(sStat);
      $('#HitDice').text('D' + nDieValue);
    }                                                                              
    else{
      $('#' + sStat).text(cCurrentCharacter.StatScore(sStat)); 
    } 
  }); 
}