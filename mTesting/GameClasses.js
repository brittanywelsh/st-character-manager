Game.Classes = {
  Medic : new Class({
    Name:"Medic", 
    PrimaryAttribute: "WIS", 
    ClassStats:{HitDice: 1, SkillsPerLevel: 1, Charges: 1, Will: 1, Fortitude:1},
    ClassSkills:{Medical: 3}, 
    Feats:Feats.Medic
  }),  
  Chronographer : new Class({
    Name: "Chronographer",
    PrimaryAttribute: "INT",
    ClassStats: {Charges: 1, SkillsPerLevel: 2, Reflexes: 2, Initiative: 1},
    //Feats: Feats.Chronographer // I don't know whether I should include this in classes or not.  Maybe in the controller?
  }), 
  
  Webmaster: new Class({
    Name: "Webmaster",
    PrimaryAttribute: "WIS",
    ClassStats: {Charges: 1, Reflexes: 2, SkillsPerLevel: 2},
    ClassSkills: { Cybertech: 1, UseElectronicDevice: 1}
  }),
  
  Supercharger: new Class({
    Name: "Supercharger",
    PrimaryAttribute: "WIS",
    ClassStats: {HitDice: 1, Charges: 1, Will: 2, SkillsPerLevel: 1,},
    ClassSkills: { DisableDevice: 2},
    OtherModifications: {
      LightArmourProf: new StatModification(
        //"ArmourProficiencies",//path
        "Proficiencies",//path
        "LightArmour",//target
        1//modificationValue
      )
    },
  }),
  Predator: new Class({
    Name: "Predator",
    PrimaryAttribute: "STR",
    ClassStats: {HitDice: 1, Attack: 2, Fortitude: 1, Reflexes: 1, Mutations: 1},
    ClassSkills: {HandleAnimal: 1, KnowledgeNature: 1}
  }),
}
