function StatModification(sPath, sTarget, modificationValue, bIncrementValue){
  var Path = sPath;//make read only, string must end in "."
  var Target = sTarget;//make read only
  var ModificationValue = modificationValue;//make read only 
  var IncrementValue = (bIncrementValue == undefined) ? (typeof ModificationValue == "number"):!!bIncrementValue;
  
  this.path = function() {return Path};
  this.target = function() {return Target};
  this.modificationValue = function() {return ModificationValue};
  this.incrementValue = function() {return IncrementValue}; 
  
  if (typeof Path != "string") throw new Error("Path name must be a string.");
  if (typeof Target != "string") throw new Error("Target must be a string.");
  if (IncrementValue && typeof ModificationValue != "number") throw new Error("Can only increment numbers.");
  if (Path == "" || Path.substr(Path.length - 1) != "."){
    Path += "."
  }
}

StatModification.prototype.performModification = function (cCharacter){
  var sNextNode;
  var sPath = this.path();
  var oCurrentBin = cCharacter;
  
  while (sPath != "" && sPath !="."){
    sNextNode = sPath.substr(0, sPath.indexOf("."));
    sPath = sPath.substr(sPath.indexOf(".") + 1, sPath.length - 1);
    oCurrentBin = oCurrentBin[sNextNode];
  }
  if (!this.incrementValue() || !(oCurrentBin[this.target()])){
    oCurrentBin[this.target()] = this.modificationValue();
  } else {
    oCurrentBin[this.target()] += this.modificationValue();
  }
}

StatModification.prototype.undoModification = function (cCharacter, bDeleteOK){
  var sNextNode;
  var sPath = this.path();
  var oCurrentBin = cCharacter;
  bDeleteOK = !!bDeleteOK; 
  
  while (sPath != "" && sPath != "."){
    sNextNode = sPath.substr(0, sPath.indexOf("."));
    sPath = sPath.substr(sPath.indexOf(".") + 1, sPath.length - 1);
    oCurrentBin = oCurrentBin[sNextNode];
  }

  if (this.incrementValue()){
    oCurrentBin[this.target()] -= this.modificationValue();
  } else if (bDeleteOK){
    delete oCurrentBin[this.target()];
  } else {
    throw new Error("Cannot undo!")
  }
}
