/*global Game, Buyer, CharacterController, publish, oAttributeBuyerOptions*/

//Game.
var BaseAttributeBuyer = new Buyer({
    name: 'Base Attribute Buyer',
    //options: Game.Features.BaseAttributes,
    options: oAttributeBuyerOptions,
    defaultBuy: {
        BaseStrength: 10,
        BaseDexterity: 10,
        BaseConstitution: 10,
        BaseIntelligence: 10,
        BaseWisdom: 10,
        BaseCharisma: 10
    },
    isLegalBuy: function (oDesiredPurchase) {
        "use strict";
        var wallet = 15,//points to buy attributes
            costs = {
                "7": -4,
                "8": -2,
                "9": -1,
                "10": 0,
                "11": 1,
                "12": 2,
                "13": 3,
                "14": 5,
                "15": 7,
                "16": 10,
                "17": 13,
                "18": 17
            },
            min = 7,
            max = 8,
            nDisplay,
            nSum = 0;
        
        Object.keys(this.options).forEach(function (sOptionName) {
            nDisplay = oDesiredPurchase[sOptionName] ||
                CharacterController.getDisplay[sOptionName];
            if (nDisplay < this.min || nDisplay > this.max) {
                var messageEnd = (nDisplay > this.max) ? 'high.' : 'low.';
                publish('Game Logic Errors',
                        this.name + ': tried to buy ' + nDisplay + ' for ' +//
                        sOptionName + '. This is too ' + messageEnd);
                return false;
            } else {
                nSum += this.costs[nDisplay];
            }
        });
        if (nSum > this.wallet) {
            publish('Game Logic Errors', 'Base Attribute Buyer: purchase failed due to insufficient funds.');
        }
        return (nSum <= this.wallet);
    }
});