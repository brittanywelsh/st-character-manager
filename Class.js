function Class(sName, sPrimeAttribute, oClassStatModifiers, oOtherModifiers, oFeats) {
  this.ClassName = sName || "";
  this.PrimeAttribute = sPrimeAttribute || "";
  this.ClassStats = new Object();
  this.OtherModifiers = new Object();
  this.Feats = oFeats;
  
  Game.BaseClassStatsList.forEach(function (sStat){
    this.ClassStats[sStat] = oClassStatModifiers[sStat] || 0;
  });
  
  oOtherModifiers.getProperties().forEach(function (sTarget){
    this.OtherModifiers[sTarget] = oOtherModifiers[sTarget];
  });

  
};
