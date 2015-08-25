Game.Classes = {

/*
 *  TECH CLASSES
*/

  Medic : new Class({
    Name:"Medic", 
    PrimaryAttribute: "WIS", 
    ClassStats:{HitDice: 1, SkillsPerLevel: 1, Charges: 1, Will: 1, Fortitude:1},
    ClassSkills:{Medical: 3}, 
    //Feats:Feats.Medic
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
    Proficiencies: { LightArmour: 1}
  }),                               
  
  Predator: new Class({
    Name: "Predator",
    PrimaryAttribute: "STR",
    ClassStats: {HitDice: 1, Attack: 2, Fortitude: 1, Reflexes: 1, Mutations: 1},
    ClassSkills: {HandleAnimal: 1, KnowledgeNature: 1}
  }),    
  
  Apothecary: new Class({
    Name: "Apothecary",
    PrimaryAttribute: "INT",
    ClassStats: {Mutations: 1, Fortitude: 1, Will: 1, HitDice: 1, SkillsPerLevel: 1},
    ClassSkills: {Biotech: 2, Medical: 3},
    OtherModifications: {\\All other biotech abilities gain 1 DC
      }
  }),
  
  Macabre: new Class({
    Name: "Macabre",
    PrimaryAttribute: "DEX",
    ClassStats: {SkillsPerLevel: 1, Attack: 1, Reflex: 1, Mutations: 1}, 
    ClassSkills: {Dodge: 1, SleightOfHand: 3},
    ClassProficiencies: {Knives: 1, Daggers: 1} 
  }),
  
  Inquisitor: new Class({
    Name: 'Inquisitor',
    PrimaryAttribute: "CHA",
    ClassStats: {Mutations: 1, Will: 2, SkillsPerLevel: 2},
    ClassSkills: {Linguistics: 1, Politics: 2, SenseMotive: 2, Disguise: 2, Intimidate: 2}
  }),
  
  Jinx: new Class({
    Name: 'Jinx',
    PrimaryAttribute: 'WIS',
    ClassStats: {Mutations: 1, SkillsPerLevel: 1},
    ClassSkills: {Dodge: 1, Cybertech: 2, Biotech: 2},
    ClassProficiencies: {UnarmedCombat: 1}
    OtherModifications: {
      //+1 to all saves
    }
  });
  
/*
 *  SKILL CLASSES
*/  

  ConArtist: new Class({
    Name: "Con-artist",
    PrimaryAttribute: "CHA",
    ClassStats: {SkillsPerLevel: 2, Reflex: 1, Will: 1}
    ClassSkills: {Dodge: 1}
    OtherModifications: {
      //+1 rank in all social skills
      //Start the game with 20 extra credits
    }  
  });

  Infiltrator: new Class({
    Name: 'Infiltrator',
    PrimaryAttribute: 'DEX',
    ClassStats: {Attack: 1, Reflexes: 1, SkillsPerLevel: 2}
    ClassSkills: {Stealth: 2, SleightOfHand: 2, Hacking: 2, DisableDevice: 2}
    ClassProficiencies: {LightGuns} 
  });
  
  Strategist: new Class({
    Name: 'Strategist',
    PrimaryAttribute: 'INT',
    ClassStats: {Initiative: 2, Will: 2, SkillsPerLevel: 1},
    ClassSkills: {Perception: 2, SenseMotive: 2},
    ClassProficiencies: {LightArmour: 1}
  });                                   
  
  FreeRunner: new Class({
    Name: "Free Runner",
    PrimaryAttribute: 'DEX',
    ClassStats: {Reflexes: 2, SkillsPerLevel: 2},
    ClassSkills: {Dodge: 2, Acrobatics: 2, Climb: 2, EscapeArtist: 2}
  });
  
  Ranger: new Class({
    Name: 'Ranger',
    PrimaryAttribute: 'WIS',
    ClassStats: {HitDice: 1, Reflexes: 2, Fortitude: 2, SkillsPerLevel: 2},
    ClassSkills: {Survival: 2, Perception: 2},
    ClassProficiencies: {Knives: 1}
  });
  
  Pilot: new Class({
    Name: 'Pilot',
    PrimaryAttribute: 'DEX',
    ClassStats: {Reflexes: 2, SkillsPerLevel: 2}
    ClassSkills: {Drive: 3}
    ClassProficiencies: {LightArmour: 1}
    OtherModifications: {
      //3 ranks spread across fly, swim, and zero G in any combination
    }
  });
  

  ShipEngineer: new Class({
    Name: "Ship's Engineer",
    PrimaryAttribute: 'INT',
    ClassStats: {HitDice: 1, Will: 2, SkillsPerLevel: 2},
    ClassSkills: {Engineering: 2, Space: 2, UseDevice: 1},
    OtherModifications: {
      //+1 Companion Charge (if you have a robot companion)
    }
  });                         
  
  Scavenger: new Class({
    Name: 'Scavenger',
    PrimaryAttribute: 'INT',
    ClassStats: {SkillsPerLevel: 3, Reflexes: 2}
    ClassSkills: {UseElectronicDevice: 2, Repair: 2}
    OtherModifications{
      //Has skill unique to class (Craft (Gizmo)
      //Improvied companion charge (if you have a robot companion)
    } 
  });
  
  Calibrist: new Class({
    Name: 'Calibrist',
    PrimaryAttribute: 'WIS',
    ClassStats: {HitDice: 1, SkillsPerLevel: 2}
    ClassSkills: {Repair: 2, CraftBullet: 5}
    OtherModifications: {
      //Proficiency with one type of firearm
      //Either Improved health (again?) or +1 robot companion charge per level
      //Class has unique skill Craft (Bullet)
    }
  });
  
  
