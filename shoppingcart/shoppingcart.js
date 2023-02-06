const carttlist = document.querySelector('#cartlist');
const carttotal = document.querySelector('#carttotal');
const count = document.querySelector('#count');
let cart = [];
let product = {};

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

listCart();
cartTotal();
countitems();

function listCart(){

    carttlist.innerHTML = "";

    for (const items of cart) {
        const productimg = document.createElement("div");
        const img = document.createElement("img");
        const productinfo = document.createElement("div");
        const productname = document.createElement("h6");
        const removebtn = document.createElement("button");
        const trash = document.createElement("i");
        const quantity = document.createElement("div");
        let   qty = document.createElement("h6")
        const btndown = document.createElement("button");
        const minus = document.createElement("i");
        const btnup = document.createElement("button");
        const plus = document.createElement("i");
        const pricediv = document.createElement("div");
        const price = document.createElement("h6");
        const border = document.createElement("hr");

        //styla 
        productimg.classList.add("col-2")
        img.classList.add("img-fluid", "rounded-3")
        productinfo.classList.add("col-4")
        removebtn.classList.add("btn", "btn-danger")
        quantity.classList.add("tab", "col-2")
        qty.classList.add("col-12")
        btndown.classList.add("btn", "btn-secondary", "col-6");
        btnup.classList.add("btn", "btn-secondary", "col-6");
        minus.classList.add("fas","fa-minus")
        plus.classList.add("fas", "fa-plus")
        trash.classList.add("fa-solid", "fa-trash-can")

        //lägg till innehåll
        img.src = `${items.bouqetimg}`;
        productname.innerText = `${items.bouqet}`;
        price.innerText = `${items.price} $`;
        qty.innerText = `${items.qty}`;
        
        removebtn.onclick = () => {
        removeFromCart(items.serialnumber);
        }; 

        btndown.onclick = () =>{
            removeQuantity(items.serialnumber)
        };

        btnup.onclick = () => {
            addQuantity(items.serialnumber)
        };


        //lägg till 
        pricediv.append(price);
        btndown.append(minus);
        btnup.append(plus)
        quantity.append(qty, btndown, btnup);
        removebtn.append(trash)
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

    updateCart();
};

function cartTotal(){
    let total = 0;
    cart.forEach((product) => {
    total += parseInt(product.price) * parseInt(product.qty)
    });
    carttotal.innerText = `$ ${total}`;
}

function countitems(){
    let countitems = 0;
    cart.forEach((product) => {
    countitems += parseInt(product.qty);
    });
    count.innerText = `items ${countitems}`;
}

function updateCart(){
    listCart();
    cartTotal();
    countitems();
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addQuantity(serialnumber){
    let item = cart.find((c) => c.serialnumber === serialnumber)

    item.qty++;
     updateCart();
}

function removeQuantity(serialnumber){

    const item = cart.find((c) => c.serialnumber === serialnumber);
    if (item.qty === 0){
        removeFromCart(item.serialnumber);
    }
    item.qty--;
    updateCart();
}