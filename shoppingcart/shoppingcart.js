import {shoppingcart} from "../shop/shop.js";

const carttlist = document.querySelector("#cartlist");


listCart();

console.log(shoppingcart.bouqet)

function listCart(){
    for (const items of shoppingcart) {
        const productimg = document.createElement("div");
        const img = document.createElement("img");
        const productinfo = document.createElement("div");
        const productname = document.createElement("h6");
        const quantity = document.createElement("div");
        const btndown = document.createElement("button");
        const input = document.createElement("input");
        const btnup = document.createElement("button");
        const pricediv = document.createElement("div");
        const price = document.createElement("h6");
        const border = document.createElement("hr");

        //styla 


        //lägg till innehåll
        img.src = `${items.bouqetimg}`;
        productname.innerText = `${items.bouqet}`;
        price.innerText = `${items.price} $`;

        //lägg till 
        pricediv.append(price);
        quantity.append(btndown, input, btnup);
        productinfo.append(productname);
        productimg.append(img);
        carttlist.append(productimg, productinfo, quantity, pricediv, border);
    }
}
