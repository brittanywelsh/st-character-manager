$(document).ready(function(){                    
  $("button").on('click', ClearOldMessage);//Pushing any button clears message box
  ["STR", "CON", "DEX", "INT", "WIS", "CHA", "PTS"].forEach(AssignAttribute);     
  //The above builds the infrastucture between the view and this controller
});


function AssignAttribute(sAttributeName){
  var val = 10;
  if (sAttributeName == "PTS") val = 15;
  $("#"+sAttributeName).data("value", val);
  $("#"+sAttributeName).text($("#"+sAttributeName).data("value"));
  $("#"+sAttributeName + "+").on('click', ChangeAttributePoints);
  $("#"+sAttributeName + "-").on('click', ChangeAttributePoints); 
}                
  

function ChangeAttributePoints(){

  var buttonID = event.target.id;
  var attribute = buttonID.substr(0, 3);// string.substr(start, length)
  var modifier;         
  
  switch(buttonID.slice(-1)){
    case '-':
      modifier = -1;
      break;
    case '+':
      modifier = 1;
      break
  }
  
  var attributeValue = $("#"+attribute).data("value");

  if (attributeValue == 7 && modifier == -1){
    $("#message").text("Value already at min");
    return;
  }                                

  
  if (attributeValue == 18 && modifier == 1){
    $("#message").text("Value already at max");
    return;
  }                         
  

  var PTS = $("#PTS").data("value");                                   
  var pointsNeeded = PointsCost(attributeValue + modifier)//
   - PointsCost(attributeValue);
    
  if (pointsNeeded > PTS){
    $("#message").text("Not enough points remaining")
  }
  else{
    $("#PTS").data("value", PTS - pointsNeeded);
    $("#PTS").text($("#PTS").data("value"));
    $("#"+attribute).data("value", attributeValue + modifier);
    $("#"+attribute).text($("#"+attribute).data("value"));
  }     
}

function PointsCost(attributeValue){
  
    switch(attributeValue){
    case 7:
      return -4;
       
    case 8:    
      return -2;  
      
    case 9:
      return -1;        
      
    case 10:
      return 0;        
      
    case 11:
      return 1;        
      
    case 12:
      return 2;        
      
    case 13:
      return 3;        
      
    case 14:
      return 5;         
      
    case 15:
      return 7;        
      
    case 16:
      return 10;        
      
    case 17:
      return 13;
      
    case 18:
      return 17;        
  }
}

function ClearOldMessage(){
  document.getElementById("message").innerHTML = "";
}