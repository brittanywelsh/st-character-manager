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
    myDiv.id = oBin.id;
    myDiv.style.border = "1px solid black";

    
    if (oBin.children) {
        Object.keys(oBin.children).forEach(function (sChildName) {
            var oChild = oBin.children[sChildName];
            
            oChildrenDivs[sChildName] = tableMaker(oChild);
        });
        childrenDiv = document.createElement('div');
        childrenDiv.style.cssFloat = "right";
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
function setViewBinRowSpan(oBin) {
    "use strict";
    var nSum = 0;
    
    if (!oBin.children) {
        oBin.rowSpan = 1;
    } else {
        Object.keys(oBin.children).forEach(function (sChildName) {
            setViewBinRowSpan(oBin.children[sChildName]);
            nSum += oBin.children[sChildName].rowSpan;
        });
        oBin.rowSpan = nSum;
    }
}

function altTableMaker(oBin, oTableData) {
    "use strict";
    
    var myCell,
        oChild;
    
    if (!oTableData) {
        oTableData = {};
    }
    if (!oTableData.table) {
        oTableData.table = document.createElement('table');
        oTableData.table.border = "1";
        document.body.appendChild(oTableData.table, 0);
    }
    if (!oTableData.row) {
        oTableData.row = oTableData.table.insertRow();
    }
    if (oBin.top !== true) {
        myCell = oTableData.row.insertCell();
        myCell.rowSpan = oBin.rowSpan;
        myCell.innerHTML = oBin.display;
        myCell.id = oBin.id;
    }
    if (oBin.children) {
        Object.keys(oBin.children).forEach(function (sChildName) {
            oChild = oBin.children[sChildName];
            altTableMaker(oChild, oTableData);
        });
    } else {
        oTableData.row = oTableData.table.insertRow();
    }
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

    var fNewAttribute = new Feature(
        {
            name: sAttributeName,
            containerName: 'Attributes'
        }
    ),
        dependencies = {};
    dependencies[sAttributeName] = fNewAttribute;
    var fNewAttributeModifier = new Feature(
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

