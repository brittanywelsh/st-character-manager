function Character() {
  //this.name = sName || null;
  this.BaseAttributeScore = new Object();
  this.AttributeModifier = new Object();
  this.Class1;
  this.Class2;
  this.Class3;//inelegent
  
  this.HasClass = function (sClassName){
    return (this.Class1 == sClassName || this.Class2 == sClassName || //
    this.Class3 == sClassName); 
  } 
  
  this.BaseClassStat = new Object();
  this.ClassStatsModifier = new Object();
  
  this.AttributeScore = function (sAttributeName){
    return this.BaseAttributeScore[sAttributeName] + //
      this.AttributeModifier[sAttributeName];
  }                                          
  this.RemainingAttributeBuyPoints = 0;  
  
}
