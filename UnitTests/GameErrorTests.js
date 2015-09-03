/*jslint devel: true */
/*global UnitTest, GameError*/

var uTest = new UnitTest();

uTest.addTest(
    "GameError can be thrown",
    function () {
        "use strict";
        try {
            throw new GameError("Test");
        } catch (e) {
            if (e instanceof GameError) {
                return true;
            }
            throw e;
        }
        return false;
    }
);

uTest.addTest(
    "GameError is an error",
    function () {
        "use strict";
        var g = new GameError();
        
        return (g instanceof Error);
    }
);

uTest.addTest(
    "GameError has correct name when thrown",
    function () {
        "use strict";
        
        try {
            throw new GameError("Test");
        } catch (e) {
            if (e.name === "GameError") {
                return true;
            }
            console.log("Name test: Name Expected: GameError Name Received: ", e.name);
            return false;
        }
    }
);

uTest.addTest(
    "GameError provides error message as expected",
    function () {
        "use strict";
        
        try {
            throw new GameError("Test");
        } catch (e) {
            if (e.message === "Test") {
                return true;
            }
            console.log("Message test: ", "Message received: ", e.message, "Message expected: Test");
            return false;
        }
    }
);

window.onload = function () {
    "use strict";
    uTest.runInHTML();
};