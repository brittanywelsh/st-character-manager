var sThingToTest;
var uTester = new UnitTest();


/*
 *
 *  Tests for Error handling.
 *
 */                          
 
 //Path not a string  
  uTester.addTest("Path not a string", function(){            
    try{
      sThingToTest = new StatModification(3, "target", 1, true);
    }
    catch (e){
      if (e.message == "Path name must be a string.")
      return true;
    }             
    return false;
  });             
 
 //Target not a string
  uTester.addTest("Target is not a string", function(){            
    try{
      sThingToTest = new StatModification("bin.", 3, 1, true);
    }
    catch (e){
      if (e.message == "Target must be a string.")
      return true;
    }             
    return false;
  });             
 
 //Incrementing by a non-number
  uTester.addTest("Trying to increment by a non-number", function(){            
    try{
      sThingToTest = new StatModification("bin.", "target", "non-number", true);
    }
    catch (e){
      if (e.message == "Can only increment numbers.")
      return true;
    }             
    return false;
  });
  
  //Incrementing by a number doesn't throw an error
  uTester.addTest("Trying to increment by a number doesn't throw an error", function(){
    try{
      sThingToTest = new StatModification("bin", "target", 2, true);
      return true;
      }
    catch(e){
      return false;
    }
  });             
 
 //Bad path formatting
  uTester.addTest("Bad path formatting 1", function(){            
    sThingToTest = new StatModification("bin", "target", 1, true);
    return sThingToTest.path() == "bin.";

  });             
  uTester.addTest("Empty string", function(){            
    sThingToTest = new StatModification("", "target", 1, true);
    return sThingToTest.path() == ".";

  }); 
  
  //No boolean value given, number modifier
  uTester.addTest("No boolean given, number as modification value assumes 'true'", function(){
    sThingToTest = new StatModification("", "target", 1);
    return sThingToTest.incrementValue() == true;
  });
  //No boolean value given, non-number modifier
  uTester.addTest("No boolean given, non-number as modification value assumes 'false'", function(){
    sThingToTest = new StatModification("", "target", "self");
    return sThingToTest.incrementValue() == false;
  });
  
  /*
   *
   * Altering immediate properites works correctly  
   *
  */
  
  //INCREMENTING A PROPERTY
  
  uTester.addTest("Can increment immediate properties", function(){
    sThingToTest = new StatModification("", "End", 1);
    oBasicBin = {
      End: 0
    };
    sThingToTest.performModification(oBasicBin);
    return oBasicBin.End == 1;
  }); 
  //REPLACING A PROPERTY
  uTester.addTest("Can replace immediate properties", function(){
    sThingToTest = new StatModification("", "End", "is nigh!", false);
    oBasicBin = {
      End: 0
    };
    sThingToTest.performModification(oBasicBin);
    return oBasicBin.End == "is nigh!";
  });           
  //CREATING A PROPERTY VIA INCREMENTATION
  uTester.addTest("Can create immediate properties via incrementation", function(){
    sThingToTest = new StatModification("", "Target", 1);
    oBasicBin = {
      End: 0
    };
    sThingToTest.performModification(oBasicBin);
    return oBasicBin.End == 0 && oBasicBin.Target == 1;
  }); 
  //CREATING A PROPERTY VIA SETTING
  uTester.addTest("Can create immediate properties and set them", function(){
    sThingToTest = new StatModification("", "Target", "tree", false);
    oBasicBin = {
      End: 0
    };
    sThingToTest.performModification(oBasicBin);
    return oBasicBin.Target == "tree";
    }); 
  //UNDOING A REPLACEMENT OF AN IMMEDIATE PROPERTY
  uTester.addTest("Calling undoModification without specifiying bDeleteOK assumes false", function(){
    sThingToTest = new StatModification("", "End", "boo", false);
    oBasicBin = {
      End: 0
    };
    try{
      sThingToTest.undoModification(oBasicBin);
      return false;//Error was supposed to be thrown
    }
    catch(e){
      if (e.message != "Cannot undo!") throw e;
      else return true;
    }
  });           
  //UNDOING AN INCREMENTATION
  uTester.addTest("Can undo an incrementationon immediate properties", function(){
    sThingToTest = new StatModification("", "End", 1);
    oBasicBin = {
      End: 0
    };          
    sThingToTest.performModification(oBasicBin);
    sThingToTest.undoModification(oBasicBin, false);
    return oBasicBin.End == 0;
  }); 
  //UNDOING A REPLACEMENT OF AN IMMEDIATE PROPERTY WITH DELETE ENEABLED
  uTester.addTest("Can delete an immediate property", function(){
    sThingToTest = new StatModification("", "End", "is nigh!");
    oBasicBin = {
      End: 0
    };
    sThingToTest.performModification(oBasicBin);
    sThingToTest.undoModification(oBasicBin, true);
    return !("End" in Object.keys(oBasicBin));
  });
  //UNDOING A REPLACEMENT OF AN IMMEDIATE PROPERTY WITH DELETE DISABLED FAILS
  uTester.addTest("Attempting to undo a replacement of an immediate property with delete disabled fails", function(){
    sThingToTest = new StatModification("", "End", "is nigh!", false);
    oBasicBin = {
      End: 0
    };
    sThingToTest.performModification(oBasicBin);  
    try{
      sThingToTest.undoModification(oBasicBin, false);
    }
    catch(e){
      if (e.message != "Cannot undo!") throw e;
      else return true;
    }
  });           
  /*
   *
   * Altering depth 1 properites works correctly  
   *
  */
  
  //INCREMENTING A DEPTH 1 PROPERTY
  
  uTester.addTest("Can increment depth 1 properties", function(){
    sThingToTest = new StatModification("Start.", "End", 1);
    oDepthOneBin = {
      Start: {End: 0}
    };
    sThingToTest.performModification(oDepthOneBin);
    return oDepthOneBin.Start.End == 1;
  }); 
  //REPLACING A DEPTH 1 PROPERTY
  uTester.addTest("Can replace depth 1 properties", function(){
    sThingToTest = new StatModification("Start", "End", "is nigh!", false);
    oDepthOneBin = {
      Start: {End: 0}
    };
    sThingToTest.performModification(oDepthOneBin);
    return oDepthOneBin.Start.End == "is nigh!";
  });           
  //CREATING A DEPTH 1 PROPERTY VIA INCREMENTATION
  uTester.addTest("Can create depth 1 properties via incrementation", function(){
    sThingToTest = new StatModification("Start", "Target", 1);
    oDepthOneBin = {
      Start: {End: 0}
    };
    sThingToTest.performModification(oDepthOneBin); 
    return oDepthOneBin.Start.End == 0 && oDepthOneBin.Start.Target == 1;
  }); 
  //CREATING A DEPTH 1 PROPERTY VIA SETTING
  uTester.addTest("Can create depth 1 properties and set them", function(){
    sThingToTest = new StatModification("Start", "Target", "tree", false);
    oDepthOneBin = {
      Start: {End: 0}
    };
    sThingToTest.performModification(oDepthOneBin);
    return oDepthOneBin.Start.Target == "tree";
    });      
  //UNDOING AN INCREMENTATION
  uTester.addTest("Can undo an incrementation on depth 1 properties", function(){
    sThingToTest = new StatModification("Start", "End", 1);
    oDepthOneBin = {
      Start: {End: 0}
    };          
    sThingToTest.performModification(oDepthOneBin);
    sThingToTest.undoModification(oDepthOneBin, false);
    return oDepthOneBin.Start.End == 0;
  }); 
  //UNDOING A REPLACEMENT OF AN IMMEDIATE PROPERTY WITH DELETE ENEABLED
  uTester.addTest("Can delete an depth 1 property", function(){
    sThingToTest = new StatModification("Start", "End", "is nigh!");
    oDepthOneBin = {
      Start: {End: 0}
    };
    sThingToTest.performModification(oDepthOneBin);
    sThingToTest.undoModification(oDepthOneBin, true);
    return !("End" in Object.keys(oDepthOneBin));
  });
  //UNDOING A REPLACEMENT OF AN IMMEDIATE PROPERTY WITH DELETE DISABLED FAILS
  uTester.addTest("Attempting to undo a replacement with delete disabled fails", function(){
    sThingToTest = new StatModification("Start", "End", "is nigh!", false);
    oDepthOneBin = {
      Start: {End: 0}
    };
    sThingToTest.performModification(oDepthOneBin);  
    try{
      sThingToTest.undoModification(oDepthOneBin, false);
    }
    catch(e){
      if (e.message != "Cannot undo!") throw e;
      else return true;
    }
  });           
  
  
  /*
   * 
   * RUN TESTS
   * RUN TESTS
   *
  */
       
  window.onload = function(){
    uTester.runInHTML();
  };            
