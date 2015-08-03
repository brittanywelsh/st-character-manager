//Note: the Feats object is defined in Game.js for now
Feats.Medic = {
  this.NanotechInfusion = new Feat(
    "Nanotech Infusion",
    "Medic",
    function (cCharacter){//AvailableTo function
      return (cCharacter.HasClass("Medic"));        
    },
    {},//Passive
    {//GrantsAbilities
      NanotechInfusion: {
        "Nanotech Infusion",
        Description: "As a standard action you infuse a single target with 
          charged Nanites, healing their injuries. You may choose to spend any 
          number of charges when using this ability. The target gains Xd12+Y hp.
          X is the number of charges used. Y is your wisdom modifier.  You must
          be able to touch your target. This action prompts an attack of  
          opportunity. If you take damage, you must roll a medical check (DC 
          equal to damage taken). Failing this medical check indicates that your
          target recieves only half the healing rolled (round down)",
        Cost: "X charges."
        Provokes: true   
      }
    },
    {},//Upgrade
    {}//OnLevelUp  
  ); 
        
  this.BloodWork = new Feat(
    "Blood Work",
    "Medic",
    function (cCharacter){//AvailableTo
      return (cCharacter.HasClass("Medic"));
    },                                        
    {},//Passive
    {   //Grants Abilities
      BloodWork: {
        "Blood Work",
        Description: "",
        Cost: "Any number of charges and a sample of the target\'s blood."
        Provokes: undefined   
      }
    },
    {},//Upgrade
    {}//OnLevelUp
  );      
      
  this.Mender = new Feat (
    "Mender",
    "Medic",
    function (cCharacter){
      return (cCharacter.HasClass("Medic"));
    },                                        
    {},
    {
      EffectiveHealer: {
        "Effective Healer",
        Description: "",
        Cost: "Any number of charges."   
      }
    },
    {},
    { //levelup
      ExtraSkill: function (cCharacter, sChoice){
        if (sChoice != "Medical" && sChoice != "Repair"){
        throw new Error("Improper Choice");
        }
        cCharacter.Skill[sChoice] += 1;  
      }, 
    }        
  );
      
  this.Antidote = new Feat (
    "Antidote",
    "Medic",            
    function (cCharacter){          
      if (cCharacter.Classes.[this.ClassName].Feats.getProperties.Length >= 1){
        return true;
      }             
      return false;
    }, 
    {},
    {
      Antidote: {
        "Antidote",
        Description: "",
        Cost: "One charge."   
      }
    },
    {
      //make this do stuff for the upgrade
    }
    {}
  );
      
  this.Remedy = new Feat (
    "Remedy",
    "Medic",            
    function (cCharacter){          
      if (cCharacter.Classes.[this.ClassName].Feats.getProperties.Length >= 1){
        return true;
      }             
      return false;
    },                                    
    {},        
    {
      Remedy: {
        "Remedy",
        Description: "",
        Cost: "X"   
      }
    },     
    {},
    {}
  );
      
  this.Restoration = new Feat (
    "Restoration",
    "Medic",            
    function (cCharacter){          
      if (cCharacter.Classes.[this.ClassName].Feats.getProperties.Length >= 3){
        return true;
      }             
      return false;
    },                                   
    {//Passive stuff
      //to be added
    },
    {
      Restoration: {
        "Restoration",
        Description: "",
        Cost: "1 Charge"   
      }
    }, 
    {},
    {}
  );
     
  this.Sanctuary = new Feat (
    "Sanctuary",
    "Medic",            
    function (cCharacter){          
      if (cCharacter.Classes.[this.ClassName].Feats.getProperties.Length >= 3){
      return true;
      }             
      return false;
    },                                   
    {
      //to be added
    },
    {
      CreateSanctuary: {
        "Create Sanctuary",
        Description: "",
        Cost: "1 Standard Action and 1 charge."   
      },
      MaintainSanctuary: {
        "Maintain Sanctuary",
        Description: "",
        Cost: "1 Standard action and 1 charge"
      }
    },
    {},
    {}
  );
     
  this.BurstHealing = new Feat (
    "Burst Healing",
    "Medic",            
    function (cCharacter){    
      if (cCharacter.Classes.[this.ClassName].Feats.getProperties.Length >= 3){
        return true;
      }             
      return false;
    },                                          
    {
      //to be added
    },        
    {
      BurstHeal: {
        "Burst Heal",
         Description: "",
        Cost: "X"   
      }
    },         
    {},
    {}
  );
    
  this.LastReserves = new Feat (
    "Last Reserves",
    "Medic",            
    function (cCharacter){          
      if (cCharacter.Classes.[this.ClassName].Feats.getProperties.Length >= 5){
        return true;
      }             
      return false;
    },                                      
    {
      //to be added
    },        
    {
      LastReserves: {
        "Last Reserves",
        Description: "",
        Cost: "None",   
      },
    },     
    {},
    {}
  );
},