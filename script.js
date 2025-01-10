const hugoAgents = ['Jett', 'Sage', 'Reyna'];
const zakAgents = ['Brimstone', 'Viper', 'Omen', 'Killjoy', 'Cypher', 'Sova', 'Sage', 'Phoenix', 'Jett', 'Reyna', 'Raze', 'Breach', 'Skye', 'Yoru', 'Astra', 'KAY/O', 'Chamber', 'Neon', 'Fade', 'Harbor', 'Gekko', 'Deadlock', 'Iso', 'Clove', 'Vyse', 'Tejo'];
const johnAgents = ['Brimstone', 'Jett', 'Sage', 'Sova', 'Gekko', 'Fade', 'Yoru', 'KAY/O', 'Astra', 'Chamber', 'Vyse', 'Phoenix', 'Clove', 'Cypher'];
const salAgents = ['Brimstone', 'Viper', 'Omen', 'Killjoy', 'Cypher', 'Sova', 'Sage', 'Phoenix', 'Jett', 'Reyna', 'Raze', 'Breach', 'Skye', 'Yoru', 'Astra', 'KAY/O', 'Chamber', 'Neon', 'Fade', 'Harbor', 'Gekko', 'Deadlock', 'Iso', 'Clove', 'Vyse'];
const priWeaponNames = ['Stinger', 'Spectre', 'Bucky', 'Judge', 'Bulldog', 'Guardian', 'Phantom', 'Vandal', 'Marshal', 'Outlaw', 'Operator', 'Ares', 'Odin']
const priWeaponPrice = ['1100', '1600', '850', '1850', '2050', '2250', '2900', '2900', '950', '2400', '4700', '1600', '3200']
const secWeaponNames = ['Classic', 'Shorty', 'Frenzy', 'Ghost', 'Sheriff']
const secWeaponPrice = ['0', '300', '450', '500', '800']


const shieldNames = ['Light', 'Regen', 'Heavy']
const shieldPrice = ['400', '650', '1000'] 


function generateAgent(agentListId, displayId) {
    const agents = eval(agentListId);
    const randomAgent = agents[Math.floor(Math.random() * agents.length)];
    document.getElementById(displayId).innerText = `Your agent is: ${randomAgent}`;
}


function generateLoadout() {
    const availableMoney = document.getElementById("moneyInput").value;
    if (!availableMoney || availableMoney < 0) {
        return;
    }

    let remainingMoney = availableMoney;
    let loadout = {};
    
    function shieldBlock() {
        // Randomly select shields within budget
        const shieldIndex = getRandomIndex(shieldPrice, remainingMoney);
        if (shieldIndex !== -1) {
            loadout['Shield'] = shieldNames[shieldIndex];
            remainingMoney -= shieldPrice[shieldIndex];
        } else {
            loadout['Shield'] = "No Shields";
        }
    }

    function priBlock() {
        // Randomly select primary weapon within budget
        const primaryIndex = getRandomIndex(priWeaponPrice, remainingMoney);
        if (primaryIndex !== -1) {
            loadout['Primary Weapon'] = priWeaponNames[primaryIndex];
            remainingMoney -= priWeaponPrice[primaryIndex];
        } else {
            loadout['Primary Weapon'] = "No Primary Weapon";
        }
    }


    function secBlock() {
        // Randomly select secondary weapon within budget
        const secondaryIndex = getRandomIndex(secWeaponPrice, remainingMoney);
        if (secondaryIndex !== -1) {
            loadout['Secondary Weapon'] = secWeaponNames[secondaryIndex];
        } else {
            loadout['Secondary Weapon'] = "Classic"; // Default to Classic which is free
        }
    }

    const codeBlocks = [shieldBlock, secBlock, priBlock];

    const shuffledCodeBlocks = shuffle(codeBlocks);

    shuffledCodeBlocks.forEach(block => block());

    displayLoadout(loadout);

}

function getRandomIndex(prices, maxPrice) {
    const affordableItems = prices
        .map((price, index) => (Number(price) <= maxPrice ? index : null))
        .filter(index => index !== null);
    
    if (affordableItems.length > 0) {
        const randomIndex = Math.floor(Math.random() * affordableItems.length);
        return affordableItems[randomIndex];
    } else {
        return -1; // No items affordable within the budget
    }
}


function displayLoadout(loadout) {
    const loadoutDiv = document.getElementById("loadout");
    loadoutDiv.innerHTML = `
        Shield: ${loadout['Shield']}<br>
        Primary Weapon: ${loadout['Primary Weapon']}<br>
        Secondary Weapon: ${loadout['Secondary Weapon']}
    `;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

