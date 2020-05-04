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
