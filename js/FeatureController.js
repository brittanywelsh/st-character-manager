/*global CharacterController, publish */

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
            
            if (!fFeature.displayTable) {
                return nScore;
            }

            if (vDisplay !== undefined) {
                return vDisplay;
            }
            return fFeature.displayTable.notFound;
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