/*global pubsub, FeatureController, CharacterController, console */

function setupListeners(fFeature) {
    "use strict";
        
    //Listen for other the features on which we depend to update.
    fFeature.dependentOnFeatures.forEach(function (sFeatureName) {
        pubsub.subscribe(sFeatureName, function (oData) {
            
            if (oData.keyword === "update") {
                FeatureController.update(this, oData.origin);
            }
        });
    });

    //Listen to your own channel for instructions
    pubsub.subscribe(fFeature.name, function relayInstruction(channel, oData) {
        //var fFeature = FeatureController.getFeature(oData.target),
        var fFeature = FeatureController.getFeature(channel),
            vNewDisplay;

        /*
         *Adds the contributor to the appropriate bin
        */
        if (oData.keyword === 'add' || oData.keyword === 'replace') {
            CharacterController.addContributors(oData);//will do what replace does
        } else if (oData.keyword === 'remove') {
            CharacterController.removeContributorFrom(oData);
        }  /*
        else if (oData.keyword === 'replace') {
            CharacterController.replaceContributorValue(oData);
            oData.suppressPublication = true;
             *CharacterController.removeContributorFrom(oData);
             *oData.suppressPublication = false;
             *CharacterController.addContributorTo(oData);
            
        }
        */
        FeatureController.update(fFeature);
    });
}