var AttributesView = (function () {

  /* Local Variables */
  h = HTMLShortcuts;

  /* Methods */
  var generateViewOfAttributeBuyer = function() {
    var viewTitle = h.encloseInHeadingTags(Character.Name || 'Character ' + Character.index);
    var viewButtons = '\
      <a href="#" class="medium success button">Save</a>\
      <a href="#" class="medium button">Print</a>\
      <a href="#" class="medium alert button">Delete</a>\
      ';
    var viewHeader = h.encloseInCenteredDiv( viewTitle + viewButtons );
    $("#character-sheet").html(viewHeader);
  };

  /* Public Methods */
  return {
    newPublicMethodName: newPublicMethodName,
  };

})();