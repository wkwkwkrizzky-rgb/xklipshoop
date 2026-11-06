const games = [
  {name:"Mobile Legends", icon:"⚔️", products:["86 Diamond","172 Diamond","257 Diamond","344 Diamond"]},
  {name:"Free Fire", icon:"🔥", products:["70 Diamond","140 Diamond","355 Diamond","720 Diamond"]},
  {name:"PUBG Mobile", icon:"🎯", products:["60 UC","325 UC","660 UC","1800 UC"]},
  {name:"Roblox", icon:"🧱", products:["Robux 80","Robux 160","Robux 400","Robux 800"]},
  {name:"Genshin Impact", icon:"✨", products:["60 Genesis Crystal","300 Genesis Crystal","Blessing Welkin"]},
  {name:"Valorant", icon:"💥", products:["125 VP","420 VP","700 VP","1375 VP"]},
  {name:"FC Mobile", icon:"⚽", products:["40 FC Points","100 FC Points","520 FC Points"]},
  {name:"Call of Duty Mobile", icon:"🎮", products:["80 CP","400 CP","800 CP","2000 CP"]}
];
const grid=document.getElementById("gameGrid"), gameSelect=document.getElementById("gameSelect"), productSelect=document.getElementById("productSelect");
games.forEach((g,i)=>{
  const opt=document.createElement("option"); opt.value=g.name; opt.textContent=g.name; gameSelect.append(opt);
  const card=document.createElement("button"); card.type="button"; card.className="game-card";
  card.innerHTML=`<span class="game-icon">${g.icon}</span><strong>${g.name}</strong><small>Pilih untuk top up →</small>`;
  card.addEventListener("click",()=>{gameSelect.value=g.name; updateProducts(); document.getElementById("order").scrollIntoView({behavior:"smooth"});});
  grid.append(card);
});
function updateProducts(){
  const game=games.find(g=>g.name===gameSelect.value);
  productSelect.innerHTML='<option value="">Pilih nominal</option>';
  if(game) game.products.forEach(p=>{const o=document.createElement("option");o.value=p;o.textContent=p;productSelect.append(o)});
}
gameSelect.addEventListener("change",updateProducts);
function getOrders(){try{return JSON.parse(localStorage.getItem("xk_demo_orders")||"[]")}catch{return []}}
function saveOrders(data){localStorage.setItem("xk_demo_orders",JSON.stringify(data))}
document.getElementById("orderForm").addEventListener("submit",e=>{
  e.preventDefault();
  const order={code:"XK-"+Math.floor(100000+Math.random()*900000),game:gameSelect.value,player:document.getElementById("playerId").value.trim(),server:document.getElementById("serverId").value.trim(),product:productSelect.value,name:document.getElementById("buyerName").value.trim(),status:"Demo — menunggu integrasi pembayaran",created:new Date().toLocaleString("id-ID")};
  const orders=getOrders();orders.unshift(order);saveOrders(orders);
  const result=document.getElementById("orderResult");result.hidden=false;
  result.innerHTML=`<strong>Pesanan demo berhasil dibuat!</strong><br>Kode: <strong>${order.code}</strong><br>Game: ${order.game}<br>Nominal: ${order.product}<br>Status: ${order.status}<br><small>Simpan kode ini untuk mencoba fitur cek pesanan. Ini belum merupakan transaksi atau top up sungguhan.</small>`;
  document.getElementById("trackCode").value=order.code;
  result.scrollIntoView({behavior:"smooth",block:"nearest"});
});
document.getElementById("trackForm").addEventListener("submit",e=>{
  e.preventDefault();const code=document.getElementById("trackCode").value.trim().toUpperCase();
  const order=getOrders().find(o=>o.code===code);const out=document.getElementById("trackResult");
  out.textContent=order?`Ditemukan: ${order.game} • ${order.product} • ${order.status} • Dibuat: ${order.created}`:"Kode tidak ditemukan di perangkat/browser ini. Pastikan kode benar dan gunakan browser yang sama.";
});
document.getElementById("year").textContent=new Date().getFullYear();
