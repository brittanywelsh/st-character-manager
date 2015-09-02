function Class(oClassInfo) {
 
  this.ClassName = oClassInfo.Name || "";
  this.PrimeAttribute = oClassInfo.PrimeAttribute || "";
  this.ClassStats = oClassInfo.ClassStats || new Object();
  this.ClassSkills = oClassInfo.ClassSkills || new Object();
  this.ClassProficiencies = oClassInfo.Proficiencies || new Object();
  this.OtherModifications = oClassInfo.OtherModifications || new Object();
  this.Feats = Feats[this.ClassName] || new Object();
};
