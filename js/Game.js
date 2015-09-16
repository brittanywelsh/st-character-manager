/*global Feature, setupListeners, Buyer, CharacterController, publish*/
/*
oConfig.name;
oConfig.containerName;
oConfig.dependentOnFeatures || [];
oConfig.contributions || {};
oConfig.displayTable;
*/

var Game = {};

/*
    this.options = oConfig.options;//listOfFeatures
    this.defaultBuy = oConfig.defaultBuy || {};
    this.defaultOptionDisplay = oConfig.defaultOptionDisplay;
    this.isLegalBuy = oConfig.isLegalBuy;
    */

Game.Features = {};
Game.Features.BaseAttributes = {};
Game.Features.BaseAttributes.Strength = new Feature({
    name: 'BaseStrength',
    containerName: 'BaseAttributes'
});
Game.Attributes = {};
Game.AttributesData.ListOfFeatureNames =
    [
        'Strength',
        'Dexterity',
        'Intelligence',
        'Wisdom',
        'Constitution',
        'Charisma'
    ];
Game.Attributes.Stength = new Feature({
    name: 'Strength',
    containerName: 'Attributes',
    dependentOnFeatures: ['BaseStrength']
});
setupListeners(Game.BaseAttributes.Strength);
setupListeners(Game.Attributes.Strength);


Game.BaseAttributeBuyer = new Buyer({
    name: 'Base Attribute Buyer',
    options: Game.Features.BaseAttributes,
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
        
        this.options.forEach(function (sOptionName) {
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