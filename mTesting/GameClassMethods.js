//Class methods    
Game.ClassAvailableTo = function(sClassName, cCharacter){
  //TEMPORARY
  return !(cCharacter.HasClass(sClassName));
}

Game.AddClassToChar = function(sClassName, cCharacter){
  if (!this.ClassAvailableTo(sClassName, cCharacter)){
    throw new Error("Cannot choose this class!");
    return;
  }
  cCharacter.Classes[sClassName] = sClassName;
  
  Object.keys(Game.Classes[sClassName].ClassStats).forEach(function(sStat){
    cCharacter.Stats[sStat][sClassName] = Game.Classes[sClassName].ClassStats[sStat];
  });                                                            
                                                                             
  Object.keys(Game.Classes[sClassName].ClassSkills).forEach(function(sSkill){
    if (!cCharacter.Skills[sSkill]){
      cCharacter.Skills[sSkill] = new Object();
    }
    cCharacter.Skills[sSkill][sClassName] = Game.Classes[sClassName].ClassSkills[sSkill];
  });  
    
  Object.getOwnPropertyNames(Game.Classes[sClassName].OtherModifications).forEach(
    function (sModification){ 
      var oModification = Game.Classes[sClassName].OtherModifications[sModification];
      oModification.performModification(cCharacter);
    });
}                       

Game.RemoveClassFromChar = function(sClassName, cCharacter){
  if (!cCharacter.HasClass(sClassName)){ 
    return;
  }  
  
  Object.keys(Game.Classes[sClassName].ClassStats).forEach(function(sStat){
    delete cCharacter.Stats[sStat][sClassName];
  });
      
  
  Object.keys(Game.Classes[sClassName].ClassSkills).forEach(
    function(sSkillName){
      delete cCharacter.Skills[sSkillName][sClassName];
      if (Object.keys(cCharacter.Skills[sSkillName]).length == 0){
        delete cCharacter.Skills[sSkillName];
      }
    }
  );
  
  Object.getOwnPropertyNames(Game.Classes[sClassName].OtherModifications).forEach(
    function (sModification){
      var oModification = Game.Classes[sClassName].OtherModifications[sModification];           
      oModification.undoModification(cCharacter, true);
      //cCharacter[oModification.bin][oModification.target] -= oModification.value;
    });
  delete cCharacter.Classes[sClassName];
} 
