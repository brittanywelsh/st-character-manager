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
  return this.Attributes[sAttributeName].BaseValue + //
    this.Attributes[sAttributeName].ModificationValue;
} 

Character.prototype.StatScore = function(sStatName){
  var nSum = 0; 
  var lStatContributors = Object.keys(this.Stats[sStatName]);
  var self = this;
  
  lStatContributors.forEach(function (sContributor){
    nSum += self.Stats[sStatName][sContributor];
  });                                            
  return nSum;
}

Character.prototype.SkillScore = function(sSkillName){
  var nSum = 0; 
  var lSkillContributors = Object.keys(this.Skills[sSkillName]);
  var self = this;
  
  lSkillContributors.forEach(function (sContributor){
    nSum += self.Skills[sSkillName][sContributor];
  });                                            
  return nSum;
  
}
  
Character.prototype.HasClass = function (sClassName){
  return (sClassName in this.Classes);
}