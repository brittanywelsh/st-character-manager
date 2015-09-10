/*global publish, CharacterController*/
function Feature(oConfig) {
    "use strict";
    
    //The name of this feature.
    this.name = oConfig.name;
    
    //The category to which this feature belongs.
    this.parentCategory = oConfig.parentCategory;
    
    //List of other features needed to compute this feature's score.
    this.dependentOnFeatures = oConfig.dependentOnFeatures || [];
    
    //If the following is true then contributors won't contribute anything.
    this.dependenciesOnly =  oConfig.dependenciesOnly || false;
    
    //List of 'unexpected' contributors to this feature's score.
    this.contributors = oConfig.contributors || {};
    
    //List of instructions to publish, indexed by display
    this.contributions = oConfig.contributions || {};
    
    //Table which converts a score to display information.  Use 'active' and 'inactive' for features that can be removed from characters.
    //'default' refers to anything not covered.
    this.displayTable = oConfig.displayTable;
}

var FeatureController = (function () {
    "use strict";
    
    var privateGetScore = function (fFeature) {
        var nSum = 0,
            oContributors = CharacterController.getContributors(fFeature.name);
        
        fFeature.dependentOnFeatures.forEach(
            function (sFeatureName) {
                nSum += CharacterController.getDisplay(sFeatureName);
            }
        );
        if (fFeature.dependenciesOnly === true) {
            return nSum;
        }
        
        Object.keys(oContributors).forEach(
            function (sContributorName) {
                nSum += oContributors[sContributorName];
            }
        );
        return nSum;
    },
    
        publicGetDisplay = function (fFeature) {
            var nScore = privateGetScore(fFeature),
                vDisplay = fFeature.displayTable[nScore];

            if (vDisplay !== undefined) {
                return vDisplay;
            }
            return fFeature.displayTable['default'];
        },
        
        publicUpdate = function (fFeature, sOrigin) {
            var oldDisplay = CharacterController.getDisplay(fFeature.name),
                newDisplay = publicGetDisplay(fFeature);
            
            if (typeof sOrigin !== 'string') {
                sOrigin = "update";
            }
            
            //PROBLEM: The following line of code forces displays to be litterals
            if (oldDisplay !== newDisplay) {
                CharacterController.setDisplay(fFeature.name, newDisplay);
                publish(
                    fFeature.parentCategory.name,
                    {
                        keyword: 'update',
                        target: fFeature.name,
                        value: newDisplay,
                        origin: sOrigin
                    }
                );
                if (fFeature.contributions[newDisplay]) {
                    fFeature.contributions[newDisplay].forEach(
                        function (sInstructionLabel) {
                            var oInstruction = fFeature.contributions[newDisplay][sInstructionLabel];
                            publish(oInstruction.channel, oInstruction);
                        }
                    );
                }
            }
        };
    
    return {
        getDisplay: publicGetDisplay,
        update: publicUpdate
    };
}());
