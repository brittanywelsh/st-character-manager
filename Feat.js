function Feat(sName, sClass, oPassiveEffects, oGrantsAbilities, oUpgrade, fOnLevelUp) {
  this.Name = sName;
  this.BelongsToClass = sClass; 
  
  this.AvailableTo = function (cCharacter){
    return false;        
  },
  
  this.PassiveEffects = oPassiveEffects;//modifiers
  this.GrantsAbilities = oGrantsAbilities;//appendables
  this.Upgrade = oUpgrade // May not exist
  this.OnLevelUp = fOnLevelUp;//LevelUpfunction (This might get wrapped into "Grants Abilities" 
  

};

/*
 * The following functions need to be checked when everything is working
*/

Feat.AddFeatTo = function(cCharacter){
  if (!this.AvailableTo(cCharacter)){
    throw "This feat is not available!";
    return;  
  } 
  if (cCharacter.HasFeat(this.Name)){
    throw "This character already has this feat!";
    return
  }
  cCharacter.PassiveEffects.getProperties().forEach(function (element){
    cCharacter[element.bin][element.TargetOfModification] += element.Modifier;//sketchy!
  });
  cCharacter.GrantsAbilities.getProperties().forEach(function (element){
    cCharacter[element.bin][element.TargetOfModification][element.AbilityName] = element.Ability;
  }); 
  cCharacter.FeatList[sName];
};   

Feat.RemoveFeatFrom = function(cCharacter){
  if (!cCharacter.HasFeat(this.Name)){
    throw "This character doesn't have this feat!";
    return;
  }
  cCharacter.PassiveEffects.getProperties().forEach(function (element){
    cCharacter[element.bin][element.TargetOfModification] -= element.Modifier;//sketchy!
  });    
    
  cCharacter.GrantsAbilities.getProperties().forEach(function (element){
    delete cCharacter[element.bin][element.TargetOfModification][element.AbilityName];
  }); 
  delete cCharacter.FeatList[sName];
  };

