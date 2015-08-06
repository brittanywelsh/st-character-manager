function UnitTest(){
  var Tests = new Object();  
         
  this.run = function(){ 
    var TestResults = new Object();                                 
    Object.keys(Tests).forEach(function (sTestName){ 
      try{
        var bOutput = Tests[sTestName]();
        if (typeof bOutput != "boolean"){
          TestResults[sTestName] = "Bad test! Did not generate boolean value!";
        } 
        else {
          TestResults[sTestName] = (bOutput) ? "Passed!": "Failed!"; 
        }
      } 
      catch(e){  
        if ( e instanceof Error) TestResults[sTestName] = "Threw exception: " + e.message;
        else TestResults[sTestName] = "Threw exception: " + e; 
      }
    });
    return TestResults;
  }
  
  this.runTest = function (sTestName){
    var TestResult = "";                                 
    try{
      var bOutput = Tests[sTestName]();
      if (typeof bOutput != "boolean"){
        TestResult = "Bad test! Did not generate boolean value!";
      } 
      else {
        TestResult = (bOutput) ? "Passed!": "Failed!"; 
      }
    } catch(e){
        TestResult = "Threw exception: " + e.message; 
    }
  return TestResult;
  }
  
  this.addTest = function(sTestName, fNewTest){
    try{
      if (Tests[sTestName]){
        throw new Error("Test name already selected.  Try another name");
      }
    }
    catch(e){
      return;
    }        
    Tests[sTestName] = fNewTest;
  } 
  
  this.removeTest = function(sTestName){
    delete Tests[sTestName];
  }
  this.getTestNames = function(){
    return Object.keys(Tests);
  }
}

UnitTest.prototype.runInHTML = function(){
  var TestTable = document.createElement('Table');
  TestTable.border = "1"; 
  document.body.appendChild(TestTable);
  var Results = this.run();
  this.getTestNames().forEach(function (sTestName){
    var newRow = TestTable.insertRow();
    var nameCell = newRow.insertCell();
    nameCell.innerHTML = sTestName + " result:"
    var displayCell = newRow.insertCell();
    displayCell.innerHTML = Results[sTestName];
    if (Results[sTestName] == "Passed!") displayCell.style.backgroundColor = 'LightGreen';
    if (Results[sTestName] == "Failed!") displayCell.style.backgroundColor = 'Red'; 
  } );
}
