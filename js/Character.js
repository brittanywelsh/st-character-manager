var Character = function(sName,nLevel,sGender,sAlignment) {

  this.Level = nLevel || 1;

  // Personal Info
  this.Name = sName || "New Character";
  this.Gender = sGender || "Queer";
  this.Alignment = sAlignment || "Neutral";

  // Rule-Based Data
  this.Stats = new Object();
  this.Attributes = new Object();
  this.Skills = new Object();
  this.Race = new Object();
  this.Schools = new Object();
  this.Feats = new Object();

  // Independent Data
  this.Abilities = new Object();
  this.Proficiencies = new Object(); 
  this.Resistance = new Object();
  this.CombatNotes = new Object();
  //this.Items -- for adding in future?

}