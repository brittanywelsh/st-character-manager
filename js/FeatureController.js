/*global CharacterController, pubsub, Game, console */

var FeatureController = (function () {
    "use strict";
    
    var privateGetScore = function (fFeature) {
        //console.log("FeatureController.getScore called on", fFeature.name);
        var nSum = 0,
            oContributors = CharacterController.getContributors(fFeature);
        
        Object.keys(fFeature.dependentOnFeatures).forEach(
            function (sFeatureName) {
                nSum += CharacterController.getDisplay(fFeature.dependentOnFeatures[sFeatureName]);
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
            //console.log("FeatureController.getDisplay called on argument", fFeature.name);

            var nScore = privateGetScore(fFeature),//
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
            //console.log("FeatureController.update called on arguments", fFeature.name);

            var oldDisplay = CharacterController.getDisplay(fFeature),//undefined
                newDisplay = publicGetDisplay(fFeature);//
                        
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
                            //console.log("Instructions are being passed!");
                            var oInstruction = fFeature.contributions[newDisplay][sInstructionLabel];
                            pubsub.publish(oInstruction.channel, oInstruction);
                        }
                    );
                }
            }
        },
        publicGetFeature = function (sFeatureName) {
            //console.log("FeatureController.getFeature called on", sFeatureName);

            return Game.Features[sFeatureName];//Make this internal
        };
    
    return {
        getDisplay: publicGetDisplay,
        update: publicUpdate,
        getFeature: publicGetFeature
    };
}());