/*
 *
 *
 *g
 *  PROPERTY DESCRIPTIONS:
 *      AttributeList: list of the attributes in StarTraveller
 *      Buy: contains all data pertaining to to attribute buying:
 *          -Wallet: number of points to spend in an attribute buy
 *          -Costs: bin of all attribute score costs
 *
 *
*/

var Attributes = {
    AttributeList: ["STR", "DEX", "INT", "CON", "WIS", "CHA"],
    Buy: {
        Wallet: 15,//points to buy attributes
        Costs: {
            "7": -4,
            "8": -2,
            "9": -1,
            "10": 0,
            "11": 1,
            "12": 2,
            "13": 3,
            "14": 5,
            "15": 7,
            "16": 10,
            "17": 13,
            "18": 17
        }
    }
};
    
