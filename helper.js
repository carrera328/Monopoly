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

