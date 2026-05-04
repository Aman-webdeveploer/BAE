const form = document.getElementById('ticketForm');
const ticketList = document.getElementById('ticketList');
const saveBtn = document.getElementById('saveBtn');
const updateBtn = document.getElementById('updateBtn');
const cancelBtn = document.getElementById('cancelBtn');

let editIndex = null;

// Load tickets from localStorage
function loadTickets() {
  const tickets = JSON.parse(localStorage.getItem('duoTickets')) || [];
  ticketList.innerHTML = '';

  if (tickets.length === 0) {
    ticketList.innerHTML = '<p>No tickets createdd yet.</p>';
    return;
  }

  tickets.forEach((ticket, index) => {
    const div = document.createElement('div');
    div.className = 'ticket-card';
    div.innerHTML = `
          <h3>${ticket.title}</h3>
          <p><b>Date</b> ${ticket.date}</p>
          <p><b>Time</b> ${ticket.time}</p>
          <p><b>Map</b> ${ticket.map}</p>
          <p><b>Win Price</b> ₹${ticket.winPrice}</p>
          <p><b>Entry Price:</b> ₹${ticket.entryPrice}</p>
          <p><b>Slot Limit:</b> ${ticket.limit}</p>
          
          <div class="btns">
            <button onclick="editTicket(${index})">✏️ Edit</button>
            <button onclick="deleteTicket(${index})">🗑️ Delete</button>
          </div>
        `;
    ticketList.appendChild(div);
  });
}

// Add new ticket
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const tickets = JSON.parse(localStorage.getItem('duoTickets')) || [];

  const ticket = {
    title: document.getElementById('title').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    map: document.getElementById('map').value,
    winPrice: document.getElementById('winPrice').value,
    entryPrice: document.getElementById('entryPrice').value,
    limit: document.getElementById("limit").value,
    joined: []
  };

  tickets.push(ticket);
  localStorage.setItem('duoTickets', JSON.stringify(tickets));

  alert('✅ Ticket Added Successfully!');
  form.reset();
  loadTickets();
});

// Delete ticket
function deleteTicket(index) {
  const tickets = JSON.parse(localStorage.getItem('duoTickets')) || [];
  if (confirm('Are you sure you want to delete this ticket?')) {
    tickets.splice(index, 1);
    localStorage.setItem('duoTickets', JSON.stringify(tickets));
    loadTickets();
  }
}

// Edit ticket
function editTicket(index) {
  const tickets = JSON.parse(localStorage.getItem('duoTickets')) || [];
  const ticket = tickets[index];

  document.getElementById('title').value = ticket.title;
  document.getElementById('date').value = ticket.date;
  document.getElementById('time').value = ticket.time;
  document.getElementById('map').value = ticket.map;
  document.getElementById('winPrice').value = ticket.winPrice;
  document.getElementById('entryPrice').value = ticket.entryPrice;
  document.getElementById("limit").value = ticket.limit;

  editIndex = index;
  saveBtn.classList.add('hidden');
  updateBtn.classList.remove('hidden');
  cancelBtn.classList.remove('hidden');
}

// Update ticket
updateBtn.addEventListener('click', () => {
  const tickets = JSON.parse(localStorage.getItem('duoTickets')) || [];
  tickets[editIndex] = {
    title: document.getElementById('title').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    map: document.getElementById('map').value,
    winPrice: document.getElementById('winPrice').value,
    entryPrice: document.getElementById('entryPrice').value,
    limit: document.getElementById("limit").value,
    joined: tickets[editIndex].joined || []
  };
  localStorage.setItem('duoTickets', JSON.stringify(tickets));

  alert('✅ Ticket Updated Successfully!');
  form.reset();
  editIndex = null;

  saveBtn.classList.remove('hidden');
  updateBtn.classList.add('hidden');
  cancelBtn.classList.add('hidden');
  loadTickets();
});

// Cancel edit
cancelBtn.addEventListener('click', () => {
  form.reset();
  saveBtn.classList.remove('hidden');
  updateBtn.classList.add('hidden');
  cancelBtn.classList.add('hidden');
  editIndex = null;
});

window.onload = loadTickets;

// Make functions global
window.deleteTicket = deleteTicket;
window.editTicket = editTicket;