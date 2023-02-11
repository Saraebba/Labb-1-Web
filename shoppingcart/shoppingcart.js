const carttlist = document.querySelector('#cartlist');
const carttotal = document.querySelector('#carttotal');
const count = document.querySelector('#count');
const checkoutbtn = document.getElementById("checkout")
checkoutbtn.addEventListener('click', () => {clearCart();});
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
        const removebutton = document.createElement("button");
        const trash = document.createElement("i");
        const quantity = document.createElement("div");
        let   qty = document.createElement("h6")
        const buttondown = document.createElement("button");
        const minus = document.createElement("i");
        const buttonup = document.createElement("button");
        const plus = document.createElement("i");
        const itemtot = document.createElement("div")
        const itemtotal = document.createElement("h6")
        const pricediv = document.createElement("div");
        const price = document.createElement("h6");
        const border = document.createElement("hr");

        //styla 
        productimg.classList.add("col-2")
        img.classList.add("img", "rounded-3")
        pricediv.classList.add("col-1")
        productinfo.classList.add("col-2")
        removebutton.classList.add("btn", "btn-sm", "btn-danger", "col-1")
        quantity.classList.add("qty", "col-3")
        buttondown.classList.add("btn", "qtybtn", "btn-sm", "btn-secondary");
        buttonup.classList.add("btn", "qtybtn", "btn-sm", "btn-secondary");
        minus.classList.add("fas","fa-minus")
        plus.classList.add("fas", "fa-plus")
        trash.classList.add("fa-solid", "fa-trash-can")
        itemtot.classList.add("col-3")
        border.classList.add("border")

        //lägg till innehåll
        img.src = `${items.bouqetimg}`;
        productname.innerText = `${items.bouqet}`;
        price.innerText = `${items.price} $`;
        qty.innerText = `${items.qty}`;
        itemtotal.innerText = "Total: " + (`${items.price}` * `${items.qty}`) + " $";
 
        
        removebutton.onclick = () => {
        removeFromCart(items.serialnumber);
        }; 

        buttondown.onclick = () =>{
            removeQuantity(items.serialnumber)
        };

        buttonup.onclick = () => {
            addQuantity(items.serialnumber)
        };

        //lägg till 
        pricediv.append(price);
        buttondown.append(minus);
        buttonup.append(plus)
        quantity.append(btndown, qty,  btnup);
        removebutton.append(trash)
        productinfo.append(productname);
        productimg.append(img);
        itemtot.append(itemtotal);
        carttlist.append(productimg, pricediv, productinfo, quantity, itemtot, removebtn, border);
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

function clearCart(){
    cart = []
    localStorage.clear()
    updateCart()
}
