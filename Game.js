var Feats = new Object(); //I don't know where to declare ..
var Game = {
  AttributeList : ["STR", "CON", "DEX", "INT", "WIS", "CHA"],
  BaseAttributeBuy : {
      StartingPoints: 15,
      StartingAttributeScore: 10
  },
  PointsCost : {
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
  },
  
  BaseClassStatsList : ["HitDice", "SkillsPerLevel", "BaseAttack",// 
    "BaseDefence", "BaseInitiative", "Charges", "BaseMutations", "BaseWill",//
    "BaseFortitude", "BaseReflex"],
  BaseClassStatsInitialScore : 0,
                      
  CreateNewCharacter : function() {
    var ret = new Character(); 
    ret.RemainingAttributeBuyPoints = Game.BaseAttributeBuy.StartingPoints;
    Game.AttributeList.forEach(
      function(sAttributeName){
        ret.BaseAttributeScore[sAttributeName] = Game.BaseAttributeBuy.StartingAttributeScore;
        ret.AttributeModifier[sAttributeName] = 0;
      });                  
    Game.BaseClassStatsList.forEach(
      function (sStatName){
        ret.BaseClassStat[sStatName] = Game.BaseClassStatsInitialScore;
        ret.ClassStatsModifier[sStatName] = 0;
      }
    );
    return ret;      
  },
  
  BuyAttributePointsForChar : function(cCharacter, sAttribute, nPoints) {
  
    if (cCharacter.BaseAttributeScore[sAttribute] == 7 && nPoints < 0){
    throw new Error("Value already at min!");
    return;
    }                                

  
    if (cCharacter.BaseAttributeScore[sAttribute] == 18 && nPoints > 0){
      throw new Error("Value already at max!");
      return;
    }                         
  

    var pointsNeeded = Game.PointsCost[cCharacter.BaseAttributeScore[sAttribute]//
      + nPoints] - Game.PointsCost[cCharacter.BaseAttributeScore[sAttribute]];
    
    if (pointsNeeded > cCharacter.RemainingAttributeBuyPoints){
      throw new Error("Not enough points remaining");
    }
    else{                                  
      cCharacter.RemainingAttributeBuyPoints -= pointsNeeded;
      cCharacter.BaseAttributeScore[sAttribute] += nPoints;
    }     
  }
};

 