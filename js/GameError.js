/*
*
*An error type to be thrown for reasons of game logic, i.e. attempting to buy
*a higher attribute point score than is allowed.
*
*Arguments: sMessage - the message describing which game rule was violated.
*
*Example: the following code fragment attempts to assign the school "Medic" to
*the current character.  Should an error occur the code will determine whether
*the error indicates that a rule of the game was violated (i.e. added the same
*school to the same character twice) and, if so, displays the message to the
*view.  Otherwise the error is thrown.
*
*   try {
*       SchoolController.addSchoolToCurrentCharacter("Medic")
*   } catch (e) {
*       if (e instanceof GameError){
*           SchoolView.DisplayError(e.message);
*       } else {
*           throw e;
*       }
*       CharacterView.Update();
*
*/

function GameError(sMessage) {
    "use strict";
    
    this.name = "GameError";
    this.message = sMessage;
}
GameError.prototype = Error.prototype;