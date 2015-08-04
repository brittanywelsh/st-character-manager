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

  /* Public Methods */
  return {
    encloseInHeadingTags: encloseInHeadingTags,
    encloseInCenteredDiv: encloseInCenteredDiv,
  };

})();