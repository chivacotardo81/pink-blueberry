document.addEventListener('DOMContentLoaded', () => {
  // --- CACHE DOM ELEMENTS ---
  const serviceSelect = document.getElementById('service-select');
  const monthYearEl = document.getElementById('month-year');
  const calendarGrid = document.getElementById('calendar-grid');
  const weekdaysGrid = document.getElementById('calendar-weekdays');
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');
  const timeslotSelect = document.getElementById('timeslot-select');
  const stylistSelect = document.getElementById('stylist-select');
  const summaryContent = document.getElementById('summary-content');
  const summaryTotalPrice = document.getElementById('summary-total-price');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const confirmBtn = document.getElementById('confirm-booking-btn');

  // --- STATE MANAGEMENT ---
  let currentDate = new Date();
  const bookingState = {
    service: null,
    date: null,
    time: null,
    stylist: null,
    customer: {
      name: '',
      email: '',
      phone: ''
    }
  };

  // --- DATA POPULATION ---
  function populateServices() {
    serviceSelect.innerHTML = '<option value="">Select a service...</option>';
    services.forEach(s => {
      const option = new Option(`${s.name} - $${s.price}`, s.id);
      serviceSelect.add(option);
    });
  }

  function populateStylists() {
    stylistSelect.innerHTML = '<option value="">Any Stylist</option>';
    stylists.forEach(s => {
      const option = new Option(`${s.name} - ${s.role}`, s.id);
      stylistSelect.add(option);
    });
  }

  function populateTimeslots() {
    const times = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
    timeslotSelect.innerHTML = '<option value="">Select a time...</option>';
    times.forEach(time => {
      const option = new Option(time, time);
      timeslotSelect.add(option);
    });
  }

  // --- CALENDAR LOGIC ---
  function renderCalendar() {
    calendarGrid.innerHTML = '';
    weekdaysGrid.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const monthYearDisplay = document.getElementById('month-year');
    if (monthYearDisplay) {
      monthYearDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
    }

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Render weekdays
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        weekdaysGrid.insertAdjacentHTML('beforeend', `<div>${day}</div>`);
    });

    // Render empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      calendarGrid.insertAdjacentHTML('beforeend', `<div class="day disabled"></div>`);
    }

    // Render days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const availability = bookedDates[dateStr];
      const dayEl = document.createElement('div');
      dayEl.className = 'day';
      dayEl.textContent = day;
      dayEl.dataset.date = dateStr;

      if (availability) {
        dayEl.insertAdjacentHTML('beforeend', `<span class="availability-pill ${availability}"></span>`);
      }

      if (new Date(year, month, day) < new Date().setHours(0,0,0,0)) {
        dayEl.classList.add('disabled');
      } else {
        dayEl.addEventListener('click', () => selectDate(dayEl, dateStr));
      }
      
      if (dateStr === bookingState.date) {
        dayEl.classList.add('selected');
      }

      calendarGrid.appendChild(dayEl);
    }
  }

  function selectDate(dayEl, dateStr) {
    bookingState.date = dateStr;
    document.querySelectorAll('.day.selected').forEach(d => d.classList.remove('selected'));
    dayEl.classList.add('selected');
    updateSummary();
  }

  // --- EVENT HANDLERS & STATE UPDATES ---
  function updateSummary() {
    const { service, date, time, stylist } = bookingState;
    let content = '';
    let totalPrice = 0;

    if (service) {
      content += `<p><strong>Service:</strong> ${service.name}</p>`;
      totalPrice = service.price;
    }
    if (date) content += `<p><strong>Date:</strong> ${date}</p>`;
    if (time) content += `<p><strong>Time:</strong> ${time}</p>`;
    if (stylist) content += `<p><strong>Stylist:</strong> ${stylist.name}</p>`;

    summaryContent.innerHTML = content || '<p>Your selections will appear here.</p>';
    summaryTotalPrice.textContent = `$${totalPrice}`;
    if (summaryTotalPrice) {
        summaryTotalPrice.parentElement.style.display = ''; // Restore display
    }
  }

  function handleFormValidation() {
    let isValid = true;
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    if (!bookingState.service) { alert('Please select a service.'); isValid = false; }
    if (!bookingState.date) { alert('Please select a date.'); isValid = false; }
    if (!bookingState.time) { alert('Please select a time.'); isValid = false; }

    if (!nameInput.value.trim()) {
      document.getElementById('name-error').textContent = 'Name is required.';
      isValid = false;
    }
    if (!emailInput.value.trim() || !/\S+@\S+\.\S+/.test(emailInput.value)) {
      document.getElementById('email-error').textContent = 'A valid email is required.';
      isValid = false;
    }
    
    return isValid;
  }

  // --- ATTACH EVENT LISTENERS ---
  prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  serviceSelect.addEventListener('change', (e) => {
    const selectedId = parseInt(e.target.value, 10);
    bookingState.service = services.find(s => s.id === selectedId) || null;
    updateSummary();
  });

  timeslotSelect.addEventListener('change', (e) => {
    bookingState.time = e.target.value || null;
    updateSummary();
  });

  stylistSelect.addEventListener('change', (e) => {
    const selectedId = parseInt(e.target.value, 10);
    bookingState.stylist = stylists.find(s => s.id === selectedId) || null;
    updateSummary();
  });

  confirmBtn.addEventListener('click', () => {
    if (handleFormValidation()) {
      bookingState.customer.name = nameInput.value;
      bookingState.customer.email = emailInput.value;
      bookingState.customer.phone = phoneInput.value;
      console.log('Booking Confirmed:', bookingState);
      alert('Thank you! Your booking has been confirmed.');
    }
  });

  // --- INITIALIZATION ---
  function init() {
    populateServices();
    populateStylists();
    populateTimeslots();
    renderCalendar();
    updateSummary();
  }

  init();
});
