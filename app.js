/* app.js */
//select the entire elements
const productsEL = document.querySelector(".products");
const cartItemsEL = document.querySelector(".cart-items");
const subTotalEL = document.querySelector(".subtotal");
const shoppingBag = document.querySelector(".total-items-in-cart");
//rendering products dynamically
if (productsEL) {
    function renderProducts () {
        products.forEach(prod=>{
            console.log(prod);
            const html = `
            <div class="item">
            <div class="item-container">
                <div class="item-img">
                    <img src="${prod.imgSrc}"alt="t-shirt 1">
                </div>
                <div class="desc">
                    <h2>${prod.name}</h2>
                    <h2><small>Ksh</small>"${prod.price}"</h2>
                    <p>
       ${prod.description}
                    </p>
                </div>
                <div class="add-to-wishlist">
                    <img src="./icons/heart.png" alt="add to wish list">
                </div>
                <div class="add-to-cart" onclick="addToCart(${prod.id})">
                    <img src="./icons/bag-plus.png" alt="add to cart">
                </div>
            </div>
        </div>
            `
            productsEL.insertAdjacentHTML("beforeend",html);
        })
    }  
    renderProducts();
}

//get items from localstorage on page reload
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCart();

function addToCart (id) {
    //check if item alredy incart
    if (cart.some(item=>item.id === id)) {
        //increse the cart items number if the id matches
      changeunits("plus",id)
    }else{
        const item =  products.find(item=>item.id === id);
        cart.push({
            //spread operator unpacks values 
            ...item,
            numberofItems:1});
        console.log(cart);
    }
//render the cartitems ,totals,saving it to localstorage
    updateCart();
}

 function updateCart () {
    //render the cartitems
    renderCartItems();
    //get subtotals
    subTotals();
    localStorage.setItem("cart",JSON.stringify(cart));
}

function subTotals () {
    if (subTotalEL) {
        let totalPrice = 0;
        let totalItems = 0;
    cart.forEach(item=>{
totalPrice += totalPrice + item.price * item.numberofItems;
totalItems += item.numberofItems;
    })
    subTotalEL.innerHTML = `Subtotal (${totalItems} items): Ksh${totalPrice.toFixed(2)}`
    }
    if (shoppingBag) {
          let totalItems = 0;
    cart.forEach(item=>{
totalItems += item.numberofItems;
    })
    shoppingBag.innerHTML = totalItems;
    }
}

function renderCartItems () {
    //clear the cart 
    if (cartItemsEL) {
        cartItemsEL.innerHTML = "";
        cart.forEach(item=> {
            const carthtml = `
            <div class="cart-item">
            <div class="item-info">
                <img src="${item.imgSrc}" alt=${item.name}>
                <h4>${item.name}</h4>
                <h5>items remaining are:${item.instock}</h5>
            </div>
            <button onclick="removeitem(${item.id})">DELETE</button>
            <div class="unit-price">
                <small>Ksh</small>${item.price}
            </div>
            <div class="units">
       <div class="btn minus" onclick="changeunits('minus',${item.id}) " 
        onclick="triggered()">-</div>
       <div class="number">${item.numberofItems}</div>
       <div class="btn plus" onclick="changeunits('plus',${item.id})">+</div>           
            </div>
        </div>
            `
            cartItemsEL.innerHTML += carthtml;
    
        })
    }
 
}

function  triggered () {
    console.log("triggerd");
}
function removeitem (id) {
    //create a new array changing the previouse one
    cart = cart.filter(item=> item.id !== id )
    updateCart();
}
 function changeunits (action,id) {
    //ovewrite the initial cart values upon changes and update the cart with returned values
  cart = cart.map(item=>{
       let numberofItems  = item.numberofItems 
       if (item.id === id) {
           //check type of action to be done 
           if (action === 'minus' && numberofItems > 0) {
            numberofItems --
           }else if (action === 'plus' && numberofItems < item.instock) {
            numberofItems ++
           }
       }
       return {
           ...item,
           numberofItems
       }
   })
   console.log(cart);
cart.forEach(item=>{
    if ( item.id === id && item.numberofItems < 1 ) {
        removeitem(item.id);
    }
})
   updateCart();
}  
