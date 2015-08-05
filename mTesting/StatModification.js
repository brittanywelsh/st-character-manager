function StatModification(sPath, sTarget, modificationValue, bIncrementValue){
  this.path = sPath;//make read only, string must end in "."
  this.target = sTarget;//make read only
  this.modificationValue = modificationValue;//make read only

  if (typeof this.path != "string") throw new Error("Path name must be string.");
  if (typeof this.target != "string") throw new Error("Target must be string");
  if (bIncrementValue && typeof this.modificationValue != "Number") throw new Error("Can only increment numbers.");
  if (this.path == "" || this.path.substr(this.path.length - 1) != "."){
    throw new Error("Path name must end in '.'");
  } 
}

StatModification.prototype.performModification = function (cCharacter){
  var sNextNode;
  var sPath;
  var oCurrentBin = cCharacter;
  
  while (sPath != ""){
    sNextNode = sPath.substr(0, sPath.getFirstIndexOf("."));
    sPath = sPath.substr(sPath.getFirstIndexOf(".") + 1, sPath.length - 1);
    oCurrentBin = oCurrentBin[sNextNode];
  }
  if (bIncrementValue){
    oCurrentBin[this.target] += this.modificationValue;
  } else {
    oCurrentBin[sTarget] = this.modificationValue;
  }
}

StatModification.prototype.undoModification = function (cCharacter, bDeleteOK){
  var sNextNode;
  var sPath;
  var oCurrentBin = cCharacter;
  if (!bDeleteOK) bDeleteOK = false;

  if (!bIncrementValue && ){
    throw new Error("Cannot undo!");
    return;
  }
  
  while (sPath != ""){
    sNextNode = sPath.substr(0, sPath.getFirstIndexOf("."));
    sPath = sPath.substr(sPath.getFirstIndexOf(".") + 1, sPath.length - 1);
    oCurrentBin = oCurrentBin[sNextNode];
  }

  if (bIncrementValue){
    oCurrentBin[this.target] -= this.modificationValue;
  } else if (bDeleteOK){
    delete oCurrentBin[this.target];
  } else {
    throw new Error("Cannot undo!")
  }
}
