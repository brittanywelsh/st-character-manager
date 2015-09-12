/*global Game, lCharacters, $, UpdateClassStatsTable*/
//Adds a character to the list of viewable characters
function AddToViewList(Character) {
    "use strict";
    
    var CharViewList = document.getElementById("char-list"),
        newRow = CharViewList.insertRow(Character.index),
        newCell = newRow.insertCell(0);
    newCell.innerHTML = Character.Name || "Character " + Character.index;
    newCell.className = "char";
    newCell.id = "Character" + Character.index;
    $("#" + newCell.id).data("character-index", Character.index);
}

function AssignAttribute(sAttributeName) {
    "use strict";

    $("#" + sAttributeName).data("character-index", this.index);
    $("#" + sAttributeName).text(this.AttributeScore(sAttributeName));

}

//Takes a given character and displays it.
function BindCharacterToView(Character) {
    "use strict";
    
    var id,
        nListNumber;
    /*
    * This function is actually two rolled into one.  The first changes the viewed
    * character to the one most recently clicked.  The second is the one which 
    * initially handles binding a character (i.e. without any clicking having 
    * occurred.
    */
    if (Character.target) {
        id = Character.target.id;
        Character = lCharacters[$('#' + id).data("character-index")];
    } else {
        id = "Character" + Character.index;
    }

    $('.char').css('background', 'white');
    $('#' + id).css('background', 'lightgray');

    Game.AttributeList.forEach(AssignAttribute, Character);


    $("#PTS").data("character-index", Character.index);
    $("#PTS").text(15 - Game.PointsUsed(Character));

    //Update Class stats
    UpdateClassStatsTable();
    
    Object.keys(Game.Classes).forEach(function (sClassName) {
        if (document.getElementById(sClassName + 1)) {
            document.getElementById(sClassName + 1).disabled = false;
            document.getElementById(sClassName + 2).disabled = false;
            document.getElementById(sClassName + 3).disabled = false;
        }
    });
    
    for (nListNumber = 1; nListNumber <= 3; nListNumber += 1) {
        var selectMeOnSwitch,
            thisCharsClasses = Object.keys(Character.Classes),
            myList,
            nClassNumber;
        
        document.getElementById('select' + (nListNumber).toString()).selected = true;
        
        for (nClassNumber = 0; nClassNumber < thisCharsClasses.length; nClassNumber += 1) {
            if (nClassNumber === nListNumber - 1) {
                document.getElementById(thisCharsClasses[nClassNumber] + nListNumber).selected = true;
            } else {
                document.getElementById(thisCharsClasses[nClassNumber] + nListNumber).disabled = true;
            }
        }
    };
    ClearOldMessage();
}

function ChangeAttributePoints(event) {
    "use strict";

    var buttonID = event.target.id,
        attribute = buttonID.substr(0, 3),// string.substr(start, length)
        modifier,
        Character = lCharacters[$("#" + attribute).data("character-index")];

    switch (buttonID.slice(-1)) {
    case '-':
        modifier = -1;
        break;
    case '+':
        modifier = 1;
        break;
    }

    try {
        Game.BuyAttributePointsForChar(Character, attribute, modifier);
    } catch (e) {
        if (e instanceof RangeError) {
            $('#message').text(e.message);
        } else {
            throw e;
        }
    } finally {
        $("#PTS").text(15 - Game.PointsUsed(Character));
        $("#" + attribute).text(Character.AttributeScore(attribute));
    }
}

function ClearOldMessage() {
    "use strict";
    
    document.getElementById("message").innerHTML = "";
}

var lCharacters = [];

//Two characters are made here for testing purposes.
lCharacters.push(Game.CreateNewCharacter());
lCharacters.push(Game.CreateNewCharacter());

lCharacters[0].index = 0;
lCharacters[1].index = 1;

$(document).ready(function () {
    "use strict";

    //Pushing any button clears message box
    $("button").on('click', ClearOldMessage);

    //Adds a new character when the appropriate button is pushed.
    $("#add-char").on('click', function () {
        lCharacters.push(Game.CreateNewCharacter());
        lCharacters[lCharacters.length - 1].index = lCharacters.length - 1;
        AddToViewList(lCharacters[lCharacters.length - 1]);
    });

    //Sets up the infrastructure for switching characters when the character name is pushed
    $("#char-list").on('click', 'td', BindCharacterToView);

    //Sets selected character to gray
    $('#Character0').css('background', 'lightgray');

    //Attaches a click event listener to the + and - buttons that changes attribute values appropriately   
    Game.AttributeList.forEach(function (sAttributeName) {
        $("#" + sAttributeName + "+").on('click', ChangeAttributePoints);
        $("#" + sAttributeName + "-").on('click', ChangeAttributePoints);
    });

    //Adds existing characters to the list of viewable characters                                                                                            
    lCharacters.forEach(AddToViewList);

    //Makes the screen display data for the first character
    BindCharacterToView(lCharacters[0]);

});