/*jslint devel: true */
/*global UnitTest, Character, AttributesController, Attributes, GameError, CharacterController*/

var uTest = new UnitTest(),
    cCharacter = new Character(),
    AttributesView = {//Testing AttributesView here is unnecessary.
        display: function (e) {
            "use strict";
            throw e;
        }
    },
    CharacterView = {//Testing CharacterView.Update is unnecessary here.
        update: function () {
            "use strict";
            return true;
        }
    };

function resetVariables() {
    "use strict";
    
    cCharacter = null;
    cCharacter = new Character();
    CharacterController.Initialize(cCharacter);
}

function IncrementTest(sAttributeName) {
    "use strict";
    var bReturn = false;

    AttributesController.changeAttributePointForCharacter(sAttributeName, cCharacter, true);
    bReturn = cCharacter.Attributes[sAttributeName].Base === 11;
    if (!bReturn) {
        console.log("Increment failure:", sAttributeName, cCharacter.Attributes[sAttributeName].Base);
    }
    return bReturn;
}

function DecrementTest(sAttributeName) {
    "use strict";
    var bReturn = false;

    AttributesController.changeAttributePointForCharacter(sAttributeName, cCharacter, false);
    bReturn = cCharacter.Attributes[sAttributeName].Base === 9;
    if (!bReturn) {
        console.log("Decrement failure:", sAttributeName, cCharacter.Attributes[sAttributeName].Base);
    }
    return bReturn;
}

Attributes.AttributeList.forEach(function (sAttributeName) {
    "use strict";
    uTest.addTest(
        sAttributeName + " increments properly",
        function () {
            resetVariables();
            return IncrementTest(sAttributeName);
        }
    );
    uTest.addTest(
        sAttributeName + " decrements properly",
        function () {
            resetVariables();
            return DecrementTest(sAttributeName);
        }
    );
});

uTest.addTest(
    "Trying to decrement below 7 fails",
    function () {
        "use strict";
        resetVariables();

        var bReturn = false;

        AttributesController.changeAttributePointForCharacter("STR", cCharacter, false);//9
        AttributesController.changeAttributePointForCharacter("STR", cCharacter, false);//8
        AttributesController.changeAttributePointForCharacter("STR", cCharacter, false);//7
        try {
            AttributesController.changeAttributePointForCharacter(
                "STR",
                cCharacter,
                false
            );
            return false;
        } catch (e) {
            if (typeof e === "string") {
                bReturn = e === "STR already at min!" && cCharacter.Attributes.STR.Base === 7;
                if (bReturn === false) {
                    console.log("Test: Trying to decrement below 7 fails", "Expected message: STR already at min! Actual: ", e, "Expected STR: 7 Actual: ", cCharacter.Attributes.STR.Base);
                }
                return bReturn;
            }
            throw e;
        }
        throw "Should never have reached this point in the code!";
    }
);

uTest.addTest(
    "Trying to increment above 18 fails",
    function () {
        "use strict";
        resetVariables();
        
        var bReturn = false;
        AttributesController.changeAttributePointForCharacter("STR", cCharacter, false);//9
        AttributesController.changeAttributePointForCharacter("STR", cCharacter, false);//8
        AttributesController.changeAttributePointForCharacter("STR", cCharacter, false);//7
        //Enough points are now free
        AttributesController.changeAttributePointForCharacter("INT", cCharacter, true);//11
        AttributesController.changeAttributePointForCharacter("INT", cCharacter, true);//12
        AttributesController.changeAttributePointForCharacter("INT", cCharacter, true);//13
        AttributesController.changeAttributePointForCharacter("INT", cCharacter, true);//14
        AttributesController.changeAttributePointForCharacter("INT", cCharacter, true);//15
        AttributesController.changeAttributePointForCharacter("INT", cCharacter, true);//16
        AttributesController.changeAttributePointForCharacter("INT", cCharacter, true);//17
        AttributesController.changeAttributePointForCharacter("INT", cCharacter, true);//18
        
        try {
            AttributesController.changeAttributePointForCharacter("INT", cCharacter, true);//fails
        } catch (e) {
            if (typeof e === 'string') {
                bReturn = e === "INT already at max!" && cCharacter.Attributes.INT.Base === 18;
                if (!bReturn) {
                    console.log("Test: Trying to increment above 18 fails", "Expected message: INT already at min! Actual: ", e, "Expected INT: 18 Actual: ", cCharacter.Attributes.INT.Base);
                }
                return bReturn;
            }
        }
        throw "No error was thrown.";
    }
);

uTest.addTest(
    "Run out of points appropriately",
    function () {
        "use strict";
        resetVariables();
        
        var bReturn = true;
        
        AttributesController.changeAttributePointForCharacter("DEX", cCharacter, true);//11
        AttributesController.changeAttributePointForCharacter("DEX", cCharacter, true);//12
        AttributesController.changeAttributePointForCharacter("DEX", cCharacter, true);//13
        AttributesController.changeAttributePointForCharacter("DEX", cCharacter, true);//14
        AttributesController.changeAttributePointForCharacter("DEX", cCharacter, true);//15
        AttributesController.changeAttributePointForCharacter("DEX", cCharacter, true);//16
        AttributesController.changeAttributePointForCharacter("DEX", cCharacter, true);//17

        try {
            AttributesController.changeAttributePointForCharacter("DEX", cCharacter, true);//18
        } catch (e) {
            if (e === "Not enough points remaining!") {
                bReturn = cCharacter.Attributes.DEX.Base === 17;
                if (!bReturn) {
                    console.log("Test: Run out of points appropriately, Expected: DEX = 17, Actual: DEX = " + cCharacter.Attributes.DEX.Base);
                }
                return bReturn;
            }
            throw e;
        }
        throw "Test: Run out of points appropriately. Error: Should never have reached this point!";
    }
);

uTest.addTest(
    "Points computed properly",
    function () {
        "use strict";
        resetVariables();
        
        var oExpectedAttributeScores = {
            STR: 13,
            DEX: 14,
            INT: 8,
            WIS: 9,
            CON: 10,
            CHA: 15
        },
            bReturn = true;
        
        Attributes.AttributeList.forEach(function (sAttributeName) {
            cCharacter.Attributes[sAttributeName].Base = oExpectedAttributeScores[sAttributeName];
        });
                                         
        oExpectedAttributeScores.CHA += 1;
                                         
        try {
            AttributesController.changeAttributePointForCharacter("CHA", cCharacter, true);
        } catch (e) {
            if (e instanceof GameError) {
                console.log(e);
                return false;
            }
            throw e;
        }
        Attributes.AttributeList.forEach(
            function (sAttributeName) {
                bReturn = bReturn && cCharacter.Attributes[sAttributeName].Base === oExpectedAttributeScores[sAttributeName];
            }
        );
        return bReturn;
    }
);

uTest.runInHTML();