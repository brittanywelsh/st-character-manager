function Character(sName) {
  //Personal Info
  this.Name = sName || null;
                 
  //Attribute Properties
  this.Attributes = new Object();

  //Class Properties
  this.Classes = new Object();
  this.FeatsList = new Object();
  this.Stats = new Object();
  
  //Skills
  this.Skills = new Object();
  
  //Proficiencies
  this.Proficiencies = new Object(); 
  
  //Abilities
  this.Abilities = new Object();
                                           
}

Character.prototype.AttributeScore = function (sAttributeName){
  return this.BaseAttributeScore[sAttributeName] + //
    this.AttributeModifier[sAttributeName];
} 
  
Character.prototype.HasClass = function (sClassName){
  return (sClassName in this.Classes); 
}