var cCharacter;

var uTester = new UnitTest();
var uTester2Classes = new UnitTest();

function resetTestingVariables(){
  cCharacter = null;
  cCharacter = Game.CreateNewCharacter();
}

uTester.title = "Tests involving one class";

uTester.addTest("Class name added to character's class list", function(){
  resetTestingVariables();
  
  Game.AddClassToChar("Medic", cCharacter);
  return cCharacter.Classes.Medic == "Medic";
});

uTester.addTest("Character with one class has appropriate skills added", function(){
  resetTestingVariables();
  
  var bChecksOut = true;
  
  Game.AddClassToChar("Medic", cCharacter);
  bChecksOut = bChecksOut && (cCharacter.StatScore("HitDice") == 1);
  bChecksOut = bChecksOut && (cCharacter.StatScore("SkillsPerLevel") == 1); 
  bChecksOut = bChecksOut && (cCharacter.StatScore("Attack") == 0); 
  bChecksOut = bChecksOut && (cCharacter.StatScore("Defence") == 0);
  bChecksOut = bChecksOut && (cCharacter.StatScore("Initiative") == 0); 
  bChecksOut = bChecksOut && (cCharacter.StatScore("Charges") == 1); 
  bChecksOut = bChecksOut && (cCharacter.StatScore("Mutations") == 0); 
  bChecksOut = bChecksOut && (cCharacter.StatScore("Will") == 1);
  bChecksOut = bChecksOut && (cCharacter.StatScore("Fortitude") == 1); 
  bChecksOut = bChecksOut && (cCharacter.StatScore("Reflexes") == 0);
  
  return bChecksOut;
});

uTester.addTest("Class removal method clears name and stats appropriately", function(){
  resetTestingVariables();
  
  var bChecksOut = true;
  
  Game.AddClassToChar("Medic", cCharacter);
  Game.RemoveClassFromChar("Medic", cCharacter);
  
  if (cCharacter.Classes.Medic){
    throw "Class name failed to erase";
  }
  Game.StatsList.forEach(function(sStatName){
    if (cCharacter.StatScore(sStatName) != 0){
      throw sStatName + " didn't erase properly";
    }         
    if (Object.keys(cCharacter.Stats[sStatName]).length != 0){
      throw "Something done gone fucked up for " + sStatName;
    }
  }); 
  return true;                                    
});

uTester.addTest("addClass method adds skills appropriately (single class)", function(){
  resetTestingVariables();
  
  var bChecksOut = true;
  
  Game.AddClassToChar("Webmaster", cCharacter);
  
  if (Object.keys(cCharacter.Skills).length != 2){
    throw new Error("Character has " + Object.keys(cCharacter.Skills).length + " skills.  Expected 2.");
  }
  
  bChecksOut = bChecksOut && (cCharacter.SkillScore("Cybertech") != 0);
  bChecksOut = bChecksOut && (cCharacter.SkillScore('UseElectronicDevice') != 0);
  return bChecksOut;    
});

uTester.addTest("removeClass method removes skills appropriately (single class)", function(){
  resetTestingVariables();
  
  var bChecksOut = true;
  
  Game.AddClassToChar("Webmaster", cCharacter);
  Game.RemoveClassFromChar("Webmaster", cCharacter);
  
  if (Object.keys(cCharacter.Skills).length != 0){
    throw new Error("Character has " + Object.keys(cCharacter.Skills).length + " skills.  Expected 0.");
  }
  
  bChecksOut = bChecksOut && (cCharacter.SkillScore("Cybertech") == 0);
  bChecksOut = bChecksOut && (cCharacter.SkillScore('UseElectronicDevice') == 0);
  return bChecksOut;    
                                                                               
});

uTester.addTest("addClass method applies profiencies to character appropriately (single class)", function(){
  resetTestingVariables();
    
  Game.AddClassToChar("Supercharger", cCharacter); 
          
  return (cCharacter.ProficiencyScore("LightArmour") == 1);
  
});

uTester.addTest("removeClass method removes proficiencies to character appropriately (single class)", function(){
  resetTestingVariables();                             
  
  Game.AddClassToChar("Supercharger", cCharacter);
  Game.RemoveClassFromChar("Supercharger", cCharacter);
  
  if ("LightArmour" in cCharacter.Proficiencies){
    throw "LightArmour not deleted " + cCharacter.Proficiencies.LightArmour;
  }
  return cCharacter.ProficiencyScore("LightArmour") == 0;
  
  
});

uTester2Classes.title = "Tests involving 2 classes";

uTester2Classes.addTest("Cannot add same class twice", function(){
  resetTestingVariables();
  
  Game.AddClassToChar("Medic", cCharacter);
  try{
    Game.AddClassToChar("Medic", cCharacter);
  } catch (e){
    if (e.message == "Cannot choose this class!") return true;
    throw e; 
  }         
  return false;
});

uTester2Classes.addTest("Adding two different classes provides correct list of class names",
  function(){
    resetTestingVariables();
    var bChecksOut = true;
                                     
    Game.AddClassToChar("Medic", cCharacter);
    Game.AddClassToChar("Webmaster", cCharacter);
    
    bChecksOut = Object.keys(cCharacter.Classes).length == 2;
    bChecksOut = bChecksOut && cCharacter.Classes.Medic == "Medic";
    bChecksOut = bChecksOut && cCharacter.Classes.Webmaster == "Webmaster";
    
    return bChecksOut;      
  }
);

uTester2Classes.addTest("Adding two different classes provides the correct stat scores",
  function(){                                                                           
    resetTestingVariables();
    var bChecksOut = true;
    var oExpectedStatValues = {
      HitDice: 1 + 0,
      SkillsPerLevel: 1 + 2,      
      Attack: 0,
      Defence: 0,
      Initiative: 0,
      Charges: 1 + 1,
      Mutations: 0,
      Will: 1 + 0,
      Fortitude: 1 + 0,
      Reflexes: 0 + 2
    };
    
    Game.AddClassToChar("Medic", cCharacter);
    Game.AddClassToChar("Webmaster", cCharacter);
    
    Game.StatsList.forEach(function (sStatName){
      bChecksOut = (bChecksOut && cCharacter.StatScore(sStatName) == oExpectedStatValues[sStatName]);       
      if (cCharacter.StatScore(sStatName) != oExpectedStatValues[sStatName]){
        console.log(sStatName, "Actual Value:", cCharacter.StatScore(sStatName), "Expected Value:", oExpectedStatValues[sStatName]);
      }
    });             
    return bChecksOut
  }
);

uTester2Classes.addTest("Adding two classes provides the correct skills",
  function(){
    resetTestingVariables();
    var bChecksOut = true;
    var oExpectedSkillScores = {
      DisableDevice: 2,
      HandleAnimal: 1,
      KnowledgeNature: 1,
      Medical: 0
    };
    var lTestSkills = ["DisableDevice", 'HandleAnimal', 'KnowledgeNature', 'Medical'];
    
    Game.AddClassToChar("Supercharger", cCharacter);
    Game.AddClassToChar("Predator", cCharacter);
    
    bChecksOut = Object.keys(cCharacter.Skills).length == 3;
    if (bChecksOut == false) console.log(Object.keys(cCharacter.Skills));
    
    lTestSkills.forEach(function(sSkillName){
      var bSkillScoreMatches = cCharacter.SkillScore(sSkillName) == oExpectedSkillScores[sSkillName];
      bChecksOut = bChecksOut && bSkillScoreMatches;
      if (bSkillScoreMatches == false){
        console.log(sSkillName, 'Expected Value: ', oExpectedSkillScores[sSkillName], 'Actual value: ', cCharacter.SkillScore(sSkillName));
      }
    });
    return bChecksOut;     
  }
);

uTester2Classes.addTest("Adding two classes provides correct proficiencies",
  function(){
    resetTestingVariables();
    var bChecksOut = true;
    var oExpectedProficiencyScores = {
      LightArmour: 1,
      Terrorfex: 0,
    };
    var lTestProficiencies = Object.keys(oExpectedProficiencyScores);
    
    
    Game.AddClassToChar("Supercharger", cCharacter);
    Game.AddClassToChar("Predator", cCharacter);
    
    bChecksOut = Object.keys(cCharacter.Skills).length == 3;
    if (bChecksOut == false) console.log(Object.keys(cCharacter.Skills));
    
    lTestSkills.forEach(function(sSkillName){
      var bSkillScoreMatches = cCharacter.SkillScore(sSkillName) == oExpectedSkillScores[sSkillName];
      bChecksOut = bChecksOut && bSkillScoreMatches;
      if (bSkillScoreMatches == false){
        console.log(sSkillName, 'Expected Value: ', oExpectedSkillScores[sSkillName], 'Actual value: ', cCharacter.SkillScore(sSkillName));
      }
    });
    return bChecksOut;     
  }
);

window.onload = function(){
  uTester.runInHTML();    
  uTester2Classes.runInHTML();    
};         