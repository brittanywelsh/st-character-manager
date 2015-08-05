var HTMLShortcuts = (function () {

  /* Local Variables */
  //

  /* Methods */
  var encloseInHeadingTags = function(string) {
    outputString = '<h2>' + string + '</h2>';
    return outputString;
  };

  var encloseInCenteredDiv = function(string) {
    outputString = '<div align="center">' + string + '</div>';
    return outputString;
  };

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

  /* Public Methods */
  return {
    encloseInHeadingTags: encloseInHeadingTags,
    encloseInCenteredDiv: encloseInCenteredDiv,
    getIndexOfChildNode: getIndexOfChildNode,
  };

})();