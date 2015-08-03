// Define identifiers for HTML elements
var buttonAddCharacter = "#button-add-character";

var listOfCharacters = [];

function character() {
	//this.name = sName || null;
	this.BaseAttributeScore = new Object();
	this.AttributeModifier = new Object();
	this.AttributeScore = function (sAttributeName){
	return this.BaseAttributeScore[sAttributeName] + //
		this.AttributeModifier[sAttributeName];
	}
	this.RemainingAttributeBuyPoints = 0; 
}

function characterView() {

}

function characterListView() {

}
