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
        //console.log("CharacterController.getBaseAttributeScoreFromCharacter called on", sAttributeName, cCharacter);

        return cCharacter.Attributes[sAttributeName].Base;
    }
    
    function publicIncrementBaseAttributeScoreOnCharacter(sAttributeName, cCharacter, bIncrement) {
        //console.log("CharacterController.incrementBaseAttributeScoreOnCharacter called on", sAttributeName, cCharacter, bIncrement);
        cCharacter.Attributes[sAttributeName].Base += (bIncrement) ? 1 : -1;
    }
    
    function publicGetCurrentCharacter() {
        //console.log("CharacterController.getCurrentCharacter called");
        return cCurrentCharacter;
    }
    
    function publicGetContributors(fFeature) {
        //console.log("CharacterController.getContributors called on", fFeature.name);
        var sCategoryName = fFeature.containerName,
            oRet = cCurrentCharacter[sCategoryName][fFeature.name].contributors;
        //return (oRet === undefined) ? oRet : {};
        return oRet;
    }
    function publicAddContributors(oData) {
        //console.log("CharacterController.addContributors called on", oData);
        var fFeature = FeatureController.getFeature(oData.target),
        //var fFeature = FeatureController.getFeature(oData.channel),
            sCategoryName = fFeature.containerName;
        if (!cCurrentCharacter[sCategoryName][fFeature.name]) {
            cCurrentCharacter[sCategoryName][fFeature.name] = {
                display: undefined,
                contributors: {}
            };
        }
        cCurrentCharacter[sCategoryName][fFeature.name].contributors[oData.origin]
            = oData.value;
        FeatureController.update(fFeature, oData.origin);
    }
    function publicRemoveContributors(oData) {
        //console.log("CharacterController.removeContributors called on", oData);
        var fFeature = FeatureController.getFeature(oData.target),
            sCategoryName = fFeature.containerName;
        delete cCurrentCharacter[sCategoryName][fFeature.name].contributors[oData.origin];
        FeatureController.update(fFeature, oData.origin);
    }
    function publicGetDisplay(fFeature) {
        //console.log("CharacterController.getDisplay called on", fFeature.name);
        var sCategoryName = fFeature.containerName,
            oRet;
        oRet = cCurrentCharacter[sCategoryName][fFeature.name];
        if (oRet === undefined) {
            cCurrentCharacter[sCategoryName][fFeature.name] = {
                display: undefined,
                contributors: {}
            };
            oRet = cCurrentCharacter[sCategoryName][fFeature.name];
        }
        //return (oRet === undefined) ? oRet.display : fFeature.displayTable.notFound;
        return oRet.display;
    }
    function publicSetDisplay(fFeature, vValue) {
        //console.log("CharacterController.setDisplay called on", fFeature.name, vValue);
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