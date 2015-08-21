var cCharacter;

var uTester = new UnitTest();

function resetTestingVariables(){
  cCharacter = null;
  cCharacter = Game.CreateNewCharacter();
}

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

uTester.addTest("addClass method applies other modifications to character appropriately (single class)", function(){
  resetTestingVariables();
    
  Game.AddClassToChar("Supercharger", cCharacter); 
          
  return (cCharacter.Proficiencies.LightArmour == 1);
  
});

uTester.addTest("removeClass method removes other modifications to character appropriately (single class)", function(){
  resetTestingVariables();                             
  
  Game.AddClassToChar("Supercharger", cCharacter);
  Game.RemoveClassFromChar("Supercharger", cCharacter);
  
  if ("LightArmour" in cCharacter.Proficiencies){
    throw "LightArmour not deleted " + cCharacter.Proficiencies.LightArmour;
  }
  
  
});

uTester.addTest("Test", function(){

});

window.onload = function(){
  uTester.runInHTML();
};         