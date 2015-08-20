function Character(sName, sLevel, sGender, sAlignment) {

  this.Level = sLevel || 1;

  // Personal Info
  this.Name = sName || "New Character";
  this.Gender = sGender || "Queer";
  this.Alignment = sAlignment || "Neutral";
                 
  // Attribute Properties
  this.Attributes = {
    'STR': {
      Tooltip: 'Strength',
      Primary: 0,
      AddOns: [['Race Modifier', '+', 3,],],
    }
  }
  //this.AttributeModifier = new Object(); // this should be a method call. revisit.
  this.RemainingAttributeBuyPoints = 0;

  // Skills
  this.Skills = new Object();

  // Race/Class Properties
  this.Race = 'Race';
  this.Classes = new Object();
  this.Feats = new Object();
  this.Stats = {
    'Health Dice': 'd6',
    'Skills per Level': 0,
    'Base Attack': 0,
    'Base Defence': 0,
    'Base Initiative': 0,
    'Charges per Day': 0,
    'Base Mutations': 0,
    'Base Will': 0,
    'Base Fortitude': 0,
    'Base Reflex': 0,
  }

};
  
Character.prototype.HasClass = function (sClassName){
  return (sClassName in this.Classes); 
};

Character.prototype.AttributeScore = function (sAttributeName){
  return this.BaseAttributeScore[sAttributeName] + //
    this.AttributeModifier[sAttributeName];
};