var Attributes = (function () {

  /* Local Variables */
  var attributeList: ["STR", "CON", "DEX", "INT", "WIS", "CHA"];
  var pointsCost: {
    "7":-4,
    "8":-2,
    "9":-1,
    "10":0,
    "11":1,
    "12":2,
    "13":3,
    "14":5,
    "15":7,
    "16":10,
    "17":13,
    "18":17
  };

  /* Methods */
  var getAttributeList = function() {
    return attributeList;
  };

  var getPointsCost = function(nPoints) {
    return pointsCost;
  };

  /* Public Methods */
  return {
    getAttributeList: getAttributeList,
    getPointsCost: getPointsCost,
  };

})();