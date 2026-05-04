const container = document.getElementById('ticketsContainer');
const popup = document.getElementById('popup');
const joinEmail = document.getElementById('joinEmail');
const joinPrice = document.getElementById('joinPrice');
const confirmJoin = document.getElementById('confirmJoin');
const closePopup = document.getElementById('closePopup');

let selectedTicketIndex = null;

function loadTickets() {
  const tickets = JSON.parse(localStorage.getItem('squadTickets')) || [];
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

          <button onclick="openJoin(${index})">JOIN</button>
          
          <div class="joined-list">
           <h4 class="toggle-btn">Joined Player ▼</h4>
          <div class="joined-content" style="display:none;">
            ${ticket.joined.length === 0 ? '<p>No one joined yet</p>' :
        ticket.joined.map(j => `<p> Team Name - ${j.TeamName} (₹${j.entryPrice})<br> 
            ${j.email} <br>➜ Player 1 - ${j.InGameName} <br> UID - ${j.InGameUID} <br>
            ${j.Player2Email} <br>➜ Player 2 - ${j.P2InGameName} <br> UID - ${j.P2InGameUID} <br> 
            ${j.Player3Email} <br>➜ Player 3 - ${j.P3InGameName} <br> UID - ${j.P3InGameUID} <br> 
            ${j.Player4Email} <br>➜ Player 4 - ${j.P4InGameName} <br> UID - ${j.P4InGameUID} <br> 
            ${j.Player5Email} <br>➜ Player 5 - ${j.P5InGameName} <br> UID - ${j.P5InGameUID} <br> 
            </p>-------------------------<br>`).join('')
      }
          </div>
        `;
    container.appendChild(card);
  });
}

function openJoin(index) {
  selectedTicketIndex = index;
  popup.classList.remove('hidden');
}

confirmJoin.addEventListener('click', () => {
  const tickets = JSON.parse(localStorage.getItem('squadTickets')) || [];
  const ticket = tickets[selectedTicketIndex];

  const enteredEmail = joinEmail.value.trim();
  const enteredInGameName = InGameName.value.trim();
  const enteredInGameUID = InGameUID.value.trim();
  const enteredPrice = joinPrice.value.trim();
  // Team Info
  const enteredTeamName = TeamName.value.trim();
  //   Player 2
  const enteredPlayer2Email = Player2Email.value.trim();
  const enteredP2InGameName = P2InGameName.value.trim();
  const enteredP2InGameUID = P2InGameUID.value.trim();
  //   Player 3
  const enteredPlayer3Email = Player3Email.value.trim();
  const enteredP3InGameName = P3InGameName.value.trim();
  const enteredP3InGameUID = P3InGameUID.value.trim();
  // Player 4
  const enteredPlayer4Email = Player4Email.value.trim();
  const enteredP4InGameName = P4InGameName.value.trim();
  const enteredP4InGameUID = P4InGameUID.value.trim();
  // Player 5
  const enteredPlayer5Email = Player5Email.value.trim();
  const enteredP5InGameName = P5InGameName.value.trim();
  const enteredP5InGameUID = P5InGameUID.value.trim();

  // --- Check Join Limit ---
  if (ticket.joined.length >= ticket.limit) {
    alert("Slots Full! Limit Reached.");
    return;
  }

  if (enteredTeamName == "" || enteredEmail == "" || enteredInGameName == "" || enteredInGameUID == "" ||
    enteredP2InGameName == "" || enteredP2InGameUID == "" || enteredP3InGameName == "" || enteredP3InGameUID == "" ||
    enteredP4InGameName == "" || enteredP4InGameUID == "" || enteredP5InGameName == "" || enteredP5InGameUID == "") {
    alert("Enter All Details");
    return false;
  }

  if (enteredPrice != ticket.entryPrice) {
    alert('❌ Incorrect Price! Please enter the correct price.');
    return;
  }

  ticket.joined.push({
    TeamName: enteredTeamName, email: enteredEmail, InGameName: enteredInGameName, InGameUID: enteredInGameUID, entryPrice: enteredPrice,
    P2InGameName: enteredP2InGameName, P2InGameUID: enteredP2InGameUID, Player2Email: enteredPlayer2Email,
    Player3Email: enteredPlayer3Email, P3InGameName: enteredP3InGameName, P3InGameUID: enteredP3InGameUID,
    Player4Email: enteredPlayer4Email, P4InGameName: enteredP4InGameName, P4InGameUID: enteredP4InGameUID,
    Player5Email: enteredPlayer5Email, P5InGameName: enteredP5InGameName, P5InGameUID: enteredP5InGameUID
  });
  localStorage.setItem('squadTickets', JSON.stringify(tickets));

  alert('✅ Joined Successfully!');
  popup.classList.add('hidden');
  joinEmail.value = '';
  joinPrice.value = '';
  loadTickets();
});

closePopup.addEventListener('click', () => {
  popup.classList.add('hidden');
});

window.onload = loadTickets;

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("toggle-btn")) {

    const content = e.target.nextElementSibling;

    if (content.style.display === "none") {
      content.style.display = "block";
      e.target.innerHTML = "Joined Player List ▲";  // arrow up
    } else {
      content.style.display = "none";
      e.target.innerHTML = "Joined Player List ▼";  // arrow down
    }
  }
});
