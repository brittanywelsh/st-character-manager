/*global Feature, CharacterController, publish */

function Buyer(oConfig) {
    "use strict";
    
    /*
     *Only having a default display guarentees that this feature is never
     *updated
     
    oConfig.displayTable = {
        notFound: "hidden"
    };
     *
     *Feature.call(this, oConfig);
     *
    */

    
    this.options = oConfig.options;//listOfFeatures
    this.defaultBuy = oConfig.defaultBuy || {};
    this.isLegalBuy = oConfig.isLegalBuy;
        
    this.makeBuy = function (oDesiredPurchase) {
        Object.keys(this.options).forEach(function (sOptionName) {
            if (!oDesiredPurchase[sOptionName]) {
                if (!CharacterController.getDisplay(this.options[sOptionName])) {
                    oDesiredPurchase[sOptionName] = this.defaultBuy[sOptionName];
                } else {
                    oDesiredPurchase[sOptionName] = CharacterController.getDisplay(this.options[sOptionName]);
                }
            }
        });

        if (this.isLegalBuy(oDesiredPurchase)) {
            Object.keys(oDesiredPurchase).forEach(function (sOptionName) {
                publish(sOptionName, {
                    keyword: "add",
                    target: sOptionName,
                    value: oDesiredPurchase[sOptionName],
                    origin: this.name
                });
            });
        }
    };
}