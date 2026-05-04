function getCoins() {
    return parseInt(localStorage.getItem("coins")) || 0;
}

window.onload = function () {
    let coins = getCoins();

    document.getElementById("coinDisplay").innerText = coins;

};
// Get coins from storage
function getCoins() {
    return parseInt(localStorage.getItem("coins")) || 0;
}

// Save coins
function setCoins(val) {
    localStorage.setItem("coins", val);
}