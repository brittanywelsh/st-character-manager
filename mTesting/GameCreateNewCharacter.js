Game.CreateNewCharacter = function() {
  var ret = new Character(); 
  Game.AttributeList.forEach(
    function(sAttributeName){
      ret.Attributes[sAttributeName] = {
        BaseValue: Game.BaseAttributeBuy.StartingAttributeScore,
        ModificationValue: 0,                                    
        }
    });                    
    
  Game.StatsList.forEach(
    function (sStatName){
      ret.Stats[sStatName] = new Object();
  });
  return ret;      
}                                                                                               
