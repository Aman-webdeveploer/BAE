const container = document.getElementById('ticketsContainer');
const popup = document.getElementById('popup');
const joinEmail = document.getElementById('joinEmail');
const joinPrice = document.getElementById('joinPrice');
const confirmJoin = document.getElementById('confirmJoin');
const closePopup = document.getElementById('closePopup');
const coinDisplay = document.getElementById('coins');



let selectedTicketIndex = null;

function loadTickets() {
  const tickets = JSON.parse(localStorage.getItem('soloTickets')) || [];
  container.innerHTML = '';

  tickets.forEach((ticket, index) => {
    const card = document.createElement('div');
    card.className = 'ticket-card';
    card.innerHTML = `
          <h3>${ticket.title}</h3>
          <p><b>Match Date:</b> ${ticket.date}</p>
          <p><b>Match Time:</b> ${ticket.time}</p>
          <p><b>Map:</b> ${ticket.map}</p>
          <p><b>Win Price:</b> ₹${ticket.winPrice}</p>
          <p><b>Entry Price:</b> ₹${ticket.entryPrice}</p>
          <p><b>Slot Limit:</b> ${ticket.limit} / ${ticket.joined.length}</p>

          <button onclick="openJoin(${index})" class = "JoinBtn">JOIN</button>
          
          <div class="joined-list">
           <h4 class="toggle-btn">Joined Player ▼</h4>
          <div class="joined-content" style="display:none;">
            ${ticket.joined.length === 0 ? '<p>No one joined yet</p>' :
        ticket.joined.map(j => `<p>${j.email} <br> ${j.InGameName} <br> ${j.InGameUID} <br>(₹${j.entryPrice})<br>----------------------------------</p>`).join('')
      }
          </div>
        `;
    container.appendChild(card);
  });
}


//Info Area
function openJoin(index) {
  selectedTicketIndex = index;
  popup.classList.remove('hidden');

}

confirmJoin.addEventListener('click', () => {
  const tickets = JSON.parse(localStorage.getItem('soloTickets')) || [];
  const ticket = tickets[selectedTicketIndex];

  const enteredEmail = joinEmail.value.trim();
  const enteredInGameName = InGameName.value.trim();
  const enteredInGameUID = InGameUID.value.trim();
  const enteredPrice = joinPrice.value.trim();
  // const enteredlimit = limit.value.trim();

  if (enteredEmail == "" || enteredInGameName == "" || enteredInGameUID == "") {
    alert("Enter All Details");
    return false;
  }
  // --- Check Join Limit ---
  if (ticket.joined.length >= ticket.limit) {
    alert("Slot Full! Limit Reached.");
    return;
  }


  // // --- Prevent Duplicate ---

  //   if (ticket.joined.find(enteredEmail === email)) {
  //       alert("You Already joined!");
  //       return;
  //   }

  if (enteredPrice != ticket.entryPrice) {
    alert('❌ Incorrect Price! Please enter the correct price.');
    return;
  }

  // // Check wallet
  // if (coins < ticket.entryPrice) {
  //     alert("Not enough coins in wallet!");
  //     return;
  // }

  //  // Deduct coins
  // coins -= ticket.entryPrice;
  // localStorage.setItem("coins", coins);
  // document.getElementById("coins").innerText = coins;


  ticket.joined.push({ email: enteredEmail, InGameName: enteredInGameName, InGameUID: enteredInGameUID, entryPrice: enteredPrice });
  localStorage.setItem('soloTickets', JSON.stringify(tickets));

  alert('✅ Joined Successfully!');
  popup.classList.add('hidden');
  joinEmail.value = '';
  joinPrice.value = '';
  loadTickets();
});

closePopup.addEventListener('click', () => {
  popup.classList.add('hidden');
});

// window.onload = loadTickets;

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("toggle-btn")) {

    const content = e.target.nextElementSibling;

    if (content.style.display === "none") {
      content.style.display = "block";
      e.target.innerHTML = "Joined Player ▲";  // arrow up
    } else {
      content.style.display = "none";
      e.target.innerHTML = "Joined Player ▼";  // arrow down
    }
  }
});

// Load coins
window.addEventListener("load", function () {
  let coins = getCoins();
  document.getElementById("coinDisplay").innerText = coins;
});

// Load tickets
window.addEventListener("load", function () {
  loadTickets();
});

