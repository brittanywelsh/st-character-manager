function Class(sName, sPrimeAttribute, oClassStatModifiers, oOtherModifiers, oFeats) {
  var self = this;
  
  this.ClassName = sName || "";
  this.PrimeAttribute = sPrimeAttribute || "";
  this.ClassStats = new Object();
  this.OtherModifiers = new Object();
  this.Feats = oFeats;
  
  Game.BaseClassStatsList.forEach(function (sStat){
    self.ClassStats[sStat] = oClassStatModifiers[sStat] || 0;
  });
  
  Object.keys(oOtherModifiers).forEach(function (sTarget){
    self.OtherModifiers[sTarget] = oOtherModifiers[sTarget];
  });

  
};
