/*global pubsub, FeatureController, CharacterController, console */

function setupListeners(fFeature) {
    "use strict";
        
    //Listen for other the features on which we depend to update.
    Object.keys(fFeature.dependentOnFeatures).forEach(function (sFeatureName) {
        pubsub.subscribe(sFeatureName, function (channel, oData) {
            //console.log("Update Listener called with arguments:", channel, oData, "setupListeners: 8");
            if (oData.keyword === "update") {
                FeatureController.update(fFeature, oData.origin);
            }
        });
    });

    //Listen to your own channel for instructions
    pubsub.subscribe(fFeature.name, function relayInstruction(channel, oData) {
        //console.log("relayInstruction called with arguments:", channel, oData, "setupListeners: 18");
        //var fFeature = FeatureController.getFeature(oData.target),
        var fFeature = FeatureController.getFeature(channel),
            vNewDisplay;

        /*
         *Adds the contributor to the appropriate bin
        */
        if (oData.keyword === 'add' || oData.keyword === 'replace') {
            CharacterController.addContributors(oData);//will do what replace does
            //FeatureController.update(fFeature);
        } else if (oData.keyword === 'remove') {
            CharacterController.removeContributors(oData);
            //FeatureController.update(fFeature);
        }  /*
        else if (oData.keyword === 'replace') {
            CharacterController.replaceContributorValue(oData);
            oData.suppressPublication = true;
             *CharacterController.removeContributorFrom(oData);
             *oData.suppressPublication = false;
             *CharacterController.addContributorTo(oData);
            
        }
        */
    });
}