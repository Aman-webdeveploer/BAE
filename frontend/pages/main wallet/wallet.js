function getCoins() {
    return parseInt(localStorage.getItem("coins")) || 0;
}

// function goWithdraw() {
//     window.location.href = "frontend/pages/main wallet/withdraw/withdraw.html";
// }

window.onload = function() {
    let coins = getCoins();

    document.getElementById("coinDisplay").innerText = coins;
    document.getElementById("coinBig").innerText = coins;

    // 10 coins = ₹1
    document.getElementById("moneyValue").innerText = (coins / 10).toFixed(2);
};
