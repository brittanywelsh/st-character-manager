/*global Attributes, GameError, CharacterView, AttributesView, console*/

/*
 *
 *
 *      EXISTING DEPENDENCIES FOR THIS FILE
 *
 *              -GameError.js
 *              -CharacterView.js
 *              -AttributesView.js
 *              -Attributes.js
 *
 *      PUBLIC METHODS IMPLEMENTED
 *
 *
 *changeAttributePointForCharacter(sAttributeName, cCharacter, bIncrease):
 *  Arguments:
 *      sAttributeName: STRING. The name of the attribute to be altered.
 *      cCharacter:     CHARACTER. The character object to be altered. 
 *      bIncrease:      BOOLEAN. Determines whether the provided attribute will
 *                      be incremented or decremented.
 *
 *  Description: Attempts to increment or decrement the base value of a given 
 *               attribute for a given character.  Should this fail, the 
 *               methods asks AttributeView to display an associated prompt
 *               to the user.  In either case, CharacterView is asked to
 *               asked to update the html from the model.
 *
 *  Invokes:    -isLegalAttributeBuy - PRIVATE METHOD - Provides prompts
 *              if necessary.
 *              -AttributesView.Display - UNIMPLEMENTED as of Sept. 3, 2015 - 
 *              To display prompts to the user for bad input.
 *              -CharacterView.Update - UNIMPLEMENTED as of Sept. 3, 2015 -
 *              To update the html from the model.
 *
 *
 *
 *      PRIVATE METHODS IMPLEMENTED
 *
 *
 *isLegalAttributeBuy(oAttributes):
 *  Arguments:
 *      oAttributes: a collection of base attribute values.
 *
 *  Description: Checks to see if a set of base attribute values is legal. In
 *               the event that they are not, this method will throw 
 *               appropriate instances of GameError.  This method returns
 *               nothing otherwise.
 *
 *  Invokes:    -Attributes.AttributeList - IMPLEMENTED -
 *              List of Attributes in Star Traveller.
 *              -Attributes.Buy - IMPLEMENTED -
 *              Data associated with the attribute buy.
 *              -GameError
 *
 *
 *
 */

var AttributesController = (function () {
    "use strict";
    /*******************/
    /* Local Variables */
    /*******************/
    
    //
    
    /***********/
    /* Methods */
    /**********,*/

    var isLegalAttributeBuy = function (oAttributes) {
            var nSum = 0;
            Attributes.AttributeList.forEach(function (sAttributeName) {
                if (oAttributes[sAttributeName] > 18) {
                    throw new GameError(sAttributeName + " already at max!");
                } else if (oAttributes[sAttributeName] < 7) {
                    throw new GameError(sAttributeName + " already at min!");
                }
                nSum += Attributes.Buy.Costs[oAttributes[sAttributeName]];
            });
            if (nSum > Attributes.Buy.Wallet) {
                throw new GameError("Not enough points remaining!");
            }
        },

        changeAttributePointForCharacter = function (sAttributeToChange, cCharacter, bIncrease) {
            var oNewAttributes = {};
            Attributes.AttributeList.forEach(function (sAttributeName) {
                oNewAttributes[sAttributeName] = cCharacter.Attributes[sAttributeName].Base;
            });
            oNewAttributes[sAttributeToChange] += (bIncrease) ? 1 : -1;
            try {
                isLegalAttributeBuy(oNewAttributes);
                cCharacter.Attributes[sAttributeToChange].Base += (bIncrease) ? 1 : -1;
            } catch (e) {
                if (e instanceof GameError) {
                    AttributesView.Display(e.message);
                } else {
                    throw e;
                }
            }
            CharacterView.Update();
        },
            
        updateAttributes = function (cCharacter) {
            //
        };

    /******************/
    /* Public Methods */
    /******************/

    return {
        changeAttributePointForCharacter: changeAttributePointForCharacter,
        updateAttributes: updateAttributes
    };

}());