function getCoins() {
    return parseInt(localStorage.getItem("coins")) || 0;
}

function setCoins(val) {
    localStorage.setItem("coins", val);
}

// Load coins on top bar
window.onload = function () {
    document.getElementById("coinDisplay").innerText = getCoins();
};

document.getElementById("withdrawForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let coins = getCoins();
    let withdrawRs = parseInt(document.getElementById("amount").value);
    let requiredCoins = withdrawRs;

    if (requiredCoins > coins) {
        alert("Not enough coins!");
        return;
    }

    // Deduct coins
    setCoins(coins - requiredCoins);

    // Store withdraw request for admin
    let withdrawData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        upi: document.getElementById("upi").value,
        amount: withdrawRs,
        time: new Date().toLocaleString()
    };

    let list = JSON.parse(localStorage.getItem("withdrawList")) || [];
    list.push(withdrawData);
    localStorage.setItem("withdrawList", JSON.stringify(list));

    alert("Withdraw Request Sent Successfully!");

    window.location.href = "../wallet.html";
});
