/*global Feature, setupListeners, Buyer*/
/*
oConfig.name;
oConfig.containerName;
oConfig.dependentOnFeatures || [];
oConfig.contributions || {};
oConfig.displayTable;
*/

var Game = {};

Game.BaseAttributeBuyer = new Buyer({
    
});

Game.BaseAttributes = {};
Game.BaseAttributes.Strength = new Feature({
    name: 'BaseStrength',
    containerName: 'BaseAttributes'
});
Game.Attributes = {};
Game.Attributes.Stength = new Feature({
    name: 'Strength',
    containerName: 'Attributes',
    dependentOnFeatures: ['BaseStrength']
});
setupListeners(Game.BaseAttributes.Strength);
setupListeners(Game.Attributes.Strength);
