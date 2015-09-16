/*global Game, Buyer, CharacterController, pubsub, oAttributeBuyerOptions,
FeatureController, console*/

//Game.
var BaseAttributeBuyer = new Buyer({
    name: 'Base Attribute Buyer',
    //options: Game.Features.BaseAttributes,
    options: oAttributeBuyerOptions,
    defaultBuy: {
        Strength: 10,
        Dexterity: 10,
        Constitution: 10,
        Intelligence: 10,
        Wisdom: 10,
        Charisma: 10
    },
    origin: "base",
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
            max = 18,
            nDisplay,
            nSum = 0,
            self = this,
            lOptionsList = Object.keys(this.options),
            nIndex,
            sOptionName,
            messageEnd;

        //Object.keys(this.options).forEach(function (sOptionName) {
        for (nIndex = 0; nIndex < lOptionsList.length; nIndex += 1) {
            sOptionName = lOptionsList[nIndex];
            nDisplay = oDesiredPurchase[sOptionName] ||
                CharacterController.getDisplay(FeatureController.getFeature(sOptionName)) ||
                self.defaultBuy[sOptionName];
            if (nDisplay < min || nDisplay > max) {
                console.log(nDisplay > max, max);
                messageEnd = (nDisplay > max) ? 'high.' : 'low.';
                pubsub.publish('Game Logic Errors',
                        self.name + ': tried to buy ' + nDisplay + ' for ' +//
                        sOptionName + '. This is too ' + messageEnd);
                return false;
            } else {
                nSum += costs[nDisplay];
            }
        }
        if (nSum > wallet) {
            pubsub.publish('Game Logic Errors', this.name + ': purchase failed due to insufficient funds.');
        }
        return (nSum <= wallet);
    }
});