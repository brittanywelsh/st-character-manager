function Feature(oConfig) {
    "use strict";
    
    //The name of this feature.
    this.name = oConfig.name;
    
    //The container name in Character in which this can be found.
    this.containerName = oConfig.containerName;
    
    //List of other features needed to compute this feature's score.
    this.dependentOnFeatures = oConfig.dependentOnFeatures || [];
    
    //If the following is true then contributors won't contribute anything.
    //this.dependenciesOnly =  oConfig.dependenciesOnly || false;
    
    //List of 'unexpected' contributors to this feature's score.
    //THIS SHOULD EXIST ON A CHARACTER, NOT THE FEATURE
    this.contributors = oConfig.contributors || {};
    
    //List of instructions to publish, indexed by display
    this.contributions = oConfig.contributions || {};
    
    //Table which converts a score to display information.  Use 'active' and 'inactive' for features that can be removed from characters.
    //'default' refers to anything not covered.
    this.displayTable = oConfig.displayTable;
}