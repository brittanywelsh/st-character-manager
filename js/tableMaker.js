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