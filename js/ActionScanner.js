/*global CharacterController, CharacterView, Choice*/

var ActionScanner = {
    keywords: ["DO", "CHOOSE", "BUY"],
    actionString: "",
    activeBlockIndex: 0,
    blocks: [],
    processActionString: function () {
        "use strict";
        this.Blocks = this.sInput.split('.');
    },
    executeActionString: function () {
        "use strict";
        while (this.blocks.length !== 0) {
            switch (this.blocks[this.activeBlockIndex]) {
            case "DO":
                this.executeDoAction();
                break;
            case "CHOOSE":
                this.executeChooseAction();
                break;
            case "BUY":
                this.executeBuyAction();
                break;
            default:
                throw new Error(//
                    "Non-action identified as action in ActionScanner"//
                );
            }
        }
    },
    executeDoAction: function () {
        "use strict";
        
        CharacterController.ContributeToProperty(//
            this.blocks[this.activeBlockIndex + 1],//
            this.blocks[this.activeBlockIndex + 2]//
        );
        
        this.activeBlockIndex += 3;
    },
    executeChooseAction: function () {
        "use strict";
        
        var oChoiceInput = JSON(this.blocks[this.activeBlockIndex + 1]),
            ChoiceToBeMade = new Choice(oChoiceInput);
        
        this.executeActionString(Choice);
        this.activeBlockIndex += 2;
    },
    executeBuyAction: function () {
        "use strict";
        
        var nWallet = this.blocks[this.activeBlockIndex + 1],
            lOptions = this.blocks[this.activeBlockIndex + 2];
    }
};