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
  var lStatContributors = [];
  var self = this;                                       
  
  if (!this.Stats[sStatName]){
    return 0;
  }
  
  lStatContributors = Object.keys(this.Stats[sStatName]);
  
  lStatContributors.forEach(function (sContributor){
    nSum += self.Stats[sStatName][sContributor];
  });                                            
  return nSum;
}

Character.prototype.SkillScore = function(sSkillName){
  var nSum = 0;
  var self = this;
  var lSkillContributors = [];         
  
  if (!this.Skills[sSkillName]){
    return 0;
  }
                              
  lSkillContributors = Object.keys(self.Skills[sSkillName]);
  
  lSkillContributors.forEach(function (sContributor){
    nSum += self.Skills[sSkillName][sContributor];
  });                                            
  return nSum; 
}

Character.prototype.ProficiencyScore = function(sProficiencyName){
  var nSum = 0;
  var self = this;
  var lProficiencyContributors = [];
  
  if (!this.Proficiencies[sProficiencyName]) return 0;
  
  lProficiencyContributors = Object.keys(self.Proficiencies[sProficiencyName]);
  
  lProficiencyContributors.forEach(function (sContributor){
    nSum += self.Proficiencies[sProficiencyName][sContributor];
  });
  return nSum;
}

Character.prototype.clean = function(){
  var self = this;
  var lToClean = ["Skills", "Proficiencies"];
  
  lToClean.forEach(function(sThingToClean){
    Object.keys(self[sThingToClean]).forEach(function(sElement){
      if (Object.keys(self[sThingToClean][sElement]).length == 0){
        delete self[sThingToClean][sElement];
      }
    });
  });
}
  
Character.prototype.HasClass = function (sClassName){
  return (sClassName in this.Classes);
}