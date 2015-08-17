function Class(oClassInfo) {
// oClassInfo Properties sName, sPrimeAttribute, oClassStatModifiers, oOtherModifiers, oFeats
  var self = this;
  
  this.ClassName = oClassInfo.Name || "";
  this.PrimeAttribute = oClassInfo.PrimeAttribute || "";
  this.ClassStats = new Object();
  this.ClassSkills = new Object();
  this.OtherModifications = new Object();
  //this.Feats = oClassInfo.Feats;
  this.Feats = Feats[this.ClassName];
  
//  if (oClassInfo.ClassStats){
    Game.StatsList.forEach(function (sStat){
      self.ClassStats[sStat] = oClassInfo.ClassStats[sStat] || 0;
    });                         
  //}   

  
  Object.keys(this.OtherModifications).forEach(function (sTarget){
    self.OtherModifications[sTarget] = oClassInfo.OtherModifications[sTarget];
  });
};
