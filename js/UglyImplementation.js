/*
 *
 *  THIS FILE IS TO BE USED TO BEGIN A BRUTE-FORCE IMPLEMENTATION OF THE CHARACTER MANAGER AND THEREBY TO LEARN FROM THE EXPERIENCE
 *
*/

/*global Feature, setupListeners, pubsub, BaseAttributeBuyer*/

function setViewBinHeight(oBin) {
    "use strict";
    var nSum = 0;
    
    if (!oBin.children) {
        oBin.height = 1;
    } else {
        Object.keys(oBin.children).forEach(function (sChildName) {
            nSum += setViewBinHeight(oBin.children[sChildName]);
        });
        oBin.height = nSum;
    }
}

function tableMaker(oBin) {
    "use strict";
    var oChildrenDivs = {},
        childrenDiv,
        myDiv,
        bigDiv;
    
    myDiv = document.createElement('div');
    myDiv.height = (oBin.height * 10).toString() + 'px';
    myDiv.innerHTML = oBin.display || "";
    
    if (oBin.children) {
        Object.keys(oBin.children).forEach(function (sChildName) {
            var oChild = oBin.children[sChildName];
            
            oChildrenDivs[sChildName] = tableMaker(oChild);
        });
        childrenDiv = document.createElement('div');
        childrenDiv.style = "float: right";
        Object.keys(oChildrenDivs).forEach(function (dDivName) {
            childrenDiv.appendChild(oChildrenDivs[dDivName]);
        });
        
        bigDiv = document.createElement('div');
        bigDiv.appendChild(myDiv);
        bigDiv.appendChild(childrenDiv);
        myDiv = bigDiv;
    }
    return myDiv;
}

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
        id: "main",
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
    };

for (i = 0; i <= 100; i += 1) {
    AttributeModifierDisplayTable[i] = Math.floor((i - 10) / 2);
}

AttributeList.forEach(function (sAttributeName) {
    "use strict";

    var fNewAttribute = new Feature(
        {
            name: sAttributeName,
            containerName: 'Attributes'
        }
    ),
        
        fNewAttributeModifier = new Feature(
            {
                name: sAttributeName + 'Modifier',
                containerName: 'AttributeModifiers',
                dependentOnFeatures: sAttributeName,
                displayTable: AttributeModifierDisplayTable
            }
        );
    
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
            children: {}
        };
    viewStructure.children[sAttributeName].children[sAttributeName + 'Score']
        .children[sAttributeName + 'Modifier'] =
        {
            id: sAttributeName + 'Modifier'
        };
});

setViewBinHeight(viewStructure);

