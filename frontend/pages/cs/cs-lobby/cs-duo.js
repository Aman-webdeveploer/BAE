const container = document.getElementById('ticketsContainer');
const popup = document.getElementById('popup');
const joinEmail = document.getElementById('joinEmail');
const joinPrice = document.getElementById('joinPrice');
const confirmJoin = document.getElementById('confirmJoin');
const closePopup = document.getElementById('closePopup');

let selectedTicketIndex = null;

function loadTickets() {
  const tickets = JSON.parse(localStorage.getItem('CSduoTickets')) || [];
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
        ticket.joined.map(j => `<p>Team Name - ${j.TeamName} (₹${j.entryPrice})<br> ${j.email} <br>➜ Player 1 - ${j.InGameName} <br> UID - ${j.InGameUID} <br>${j.PlayerEmail} <br>➜ Player 2 - ${j.PInGameName} <br> UID - ${j.PInGameUID} <br></p>-------------------------<br>`).join('')
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
  const tickets = JSON.parse(localStorage.getItem('CSduoTickets')) || [];
  const ticket = tickets[selectedTicketIndex];

  const enteredEmail = joinEmail.value.trim();
  const enteredInGameName = InGameName.value.trim();
  const enteredInGameUID = InGameUID.value.trim();
  const enteredPrice = joinPrice.value.trim();

  const enteredTeamName = TeamName.value.trim();
  const enteredPlayerEmail = PlayerEmail.value.trim();
  const enteredPInGameName = PInGameName.value.trim();
  const enteredPInGameUID = PInGameUID.value.trim();

  // --- Check Join Limit ---
  if (ticket.joined.length >= ticket.limit) {
    alert("Slots Full! Limit Reached.");
    return;
  }

  if (enteredTeamName == "" || enteredEmail == "" || enteredInGameName == "" || enteredInGameUID == "" ||
    enteredPInGameName == "" || enteredPInGameUID == "") {
    alert("Enter All Details");
    return false;
  }

  if (enteredPrice != ticket.entryPrice) {
    alert('❌ Incorrect Price! Please enter the correct price.');
    return;
  }

  ticket.joined.push({ TeamName: enteredTeamName, email: enteredEmail, InGameName: enteredInGameName, InGameUID: enteredInGameUID, entryPrice: enteredPrice, PInGameName: enteredPInGameName, PInGameUID: enteredPInGameUID, PlayerEmail: enteredPlayerEmail });
  localStorage.setItem('CSduoTickets', JSON.stringify(tickets));

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
