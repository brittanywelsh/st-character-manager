function Character() {
  //this.name = sName || null;
  this.BaseAttributeScore = new Object();
  this.AttributeModifier = new Object();
  this.AttributeScore = function (sAttributeName){
    return this.BaseAttributeScore[sAttributeName] + //
      this.AttributeModifier[sAttributeName];
  }                                          
  this.RemainingAttributeBuyPoints = 0;  
  
}
