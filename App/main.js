import * as controller from "./controller.js";
import * as helper from "./helper.js";



//alert(module.catBehavior());

let Casey = new controller.Player("Casey", 27);

Casey.ownedDeeds.push({"name": "boardwalk", "value": 400});

console.log(helper.test());

document.getElementsByTagName("h1")[0].innerHTML = "COVID-19!";

console.log(helper.Deed);

let x = new helper.Deed(350, "Sal", ["house", "house", "hotel"]);

let Boardwalk = new helper.Deed(220, "Casey", []);



console.log(Boardwalk);

console.log(x);

Casey.ownedDeeds.forEach(function(element) {
    console.log(element.name);
});

//alert(Jose.age);
//alert(Jose.action());