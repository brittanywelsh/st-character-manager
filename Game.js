function Game(){

//  this.ListOfCharacters =[];
  this.AttributeList = ["STR", "CON", "DEX", "INT", "WIS", "CHA"];
  this.BaseAttributeBuy =
  {
    StartingPoints: 15,
    StartingAttributeScore: 10
  };                      
  this.CreateNewCharacter = function() {
    var ret = new Object();
    ret.BaseAttributeScore =
    {                                   
      STR: this.BaseAttributeBuy.StartingAttributeScore,
      CON: this.BaseAttributeBuy.StartingAttributeScore,
      DEX: this.BaseAttributeBuy.StartingAttributeScore,
      INT: this.BaseAttributeBuy.StartingAttributeScore,
      WIS: this.BaseAttributeBuy.StartingAttributeScore,
      CHA: this.BaseAttributeBuy.StartingAttributeScore
    };
    ret.AttributeModifier = {
      STR: 0,
      CON: 0,
      DEX: 0,
      INT: 0,
      WIS: 0,
      CHA: 0
    };
    ret.AttributeScore = { 
      STR: ret.BaseAttributeScore.STR + ret.AttributeModifier.STR,
      CON: ret.BaseAttributeScore.CON + ret.AttributeModifier.CON,
      DEX: ret.BaseAttributeScore.DEX + ret.AttributeModifier.DEX,
      INT: ret.BaseAttributeScore.INT + ret.AttributeModifier.INT,
      WIS: ret.BaseAttributeScore.WIS + ret.AttributeModifier.WIS,
      CHA: ret.BaseAttributeScore.CHA + ret.AttributeModifier.CHA
    };  
    return ret;
  };
  
}
