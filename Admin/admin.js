function loadRequests() {
    let list = JSON.parse(localStorage.getItem("withdrawList")) || [];
    let container = document.getElementById("requestList");

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>No Withdraw Requests</p>";
        return;
    }

    list.forEach((req, index) => {
        container.innerHTML += `
            <div class="card">
                <p><b>Name:</b> ${req.name}</p>
                <p><b>Phone:</b> ${req.phone}</p>
                <p><b>Email:</b> ${req.email}</p>
                <p><b>UPI:</b> ${req.upi}</p>
                <p><b>Amount:</b> ₹${req.amount}</p>
                <p><b>Time:</b> ${req.time}</p>

                <div class="btnRow">
                    <button class="approveBtn" onclick="approve(${index})">Approve</button>
                    <button class="rejectBtn" onclick="rejectReq(${index})">Reject</button>
                </div>
            </div>
        `;
    });
}

function approve(i) {
    let list = JSON.parse(localStorage.getItem("withdrawList")) || [];
    alert("Approved Successfully!");

    list.splice(i, 1);
    localStorage.setItem("withdrawList", JSON.stringify(list));

    loadRequests();
}

function rejectReq(i) {
    let list = JSON.parse(localStorage.getItem("withdrawList")) || [];
    alert("Rejected Successfully!");

    list.splice(i, 1);
    localStorage.setItem("withdrawList", JSON.stringify(list));

    loadRequests();
}

window.onload = loadRequests;
