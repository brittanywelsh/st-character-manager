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

uTester.addTest("Character has appropriate skills added", function(){
  resetTestingVariables();
  
  var bChecksOut = true;
  
  Game.AddClassToChar("Medic", cCharacter);
  bChecksOut = bChecksOut && (cCharacter.Stats.HitDice == 1);
  bChecksOut = bChecksOut && cCharacter.Stats.SkillsPerLevel == 1; 
  bChecksOut = bChecksOut && cCharacter.Stats.Attack == 0; 
  bChecksOut = bChecksOut && cCharacter.Stats.Defence == 0;
  bChecksOut = bChecksOut && cCharacter.Stats.Initiative == 0; 
  bChecksOut = bChecksOut && cCharacter.Stats.Charges == 1; 
  bChecksOut = bChecksOut && cCharacter.Stats.Mutations == 0; 
  bChecksOut = bChecksOut && cCharacter.Stats.Will == 1;
  bChecksOut = bChecksOut && cCharacter.Stats.Fortitude == 1; 
  bChecksOut = bChecksOut && cCharacter.Stats.Reflex == 0;
  
  return bChecksOut;
});

window.onload = function(){
  uTester.runInHTML();
};         