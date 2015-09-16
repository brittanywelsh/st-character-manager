function tableMaker(oBin) {
    "use strict";
    var oChildrenDivs = {},
        childrenDiv,
        myDiv,
        bigDiv = document.createElement('div');
    
    myDiv = document.createElement('div');
    myDiv.style.height = oBin.height || "20px";
    myDiv.innerHTML = oBin.display || "";
    myDiv.id = oBin.id;
    myDiv.style.border = "1px solid black";
    myDiv.style.float = "right";

    
    if (oBin.children) {
        Object.keys(oBin.children).forEach(function (sChildName) {
            var oChild = oBin.children[sChildName];
            
            oChildrenDivs[sChildName] = tableMaker(oChild);
            oChildrenDivs[sChildName].style.float = "left";
        });
        childrenDiv = document.createElement('div');
        childrenDiv.style.float = "right";
        Object.keys(oChildrenDivs).forEach(function (dDivName) {
            childrenDiv.appendChild(oChildrenDivs[dDivName]);
        });
        
        bigDiv.appendChild(childrenDiv);
    }

    bigDiv.appendChild(myDiv);
    return bigDiv;
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
    }
    if (!oTableData.row) {
        oTableData.row = oTableData.table.insertRow();
    }
    myCell = oTableData.row.insertCell();
    myCell.rowSpan = oBin.rowSpan;
    myCell.innerHTML = oBin.display;
    myCell.id = oBin.id;
    if (oBin.children) {
        Object.keys(oBin.children).forEach(function (sChildName) {
            oChild = oBin.children[sChildName];
            altTableMaker(oChild, oTableData);
        });
    } else {
        oTableData.row = oTableData.table.insertRow();
    }
}

var viewStructure = {
    id: "main",
    display: "test",
    children: {},
    height: "42px"
};

viewStructure.children.second = {
    id: "second",
    display: 'this is my second cell',
    children: {}
};
viewStructure.children.twin = {
    id: "twin",
    display: 'I should appear below the second cell'
};
viewStructure.children.second.children.firstchild = {
    id: "foo",
    display: "I'm second's first child"
};
viewStructure.children.second.children.secondchild = {
    id: "bar",
    display: "I'm second's second child"
};
viewStructure.children.second.children.thirdchild = {
    id: "foobar",
    display: "I'm second's third child"
};