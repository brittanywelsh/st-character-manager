Game.Classes = {
  Medic : new Class(
    "Medic", 
    "WIS", 
    {HitDice: 1, SkillsPerLevel: 1, Charges: 1, BaseWill: 1, BaseFortitude:1}, 
    {  
      Medical: {
        bin: "Skills",
        target: "Medical",
        value: 3
      },
    },
    Feats.Medic
  ),  
  Chronographer : new Class(
    "Chronographer",
    "INT",
    {Charges: 1, SkillsPerLevel: 2, BaseReflexes: 2, BaseInitiative: 1},
    {},
    Feats.Chronographer
  ), 
  
  Webmaster: new Class(
    "Webmaster",
    "WIS",
    {Charges: 1, BaseReflexes: 2, SkillsPerLevel: 2},
    {
      Cybertech : {
        bin: "Skills",
        target: "Cybertech",
        value: 1,
      },
      UseElectronicDevice: {
        bin: "Skills",
        target: "UseElectronicDevice",
        value: 1,
      }
    },
    Feats.Webmaster
  ),
  
  Supercharger: new Class(
    "Supercharger",
    "WIS",
    {HitDice: 1, Charges: 1, BaseWill: 2, SkillsPerLevel: 1,},
    {
      DisableDevice: {
        bin: "Skills",
        target: "DisableDevice",
        value: 2,
      }
      /*
      LightArmourProf: {
        bin: "ArmourProficiencies",
        target: "LightArmour",
        value: 1,
      }
      */
    },
    Feats.Supercharger
),
}
