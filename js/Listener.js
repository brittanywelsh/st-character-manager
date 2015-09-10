/*global subscribe, FeatureController, CharacterController */

function Listener(fFeature) {
    "use strict";
    
    this.myFeature = fFeature;
    
    //Listen for other the features on which we depend to update.
    this.myFeature.dependentOnFeatures.forEach(function (sFeatureName) {
        subscribe(this, sFeatureName, function (oData) {
            
            if (oData.keyword === "update") {
                FeatureController.update(this, oData.origin);
            }
        });
    });

    //Listen to your own channel for instructions
    subscribe(this, this.myFeature.name, function relayInstruction(oData) {
        var fFeature = FeatureController.getFeature(oData.target),
            vNewDisplay;

        /*
         *Adds the contributor to the appropriate bin
        */
        if (oData.keyword === 'add' || oData.keyword === 'replace') {
            CharacterController.addContributorTo(oData);//will do what replace does
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
        FeatureController.update(this.myFeature);
    });
}