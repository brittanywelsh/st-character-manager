/*
 *
 *
 *      EXISTING DEPENDENCIES FOR THIS FILE
 *
 *              -Character.js
 *
 *      PUBLIC METHODS IMPLEMENTED
 *
 *
 *publicGetBaseAttributeScoreFromCharacter(sAttributeName, cCharacter):
 *  Arguments:
 *      sAttributeName: STRING. The name of the attribute to be retrieved.
 *      cCharacter:     CHARACTER. The character object to be altered.
 *
 *  Description: Retrieves the base score for the given attribute from 
 *               the given character.
 *
 *
 *
 *
 *publicIncrementBaseAttributeScoreOnCharacter(sAttributeName, cCharacter, bIncrease):
 *  Arguments:
 *      sAttributeName: STRING. The name of the attribute to be altered.
 *      cCharacter:     CHARACTER. The character object to be altered.
 *      bIncrease:      BOOLEAN. Determines whether the alteration is an 
 *                          increment or a decrement.
 *
 *  Description: Increments or decrements the given base attribute score for
 *               the given character.
 *
 *
 *      PRIVATE METHODS IMPLEMENTED
 *
 *
 *
 */

/*global Character, FeatureController, console */

var CharacterController = (function () {
    "use strict";
    /*******************/
    /* Local Variables */
    /*******************/

    var cCurrentCharacter = new Character();

    /***********/
    /* Methods */
    /***********/

    function publicGetBaseAttributeScoreFromCharacter(sAttributeName, cCharacter) {

        return cCharacter.Attributes[sAttributeName].Base;
    }
    
    function publicIncrementBaseAttributeScoreOnCharacter(sAttributeName, cCharacter, bIncrement) {
        cCharacter.Attributes[sAttributeName].Base += (bIncrement) ? 1 : -1;
    }
    
    function publicGetCurrentCharacter() {
        return cCurrentCharacter;
    }
    
    function publicGetContributors(fFeature) {
        var sCategoryName = fFeature.containerName,
            oRet = cCurrentCharacter[sCategoryName][fFeature.name].contributors;
        console.log(oRet);
        //return (oRet === undefined) ? oRet : {};
        return oRet;
    }
    function publicAddContributors(oData) {
        var fFeature = FeatureController.getFeature(oData.target),
            sCategoryName = fFeature.containerName;
        if (!cCurrentCharacter[sCategoryName][fFeature.name]) {
            cCurrentCharacter[sCategoryName][fFeature.name] = {
                display: 0,
                contributors: {}
            };
        }
        cCurrentCharacter[sCategoryName][fFeature.name].contributors[oData.origin]
            = oData.value;
        FeatureController.update(fFeature, oData.origin);
    }
    function publicRemoveContributors(oData) {
        var fFeature = FeatureController.getFeature(oData.target),
            sCategoryName = fFeature.containerName;
        delete cCurrentCharacter[sCategoryName][fFeature.name][oData.origin];
        FeatureController.update(fFeature, oData.origin);
    }
    function publicGetDisplay(fFeature) {
        var sCategoryName = fFeature.containerName,
            oRet;
        
        console.log(cCurrentCharacter);
        oRet = cCurrentCharacter[sCategoryName][fFeature.name];
        //return (oRet === undefined) ? oRet.display : fFeature.displayTable.notFound;
        return oRet.display;
    }
    function publicSetDisplay(fFeature, vValue) {
        var sCategoryName = fFeature.containerName;
        if (!cCurrentCharacter[sCategoryName][fFeature.name]) {
            cCurrentCharacter[sCategoryName][fFeature.name] = {};
        }
        cCurrentCharacter[sCategoryName][fFeature.name].display = vValue;
    }

    /******************/
    /* Public Methods */
    /******************/

    return {
        getBaseAttributeScoreFromCharacter: publicGetBaseAttributeScoreFromCharacter,
        incrementBaseAttributeScoreOnCharacter: publicIncrementBaseAttributeScoreOnCharacter,
        getCurrentCharacter: publicGetCurrentCharacter,
        getContributors: publicGetContributors,
        getDisplay: publicGetDisplay,
        addContributors: publicAddContributors,
        removeContributors: publicRemoveContributors,
        setDisplay: publicSetDisplay
    };

}());