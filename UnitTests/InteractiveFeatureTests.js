/*global Feature, Listener, pubsub */

function publish(channel, data) {
    "use strict";
    pubsub.publish(channel, data);
}
function subscribe(obj, channel, func) {
    "use strict";
    pubsub.subscribe(channel, func);
}

var Strength = new Feature({
    name: 'Strength'
}),
    Intelligence = new Feature({
        name: 'Intelligence'
    }),
    Dexterity = new Feature({
        name: 'Dexterity'
    }),
    STRListener = new Listener(Strength),
    INTListener = new Listener(Intelligence),
    DEXListener = new Listener(Dexterity);