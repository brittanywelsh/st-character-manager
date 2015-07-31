function Game(){

  this.AttributeList = ["STR", "CON", "DEX", "INT", "WIS", "CHA"];
  this.BaseAttributeBuy =
    {
      StartingPoints: 15,
      StartingAttributeScore: 10
    };
  this.PointsCost = {
    "7":-4,
    "8":-2,
    "9":-1,
    "10":0,
    "11":1,
    "12":2,
    "13":3,
    "14":5,
    "15":7,
    "16":10,
    "17":13,
    "18":17
  }
                      
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
    ret.AttributeScore = function(sAttribute){
      return this.BaseAttributeScore[sAttribute] + this.AttributeModifier[sAttribute];
    };
    ret.RemainingAttributeBuyPoints = this.BaseAttributeBuy.StartingPoints;
    return ret;
  };
}
 

//Game.AttributeList = ["STR", "CON", "DEX", "INT", "WIS", "CHA"]; 