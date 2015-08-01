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
  
  this.BaseClassStatsList = ["HitDice", "SkillsPerLevel", "BaseAttack",// 
    "BaseDefence", "BaseInitiative", "Charges", "BaseMutations", "BaseWill",//
    "BaseFortitude", "BaseReflex"];
  this.BaseClassStatsInitialScore = 0;
  this.Classes = new Object();
                      
  this.CreateNewCharacter = function() {
    var ret = new Character(); 
    var self = this;
    ret.RemainingAttributeBuyPoints = this.BaseAttributeBuy.StartingPoints;
    this.AttributeList.forEach(
      function(sAttributeName){
        ret.BaseAttributeScore[sAttributeName] = self.BaseAttributeBuy.StartingAttributeScore;
        ret.AttributeModifier[sAttributeName] = 0;
      }                  
    this.BaseClassStatsList.forEach(
      function (sStatName){
        ret.BaseClassStat[sStatName] = this.BaseClassStatsInitialScore;
        ret.ClassStatModifier[sStatName] = 0;
      }
    );
    return ret;      
  };
  
  this.BuyAttributePointsForChar = function(cCharacter, sAttribute, nPoints) {
  
    if (cCharacter.BaseAttributeScore[sAttribute] == 7 && nPoints < 0){
    throw new Error("Value already at min!");
    return;
    }                                

  
    if (cCharacter.BaseAttributeScore[sAttribute] == 18 && nPoints > 0){
      throw new Error("Value already at max!");
      return;
    }                         
  

    var pointsNeeded = this.PointsCost[cCharacter.BaseAttributeScore[sAttribute]//
      + nPoints] - this.PointsCost[cCharacter.BaseAttributeScore[sAttribute]];
    
    if (pointsNeeded > cCharacter.RemainingAttributeBuyPoints){
      throw new Error("Not enough points remaining");
    }
    else{                                  
      cCharacter.RemainingAttributeBuyPoints -= pointsNeeded;
      cCharacter.BaseAttributeScore[sAttribute] += nPoints;
    }     
  }

}

 