var HTMLShortcuts = (function () {

  /* Local Variables */
  //

  /* Methods */
  var getIndexOfChildNode = function(nodeObject) {
    var index = 0;
    var node = nodeObject;
    while(node.previousSibling) {
      node = node.previousSibling;
      if (node.nodeType === 1) {
        index++;
      }
    }
    return index;
  };

  var encloseInHeading = function(string) {
    outputString = '<h2>' + string + '</h2>';
    return outputString;
  };

  var encloseInSubheading = function(string) {
    outputString = '<hr><h3 class="subheader">' + string + '</h3>';
    return outputString;
  };

  var encloseInP = function(string) {
    outputString = '<p>' + string + '</p>';
    return outputString;
  };

  var encloseInB = function(string) {
    outputString = '<strong>' + string + '</strong>';
    return outputString;
  };

  var encloseInCenteredDiv = function(string) {
    outputString = '<div align="center">' + string + '</div>';
    return outputString;
  };

  var encloseInLeftDiv = function(string) {
    outputString = '<div align="left">' + string + '</div>';
    return outputString;
  };

  var encloseInRightDiv = function(string) {
    outputString = '<div align="right">' + string + '</div>';
    return outputString;
  };

  var encloseInForm = function(string) {
    outputString = '<form>' + string + '</form>';
    return outputString;
  }

  var encloseInLabel = function(label, string) {
    outputString = '<label>' + label + string + '</label>';
    return outputString;
  }

  /* Methods using Foundation css */
  var f_encloseInDivClassRow = function(string) {
    outputString = '<div class="row">' + string + '</div>';
    return outputString;
  };

  var f_encloseInDivClassColumns = function(string, nSmall, nMedium, nLarge) {
    classString = '';
    if (nSmall) { classString = classString + 'small-' + nSmall; };
    if (nMedium) { classString = classString + ' small-' + nMedium; };
    if (nLarge) { classString = classString + ' small-' + nLarge; };
    classString += ' columns';
    outputString = '<div class="' + classString + '">' + string + '</div>';
    return outputString;
  };

  var f_encloseInGrid = function(nRows, nColumns, aColumnWidths, aValues) {
    var finalOutputString = '';
    var i = 0; // array index for values array
    for (j = 0; j < nRows; j++) {
      var newRowString = '';
      for (k = 0; k < nColumns; k++) {
        newRowString += f_encloseInDivClassColumns(aValues[i], aColumnWidths[k]);
        i++;
      }
      finalOutputString += f_encloseInDivClassRow(newRowString);
    };
    return finalOutputString;
  }

  /* Public Methods */
  return {
    getIndexOfChildNode: getIndexOfChildNode,

    encloseInHeading: encloseInHeading,
    encloseInSubheading: encloseInSubheading,
    encloseInP: encloseInP,
    encloseInB: encloseInB,
    encloseInCenteredDiv: encloseInCenteredDiv,
    encloseInLeftDiv: encloseInLeftDiv,
    encloseInRightDiv: encloseInRightDiv,
    encloseInForm: encloseInForm,
    encloseInLabel: encloseInLabel,

//    asTextInput: asTextInput,

    f_encloseInDivClassRow: f_encloseInDivClassRow,
    f_encloseInDivClassColumns: f_encloseInDivClassColumns,
    f_encloseInGrid: f_encloseInGrid,
  };

})();