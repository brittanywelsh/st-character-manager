function Character(sName) {
  //Personal Info
  this.Name = sName || null;
                 
  //Attribute Properties
  this.BaseAttributeScore = new Object();
  this.AttributeModifier = new Object(); 
  this.RemainingAttributeBuyPoints = 0;  

  //Class Properties
  this.Classes = new Object();
  this.FeatsList = new Object();
  this.Stats = new Object();
  this.StatsModifier = new Object();//Modifiers **other** than from classes
  
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