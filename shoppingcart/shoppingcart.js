const carttlist = document.querySelector("#cartlist");
let cart = [];

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

for (const item of cart) {

    console.log(item)
}

listCart();

function listCart(){

    carttlist.innerHTML = "";

    for (const items of cart) {
        const productimg = document.createElement("div");
        const img = document.createElement("img");
        const productinfo = document.createElement("div");
        const productname = document.createElement("h6");
        const removebtn = document.createElement("button");
        const quantity = document.createElement("div");
        const btndown = document.createElement("button");
        const minus = document.createElement("i");
        const input = document.createElement("input");
        const btnup = document.createElement("button");
        const plus = document.createElement("i");
        const pricediv = document.createElement("div");
        const price = document.createElement("h6");
        const border = document.createElement("hr");

        //styla 
        productimg.classList.add("col-2")
        img.classList.add("img-fluid", "rounded-3")
        productinfo.classList.add("col-4")
        quantity.classList.add("tab", "col-2")
        minus.classList.add("fas","fa-minus")
        plus.classList.add("fas", "fa-plus")

        //lägg till innehåll
        img.src = `${items.bouqetimg}`;
        productname.innerText = `${items.bouqet}`;
        price.innerText = `${items.price} $`;
        removebtn.innerText = "Delete item"
        
        removebtn.onclick = () => {
        removeFromCart(items.serialnumber);
        }; 
        btndown.onclick = () =>{
            removeQuantity()
        };

        btnup.onclick = () =>{
        addQuantity()
        };

        input.oninput = () => {
            if(input < quantity){
                removeQuantity()
            }else{
                addQuantity()
            }
        }


        //lägg till 
        pricediv.append(price);
        btndown.append(minus);
        btnup.append(plus)
        quantity.append(btndown, input, btnup);
        productinfo.append(productname, removebtn);
        productimg.append(img);
        carttlist.append(productimg, productinfo, quantity, pricediv, border);
    }
}

function removeFromCart(serialnumber){

    const item = cart.find((c) => c.serialnumber === serialnumber)

    const index = cart.indexOf(item);

    const x = cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updatecart();
};


function updatecart(){
    listCart();
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addQuantity(){

}

function removeQuantity(){

}