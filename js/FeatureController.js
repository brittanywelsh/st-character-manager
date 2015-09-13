/*global CharacterController, pubsub, Game, console */

var FeatureController = (function () {
    "use strict";
    
    var privateGetScore = function (fFeature) {
        var nSum = 0,
            oContributors = CharacterController.getContributors(fFeature);
        console.log(oContributors);
        
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
                vDisplay;
            
            if (!fFeature.displayTable) {
                return nScore;
            }
            
            vDisplay = fFeature.displayTable[nScore];

            if (vDisplay !== undefined) {
                return vDisplay;
            }
            return fFeature.displayTable.notFound;
        },
        
        publicUpdate = function (fFeature, sOrigin) {
            var oldDisplay = CharacterController.getDisplay(fFeature),
                newDisplay = publicGetDisplay(fFeature);
            
            if (typeof sOrigin !== 'string') {
                sOrigin = "update";
            }
            
            //PROBLEM: The following line of code forces displays to be litterals
            if (oldDisplay !== newDisplay) {
                CharacterController.setDisplay(fFeature, newDisplay);
                pubsub.publish(
                    fFeature.name,
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
                            pubsub.publish(oInstruction.channel, oInstruction);
                        }
                    );
                }
            }
        },
        publicGetFeature = function (sFeatureName) {
            return Game.Features[sFeatureName];
        };
    
    return {
        getDisplay: publicGetDisplay,
        update: publicUpdate,
        getFeature: publicGetFeature
    };
}());