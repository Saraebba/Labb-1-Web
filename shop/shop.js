import productjson from '/products.json' assert {type:'json'};

const products = [];
let cart = [];
const productlist = document.querySelector("#productlist");

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

class Product{
    constructor(serialnumber, bouqet, info, price, bouqetimg){
        this.serialnumber = serialnumber;
        this.bouqet = bouqet;
        this.info = info;
        this.price = price;
        this.bouqetimg = bouqetimg;
    }
}

for(const product of productjson){

    products.push(new Product(product.serialnumber, product.bouqet, product.info, product.price, product.bouqetimg))
}

listProducts();

function listProducts(){

    for (const product of products) {

    const div = document.createElement("div");
    const card = document.createElement("div");
    const cardbody = document.createElement("div");
    const img = document.createElement("img");
    const productname = document.createElement("h3");
    const info = document.createElement("p");
    const price = document.createElement("h5");
    const addtocart  = document.createElement("button");

    //styla 
    div.classList.add("col-md-4", "col-lg-3", "col-12");
    card.classList.add("card", "mb-3");
    cardbody.classList.add("card-body");
    img.classList.add("img");

    addtocart.onclick = () => {
        addToCart(product.serialnumber);
    }; 

    //lägg till innehåll
    img.src = `${product.bouqetimg}`;
    productname.innerText = `${product.bouqet}`;
    info.innerText = `${product.info}`;
    price.innerText = `${product.price} $`;
    addtocart.innerText ="Add to cart";


    //lägg till 
    cardbody.append(img, productname, info, price, addtocart);
    card.append(cardbody);
    div.append(card);
    productlist.append(div);
    }
}


function addToCart(serialnumber){
    if(cart.find((item) => item.serialnumber === serialnumber)){
        item.qty += 1; 
        }else{
        let item = products.find((p) => p.serialnumber === serialnumber)
        item = {
        serialnumber : `${item.serialnumber}`,
        bouqet: `${item.bouqet}`,
        info: `${item.info}`,
        price: `${item.price}`,
        bouqetimg : `${item.bouqetimg}`,
        qty: 1
    }
        cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
};

