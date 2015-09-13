/*global CharacterFeature */

var Character = function (sName, nLevel, sGender, sAlignment) {
    "use strict";

    this.Level = nLevel || 1;

    // Personal Info
    this.Name = sName || "New Character";
    this.Gender = sGender || "Queer";
    this.Alignment = sAlignment || "Neutral";

    // Rule-Based Data || Trait containers
    this.Stats = {};
    this.Attributes = {};
    this.AttributeModifiers = {};
    this.Skills = {};
    this.Race = {};
    this.Schools = {};
    this.Feats = {};

    // Independent Data || External feature containers
    this.Abilities = {};
    this.Proficiencies = {};
    this.Resistance = {};
    this.CombatNotes = {};
    //this.Items -- for adding in future?

    //
    this.OtherBuys = {};
    this.OtherChoices = {};
};