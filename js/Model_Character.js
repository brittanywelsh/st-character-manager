function Character(sName) {
  this.Name = sName || null;
  this.BaseAttributeScore = new Object();
  this.AttributeModifier = new Object();
  this.Classes = new Object();
  this.FeatsList = new Object();
  this.BaseClassStat = new Object();
  this.ClassStatsModifier = new Object();                              
  this.RemainingAttributeBuyPoints = 0;  
}
  
Character.prototype.HasClass = function (sClassName){
  return (sClassName in this.Classes); 
}

Character.prototype.AttributeScore = function (sAttributeName){
  return this.BaseAttributeScore[sAttributeName] + //
    this.AttributeModifier[sAttributeName];
}