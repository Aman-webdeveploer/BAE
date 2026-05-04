// Create 10 ad claim
window.onload = function () {
    let adsList = document.getElementById("adsList");
    document.getElementById("coinDisplay").innerText = getCoins();


    for (let i = 1; i <= 10; i++) {
        adsList.innerHTML += `
            <div class="adBox">
                <div class="adText">${i}) Watch ads and claim 2 coin</div>
                <button class="claimBtn" id="btn${i}" onclick="claim(${i})">claim</button>
            </div>
        `;

        updateButton(i);
    }
};

// Get coins from storage
function getCoins() {
    return parseInt(localStorage.getItem("coins")) || 0;
}

// Save coins
function setCoins(val) {
    localStorage.setItem("coins", val);
}

// When user clicks claim
function claim(id) {
    let key = "cooldown_" + id;
    let cooldownMinutes = 1;
    let cooldownEnd = Date.now() + (cooldownMinutes * 60 * 1000); // 24 hours
    localStorage.setItem(key, cooldownEnd);

    // add 2 coins
    setCoins(getCoins() + 2);

    // update display
    document.getElementById("coinDisplay").innerText = getCoins();


    updateButton(id);
}

// update button state
function updateButton(id) {
    let btn = document.getElementById("btn" + id);
    let key = "cooldown_" + id;
    let end = localStorage.getItem(key);

    if (!end) {
        btn.disabled = false;
        btn.innerText = "claim";
        return;
    }

    if (Date.now() > end) {
        btn.disabled = false;
        btn.innerText = "claim";
        return;
    }

    btn.disabled = true;
    startCountdown(btn, end);
}

// countdown timer display
function startCountdown(button, endTime) {
    function run() {
        let diff = endTime - Date.now();

        if (diff <= 0) {
            button.disabled = false;
            button.innerText = "claim";
            return;
        }

        // let h = Math.floor(diff / (1000 * 60 * 60 ));
        let m = Math.floor(diff / (1000 * 60));
        let s = Math.floor((diff % (1000 * 60)) / 1000);

        button.innerText = `${m}m ${s}s`;

        setTimeout(run, 1000);
    }
    run();
}
