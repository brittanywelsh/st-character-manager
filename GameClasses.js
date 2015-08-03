Game.Classes = {
  this.Medic = new Class(
    "Medic", 
    "WIS", 
    {HitDice: 1, SkillsPerLevel: 1, Charges: 1, BaseWill: 1, BaseFortitude:1}, 
    {Medical: 3},
    Feats.MedicFeats
  );
};