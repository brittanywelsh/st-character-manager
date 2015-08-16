Game.Classes = {
  Medic : new Class({
    Name:"Medic", 
    PrimaryAttribute: "WIS", 
    ClassStats:{HitDice: 1, SkillsPerLevel: 1, Charges: 1, BaseWill: 1, BaseFortitude:1},
    ClassSkills:{Medical: 3}, 
    Feats:Feats.Medic
  }),  
  Chronographer : new Class(
    Name: "Chronographer",
    PrimaryAttribute: "INT",
    ClassStats: {Charges: 1, SkillsPerLevel: 2, BaseReflexes: 2, BaseInitiative: 1},
    //Feats: Feats.Chronographer // I don't know whether I should include this in classes or not.  Maybe in the controller?
  }), 
  
  Webmaster: new Class(
    Name: "Webmaster",
    PrimaryAttribute: "WIS",
    ClassStats: {Charges: 1, BaseReflexes: 2, SkillsPerLevel: 2},
    ClassSkills: { Cybertech: 1, UseElectronicDevice: 1}
  ),
  
  Supercharger: new Class(
    Name: "Supercharger",
    PrimaryAttribute: "WIS",
    ClassStats: {HitDice: 1, Charges: 1, BaseWill: 2, SkillsPerLevel: 1,},
    ClassSkills: { DisableDevice: 2}
    OtherModifications: {
      LightArmourProf: new StatModification(
        "ArmourProficiencies",//path
        "LightArmour",//target
        1//modificationValue
      )
    },
),
}
