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
    this.defaultOptionDisplay = oConfig.defaultOptionDisplay;
    this.isLegalBuy = oConfig.isLegalBuy;
        
    this.makeBuy = function (oDesiredPurchase) {
        this.options.forEach(function (sOptionName) {
            if (!oDesiredPurchase[sOptionName]) {
                if (!CharacterController.getDisplay(this.options[sOptionName])) {
                    oDesiredPurchase[sOptionName] = this.defaultOptionDisplay;
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
        } else {
            publish('Game Logic Errors', this.name + ': purchase failed due to insufficient funds.');
        }
    };
}

/*
 *  The following sets up inheritance correctly according to:
 *      https://gist.github.com/csnover/eb8ef0bbfac0329bbca5
*/
//Buyer.prototype = Object.create(Feature.prototype);
//Buyer.prototype.constructor = Buyer;

    
    /*
     *
     *With an eye towards abstraction: these three can be replaced by a
     *'satisfiesConstraints' method.
     *
    
    
    this.costs = oConfig.costs;
    this.min = oConfig.min;
    this.max = oConfig.max;
    this.wallet = oConfig.wallet;

    if (this.min > this.max) {
        throw new Error("Min and max incompatible");
    }
    
    this.makeBuy = function (oDesiredPurchase) {
        var nDisplay,
            nSum = 0;
        
        this.options.forEach(function (sOptionName) {
            nDisplay = oDesiredPurchase[sOptionName] ||
                CharacterController.getBuyOptionDisplay[sOptionName];
            if (nDisplay < this.min || nDisplay > this.max) {
                var messageEnd = (nDisplay > this.max) ? 'high.' : 'low.';
                publish('Game Logic Errors',
                        this.name + ': tried to buy ' + nDisplay + ' for ' +//
                        sOptionName + '. This is too ' + messageEnd);
                return;
            }
            nSum += this.costs[nDisplay];
        });
*/