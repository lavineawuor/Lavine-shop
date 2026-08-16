const products=[
{id:1,name:"Classic Sneakers",price:59.99,icon:"👟"},{id:2,name:"Smart Watch",price:89.99,icon:"⌚"},
{id:3,name:"Travel Backpack",price:49.99,icon:"🎒"},{id:4,name:"Wireless Headphones",price:74.99,icon:"🎧"},
{id:5,name:"Minimal Lamp",price:34.99,icon:"💡"},{id:6,name:"Coffee Tumbler",price:24.99,icon:"☕"}];
let cart=[];
const grid=document.getElementById("productGrid"),search=document.getElementById("search"),panel=document.getElementById("cartPanel"),overlay=document.getElementById("overlay");
function renderProducts(list=products){grid.innerHTML=list.map(p=>`<article class="product"><div class="product-image">${p.icon}</div><div class="product-info"><h3>${p.name}</h3><p class="price">$${p.price.toFixed(2)}</p><button class="add" onclick="addToCart(${p.id})">Add to cart</button></div></article>`).join("")}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({...products.find(x=>x.id===id),qty:1});renderCart();openCart()}
function changeQty(id,amount){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=amount;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);renderCart()}
function renderCart(){document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-item"><div><b>${x.name}</b><br>$${x.price.toFixed(2)} × ${x.qty}</div><div class="qty"><button onclick="changeQty(${x.id},-1)">−</button> <button onclick="changeQty(${x.id},1)">+</button></div></div>`).join(""):"<p>Your cart is empty.</p>";document.getElementById("cartTotal").textContent="$"+cart.reduce((s,x)=>s+x.price*x.qty,0).toFixed(2)}
function openCart(){panel.classList.add("open");overlay.classList.add("show")}function closeCart(){panel.classList.remove("open");overlay.classList.remove("show")}
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;overlay.onclick=closeCart;
document.getElementById("checkout").onclick=()=>alert(cart.length?"Checkout demo — thank you for testing!":"Your cart is empty!");
search.oninput=e=>{const q=e.target.value.toLowerCase();renderProducts(products.filter(p=>p.name.toLowerCase().includes(q)))};renderProducts();renderCart();