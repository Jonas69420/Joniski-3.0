const clicker_button = document.getElementById("clicker-button");
const clicker_count = document.getElementById("clicker-count");
let clicks = 0;
let auto_clickers = []

class autoClicker{
  constructor(amount, speed , cost){
    this.amount = amount;
    this.speed = speed;
    this.cost = cost;
  }
}


/* cookies */
function getCookie(name){
  const c_decoded = decodeURIComponent(document.cookie);
  const c_array = c_decoded.split("; ");
  let result = null

  c_array.forEach(e => {
    if (e.indexOf(name) == 0){
      result = e.substring(name.length + 1);
    }
  })

  return result;
}

if (isNaN(parseInt(getCookie("clicks")))){
  clicks = 0;
  document.cookie = "clicks=0;";
}else{
  clicks = parseInt(getCookie("clicks"));
  clicker_count.innerHTML = clicks;
}


function click(amount){
    clicks += amount;

    clicker_count.innerHTML = clicks;
    document.cookie = "clicks=" + clicks + ";";
}

/* Setup clicker */
clicker_button.addEventListener("click", (e) =>{
  click(1);
});

function autoClick(upgrade){
    click(upgrade.amount)
    setTimeout(autoClick, upgrade.speed * 1000, upgrade)
}

function addAutoClicker(auto_clicker){
  auto_clickers.push(auto_clicker);
  document.cookie = "upgrade" + auto_clickers.length + "=" + auto_clicker.amount + "-" + auto_clicker.speed + "-" + auto_clicker.cost +";";
}

/* Setup Autoclickers */


for (let i = 0; i < 4; i ++){
  if (getCookie("upgrade" + (i+1)) == null){
    addAutoClicker(new autoClicker(0, 1, 50))
    addAutoClicker(new autoClicker(0, 1, 150))
    addAutoClicker(new autoClicker(0, 1, 500))
    addAutoClicker(new autoClicker(0, 1, 1000))
    break;
  }else{
    let upgrades = getCookie("upgrade" + (i+1)).split("-");
    addAutoClicker(new autoClicker(parseInt(upgrades[0]), parseInt(upgrades[1]), parseInt(upgrades[2])))
  }
}


/* Upgrade buttons for auto clickers */
for (let i = 0; i < auto_clickers.length; i ++){
  let upgrade_button =  document.getElementById("upgrade-"+(i+1));
  upgrade_button.innerHTML = "<h2>Upgrade " + (i+1) + " - " + auto_clickers[i].cost + "</h2>";

  let upgrade_counter = document.getElementById("upgrade-" + (i+1) + "-c");
  upgrade_counter.innerHTML = auto_clickers[i].amount;

  autoClick(auto_clickers[i]);

  upgrade_button.addEventListener("click", (e) =>{
    if (auto_clickers[i].cost > clicks){
        return;
    }

    clicks -= auto_clickers[i].cost;
    auto_clickers[i].cost = Math.round(auto_clickers[i].cost * 1.25);

    auto_clickers[i].amount += 1;
    upgrade_button.innerHTML = "<h2>Upgrade " + (i+1) + " - " + auto_clickers[i].cost + "</h2>";

    upgrade_counter.innerHTML = auto_clickers[i].amount;

    document.cookie = "upgrade" + (i + 1) + "=" + auto_clickers[i].amount + "-" + auto_clickers[i].speed + "-" + auto_clickers[i].cost +";";
  });
}
