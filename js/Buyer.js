/*global Feature, CharacterController, pubsub */

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

    this.name = oConfig.name;
    this.options = oConfig.options;//object of features
    this.origin = oConfig.origin;
    this.defaultBuy = oConfig.defaultBuy || {};
    this.isLegalBuy = oConfig.isLegalBuy;
        
    this.makeBuy = function (oDesiredPurchase) {
        var self = this;
        Object.keys(this.options).forEach(function (sOptionName) {
            if (!oDesiredPurchase[sOptionName]) {
                if (!CharacterController.getDisplay(self.options[sOptionName])) {
                    oDesiredPurchase[sOptionName] = self.defaultBuy[sOptionName];
                } else {
                    oDesiredPurchase[sOptionName] = CharacterController.getDisplay(self.options[sOptionName]);
                }
            }
        });

        if (this.isLegalBuy(oDesiredPurchase)) {
            Object.keys(oDesiredPurchase).forEach(function (sOptionName) {
                pubsub.publish(sOptionName, {
                    keyword: "add",
                    target: sOptionName,
                    value: oDesiredPurchase[sOptionName],
                    origin: self.origin + sOptionName
                });
            });
        }
    };
}