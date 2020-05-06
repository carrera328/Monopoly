export function test() {
    return document.createElement("h1");
}

export function Deed(value, owner, name, properties) {
    return {
        value: value,
        owner: owner,
        properties: properties
    }
}

export function Player(name, age) {
    return {
        name: name,
        age: age,
        ownedDeeds: []
    }
}

export function roll() {
    let die1 = Math.ceil(Math.random() * 6);
    let die2 = Math.ceil(Math.random() * 6);
    return {
        "die1": die1,
        "die2": die2,
        "rolled": die1 + die2,
        "doubles": die1 == die2 ? true:false
    }
}

