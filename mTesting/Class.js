function Class(oClassInfo) {
// oClassInfo Properties sName, sPrimeAttribute, oClassStatModifiers, oOtherModifiers, oFeats
  var self = this;
  
  this.ClassName = oClassInfo.Name || "";
  this.PrimeAttribute = oClassInfo.PrimeAttribute || "";
  this.ClassStats = new Object();
  this.ClassSkills = new Object();
  this.OtherModifications = new Object();
  //this.Feats = oClassInfo.Feats;
  this.Feats = Feats[ClassName];
  
//  if (oClassInfo.ClassStats){
    Game.BaseClassStatsList.forEach(function (sStat){
      self.ClassStats[sStat] = oClassInfo.ClassStats[sStat] || 0;
    });                         
  //}   

  
  Object.keys(OtherModifiers).forEach(function (sTarget){
    self.OtherModifications[sTarget] = oClassInfo.OtherModifications[sTarget];
  });

  
};
