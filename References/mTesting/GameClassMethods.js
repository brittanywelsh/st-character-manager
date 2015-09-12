/*global Game */
//Class methods    
Game.ClassAvailableTo = function (sClassName, cCharacter) {
    "use strict";
    //TEMPORARY
    return !(cCharacter.HasClass(sClassName));
};

Game.AddClassToChar = function (sClassName, cCharacter) {
    "use strict";
    if (!this.ClassAvailableTo(sClassName, cCharacter)) {
        throw new Error("Cannot choose this class!");
    }
    cCharacter.Classes[sClassName] = sClassName;

    Object.keys(Game.Classes[sClassName].ClassStats).forEach(function (sStat) {
        cCharacter.Stats[sStat][sClassName] = Game.Classes[sClassName].ClassStats[sStat];
    });

    Object.keys(Game.Classes[sClassName].ClassSkills).forEach(function (sSkill) {
        if (!cCharacter.Skills[sSkill]) {
            cCharacter.Skills[sSkill] = {};
        }
        cCharacter.Skills[sSkill][sClassName] = Game.Classes[sClassName].ClassSkills[sSkill];
    });

    Object.keys(Game.Classes[sClassName].ClassProficiencies).forEach(function (sProficiency) {
        if (!cCharacter.Proficiencies[sProficiency]) {
            cCharacter.Proficiencies[sProficiency] = {};
        }
        cCharacter.Proficiencies[sProficiency][sClassName] = Game.Classes[sClassName].ClassProficiencies[sProficiency];
    });

    Object.getOwnPropertyNames(Game.Classes[sClassName].OtherModifications).forEach(
        function (sModification) {
            var oModification = Game.Classes[sClassName].OtherModifications[sModification];
            oModification.performModification(cCharacter);
        }
    );
};

Game.RemoveClassFromChar = function (sClassName, cCharacter) {
    "use strict";
    if (!cCharacter.HasClass(sClassName)) {
        return;
    }
    Object.keys(Game.Classes[sClassName].ClassStats).forEach(function (sStat) {
        delete cCharacter.Stats[sStat][sClassName];
    });

    Object.keys(Game.Classes[sClassName].ClassSkills).forEach(
        function (sSkillName) {
            delete cCharacter.Skills[sSkillName][sClassName];
            if (Object.keys(cCharacter.Skills[sSkillName]).length === 0) {
                delete cCharacter.Skills[sSkillName];
            }
        }
    );

    Object.keys(Game.Classes[sClassName].ClassProficiencies).forEach(function (sProficiencyName) {
        delete cCharacter.Proficiencies[sProficiencyName][sClassName];
    });

    Object.getOwnPropertyNames(Game.Classes[sClassName].OtherModifications).forEach(
        function (sModification) {
            var oModification = Game.Classes[sClassName].OtherModifications[sModification];
            oModification.undoModification(cCharacter, true);
            //cCharacter[oModification.bin][oModification.target] -= oModification.value;
        }
    );
    delete cCharacter.Classes[sClassName];
    cCharacter.clean();
};