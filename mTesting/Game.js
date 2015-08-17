var Feats = new Object(); //I don't know where to declare this...
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
  
  StatsList : ["HitDice", "SkillsPerLevel", "Attack",// 
    "Defence", "Initiative", "Charges", "Mutations", "Will",//
    "Fortitude", "Reflex"],
  StatsInitialScore : 0,
                      
  CreateNewCharacter : function() {
    var ret = new Character(); 
    ret.RemainingAttributeBuyPoints = Game.BaseAttributeBuy.StartingPoints;
    Game.AttributeList.forEach(
      function(sAttributeName){
        ret.BaseAttributeScore[sAttributeName] = Game.BaseAttributeBuy.StartingAttributeScore;
        ret.AttributeModifier[sAttributeName] = 0;
      });                  
    Game.StatsList.forEach(
      function (sStatName){
        ret.Stats[sStatName] = Game.StatsInitialScore;
        ret.StatsModifier[sStatName] = 0;
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
  },             
  
  //Class methods    
  ClassAvailableTo: function(sClassName, cCharacter){
    //TEMPORARY
    return !(cCharacter.HasClass(sClassName));
  },
  
  AddClassToChar: function(sClassName, cCharacter){
    if (!this.ClassAvailableTo(sClassName, cCharacter)){
      throw new Error("Cannot choose this class!");
      return;
    }
    cCharacter.Classes[sClassName] = sClassName;
    Game.StatsList.forEach(function(sStat){
      cCharacter.Stats[sStat] += Game.Classes[sClassName].ClassStats[sStat];
    });
    Object.getOwnPropertyNames(Game.Classes[sClassName].OtherModifications).forEach(
      function (sModification){ 
        var oModification = Game.Classes[sClassName].OtherModifications[sModification];
        oModification.performModification(cCharacter);
        //cCharacter[oModification.bin][oModification.target] += oModification.value;
      });
  },
  RemoveClassFromChar: function(sClassName, cCharacter){
    if (!cCharacter.HasClass(sClassName)){ 
      return;
    }  
    
    Game.StatsList.forEach(function(sStat){
      cCharacter.Stats[sStat] -= Game.Classes[sClassName].ClassStats[sStat];;
    });
         
    Object.getOwnPropertyNames(Game.Classes[sClassName].ClassSkills).forEach(
      function(sSkillName){
        cCharacter.Skills[sSkillName] = Game.Classes[sClassName].ClassSkills[sSkillName];
      });   
    
    Object.getOwnPropertyNames(Game.Classes[sClassName].OtherModifications).forEach(
      function (sModification){
        var oModification = Game.Classes[sClassName].OtherModifications[sModification];           
        oModification.undoModification(cCharacter, true);
        //cCharacter[oModification.bin][oModification.target] -= oModification.value;
      });
    delete cCharacter.Classes[sClassName];
  } 
};
