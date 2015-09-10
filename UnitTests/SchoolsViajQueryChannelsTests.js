var SuperCharger = {
    Name: "Supercharger",
    PrimaryAttribute: "WIS",
    ClassInstructions: {
        Stats: {
            HitDice: 1,
            Charges: 1,
            Will: 2,
            SkillsPerLevel: 1
        },
        Skills: {
            DisableDevice: 2
        },
        Proficiencies: {
            LightArmour: true
        },
        Abilities: {
            HitWithHammer: "I can now hit you with a hammer"
        }
    }
},
    Character = {
        Stats: {},
        Skills: {},
        Proficiencies: {},
        Abilities: {}
    },
    StatsController = {
        ChangeStatByBecauseOf: function (sStatName, nChangeByValue, sLabel) {
            "use strict";
            
            if (!Character.Stats[sStatName]) {
                Character.Stats[sStatName] = {};
            }
            if (!Character.Stats[sStatName][sLabel]) {
                Character.Stats[sStatName][sLabel] = 0;
            }
            Character.Stats[sStatName][sLabel] += nChangeByValue;
        }
    },
    SkillsController = {
        ChangeSkillByBecauseOf: function (sSkillName, nChangeByValue, sLabel) {
            "use strict";
            
         
            if (!Character.Skills[sSkillName]) {
                Character.Skills[sSkillName] = {};
            }
            if (!Character.Skills[sSkillName][sLabel]) {
                Character.Skills[sSkillName][sLabel] = 0;
            }
            Character.Skills[sSkillName][sLabel] += nChangeByValue;
        }
    },
    ProficienciesController = {
        UpdateProficiencyBecauseOf: function (sProficiencyName, bAdd, sLabel) {
            "use strict";
        
            if (!Character.Proficiencies[sProficiencyName]) {
                Character.Proficiencies[sProficiencyName] = [];
            }
            if (bAdd) {
                Character.Proficiencies[sProficiencyName].push(sLabel);
            } else {
                Character.Proficiencies[sProficiencyName].splice(Character.Proficiencies[sProficiencyName].indexOf(sLabel), 1);
            }
        }
    },
    AbilitiesController = {
        UpdateAbilityBecauseOf: function (oAbility, bAdd, sLabel) {
            "use strict";
            
            if (!Character.Abilities[oAbility.Name]) {
                Character.Abilities[oAbility.Name] = {
                    Description: oAbility.Description,
                    Contributors: []
                };
            }
            if (bAdd) {
                Character.Abilities[oAbility.Name].Contributors.push(sLabel);
            } else {
                Character.Abilities[oAbility.Name].Contributors.splice(Character.Abilities[oAbility.Name].indexOf(sLabel));
            }
        }
    };