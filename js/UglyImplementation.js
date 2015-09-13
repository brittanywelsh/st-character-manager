/*
 *
 *  THIS FILE IS TO BE USED TO BEGIN A BRUTE-FORCE IMPLEMENTATION OF THE CHARACTER MANAGER AND THEREBY TO LEARN FROM THE EXPERIENCE
 *
*/

/*global Feature, setupListeners, pubsub, BaseAttributeBuyer, setViewBinRowSpan, tableMaker*/

pubsub.subscribe('BaseAttributeBuyer', function (channel, data) {
    "use strict";
    BaseAttributeBuyer.makeBuy(data);
});

var AttributeList = [
        'Strength',
        'Intelligence',
        'Wisdom',
        'Constitution',
        'Dexterity',
        'Charisma'
    ],
    AttributeModifierDisplayTable = {},
    i,
    viewStructure = {
        top: true,
        children: {
            AttributeColumnHeader: {
                display: "Attribute",
                children: {
                    AttributeScoreColumnHeader: {
                        display: "Attribute Score",
                        children: {
                            AttributeModifierScoreColumnHeader: {
                                display: "Attribute Modifier"
                            }
                        }
                    }
                }
            }
        }
    },
    oAttributeBuyerOptions = {},
    Game = {Features: {}};

for (i = 0; i <= 100; i += 1) {
    AttributeModifierDisplayTable[i] = Math.floor((i - 10) / 2);
}

AttributeList.forEach(function (sAttributeName) {
    "use strict";

    var fNewAttribute,
        dependencies = {},
        fNewAttributeModifier;
    
    fNewAttribute = new Feature(
        {
            name: sAttributeName,
            containerName: 'Attributes'
        }
    );
    dependencies[sAttributeName] = fNewAttribute;
    fNewAttributeModifier = new Feature(
        {
            name: sAttributeName + 'Modifier',
            containerName: 'AttributeModifiers',
            dependentOnFeatures: dependencies,
            displayTable: AttributeModifierDisplayTable
        }
    );
    
    Game.Features[fNewAttribute.name] = fNewAttribute;
    Game.Features[fNewAttributeModifier.name] = fNewAttributeModifier;
    
    oAttributeBuyerOptions[fNewAttribute.name] = fNewAttribute;
    
    setupListeners(fNewAttribute);
    setupListeners(fNewAttributeModifier);
    
    viewStructure.children[sAttributeName] = {
        display: sAttributeName,
        id: sAttributeName,
        children: {}
    };
    viewStructure.children[sAttributeName].children[sAttributeName + 'Score'] =
        {
            id: sAttributeName + 'Score',
            children: {},
            display: "10"
        };
    viewStructure.children[sAttributeName].children[sAttributeName + 'Score']
        .children[sAttributeName + 'Modifier'] =
        {
            id: sAttributeName + 'Modifier',
            display: "0"
        };
    pubsub.subscribe(sAttributeName, function (channel, data) {
        if (data.keyword === "update") {
            document.getElementById(sAttributeName + 'Score').innerHTML = data.value;
        }
    });
    pubsub.subscribe(sAttributeName + 'Modifier', function (channel, data) {
        if (data.keyword === "update") {
            document.getElementById(sAttributeName + 'Modifier').innerHTML = data.value;
        }
    });
});

setViewBinRowSpan(viewStructure);

