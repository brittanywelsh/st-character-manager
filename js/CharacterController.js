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


var CharacterController = (function () {
    "use strict";
    /*******************/
    /* Local Variables */
    /*******************/

    //

    /***********/
    /* Methods */
    /***********/

    function publicGetBaseAttributeScoreFromCharacter(sAttributeName, cCharacter) {

        return cCharacter.Attributes[sAttributeName].Base;
    }
    
    function publicIncrementBaseAttributeScoreOnCharacter(sAttributeName, cCharacter, bIncrement) {
        cCharacter.Attributes[sAttributeName].Base += (bIncrement) ? 1 : -1;
    }

    /******************/
    /* Public Methods */
    /******************/

    return {
        getBaseAttributeScoreFromCharacter: publicGetBaseAttributeScoreFromCharacter,
        incrementBaseAttributeScoreOnCharacter: publicIncrementBaseAttributeScoreOnCharacter
    };

}());