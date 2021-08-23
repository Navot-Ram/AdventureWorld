function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const sessions = [
    ["Cliath", "She Bites", "On Black Wings", "The Birds and the Bees", "Bad Taste", "Rattenkonig", "Eric Bass", "Anesthesia", "Lock and Load", "Claws of Iron, Heartt of Thorns", "Broken Hearts and Broken Minds", "Straum", "Now What?", "Counting Stars", "Bleed Spider Bleed", "Threaded Silver", "Family Matter", "Guests of All Kinds", "Sucker for Pain", "Wings of Dark Despair", "The Troll King's Price", "Price Tag on your Life", "Do what must be Done", "The Cavalry's Here", "War Games", "The Student Becometh", "Star in the Chimney", "Lift the Candle", "Wait, Go back!", "Fool's Gold", "Got a feel for my Automobile", "Jaws Snap and Web Traps", "Sweet Child of Mine", "Lies and lies and Lies", "Interlude - Road Trip", "The Bad Idea Jar", "Promises I remembered to Keep", "Growing Pains", "Bonus Level", "Cannon Fodders", "Dark Mirror", "We need to Talk about Tortoise", "After the Night", "SABOT", "Chief Hunter Monkey Babble", "I must be good for Something", "FOMO", "Calculated Risk", "In the Eye of the Storm", "In the Wake of the Winds", "Death's Grove", "Unkindness", "Snitches Get Stitches", "The Valley of the Shadows of Death", "Lost in the Woods", "Song and Supper", "The Monster at the end of this Book", "In Preperations of Hunting", "A Cockroach in the Web", "Put on a Show", "Coyotherapy", "The Conduit", "Song of the Croatan", "Dancing in the Moonlight", "It's Quiet Uptown", "Midnight Randevouse", "Goota Go Fast", "We leave at Dawn", "The Battle of Eldritch"]
]


const characters =
    ["Cameron", "Emily", "Kim", "Eric Bass", "Hector Lem", "Sunny", "Andrie Karamazov", "Arte", "Mark McCleary", "Dixie Castle", "Helen McMainy", "Stan Stonewick", "Audrie", "Eugene Moskowitz", "Jemma Mason", "Avery Lindspill", "Hunter Clearwater", "Eleanor Godspeed", "Matthew Evergreen", "Alek Wadiskay", "Lasval", "Ahren", "Kaya Lmhi", "Steph", "Kaitlin Van - Dijk", "Cherri", "Lovias Strawm", "Annabel Armitage", "Gorka Ortzi", "Astrid Hearts", "Song Kuyou", "Jonas Hawkins", "Francis Donnel", "Lily Chiminaz", "Giert", "Shioh"]


const locations =
    ["Boise Uptown", "Clearwater Sept", "Boise Downtown", "The Old Gas Station", "Boise Hospital", "Fianna Territory", "Glasswalker Tower", "Three - Rivers Sept", "Near Umbra", "Deep Umbra", "The Boise Old Arch", "Rat - Infested Streets", "Mountains of Idaho", "On the Roads Again", "San Fancisco", "Eric's Cabin", "The Nines", "Boise University"]

let randSession = getRandomInt(1, 71);
