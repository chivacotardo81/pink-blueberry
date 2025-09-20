// Booking form functionality
let selectedService = null;
let selectedStylist = null;
let selectedDate = null;
let selectedTime = null;
let currentMember = null;

// Generate unique booking reference
function generateBookingReference() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `PB-${timestamp}${random}`;
}

// Membership validation functionality
function validateMembership() {
  const membershipInput = document.getElementById('membership-number');
  const membershipNumber = membershipInput.value.trim().toUpperCase();
  const errorElement = document.getElementById('membership-error');
  const successElement = document.getElementById('membership-success');
  const membershipInfo = document.getElementById('membership-info');
  const pointsPreview = document.getElementById('points-preview');
  
  // Clear previous messages
  errorElement.textContent = '';
  successElement.style.display = 'none';
  membershipInfo.style.display = 'none';
  pointsPreview.style.display = 'none';
  
  if (!membershipNumber) {
    currentMember = null;
    updateBookingSummary();
    return;
  }
  
  // Validate membership
  const member = membershipSystem.validateMembership(membershipNumber);
  
  if (member) {
    currentMember = member;
    
    // Show success message
    successElement.textContent = `Welcome back, ${member.name}!`;
    successElement.style.display = 'block';
    
    // Show member info
    document.getElementById('member-name').textContent = member.name;
    document.getElementById('member-level').textContent = member.level;
    document.getElementById('member-points').textContent = `${member.points} points`;
    membershipInfo.style.display = 'block';
    
    // Calculate and show points preview
    if (selectedService) {
      const points = membershipSystem.calculateBookingPoints(selectedService.price, member.level);
      document.getElementById('booking-points').textContent = points;
      pointsPreview.style.display = 'block';
    }
  } else {
    currentMember = null;
    errorElement.textContent = 'Invalid membership number. Please check and try again.';
  }
  
  updateBookingSummary();
}

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

    console.log('Validating booking state:', bookingState);

    if (!bookingState.service) { 
      console.log('Service validation failed');
      alert('Please select a service.'); 
      isValid = false; 
    }
    if (!bookingState.date) { 
      console.log('Date validation failed');
      alert('Please select a date.'); 
      isValid = false; 
    }
    if (!bookingState.time) { 
      console.log('Time validation failed');
      alert('Please select a time.'); 
      isValid = false; 
    }

    if (!nameInput.value.trim()) {
      console.log('Name validation failed');
      document.getElementById('name-error').textContent = 'Name is required.';
      isValid = false;
    }
    if (!emailInput.value.trim() || !/\S+@\S+\.\S+/.test(emailInput.value)) {
      console.log('Email validation failed');
      document.getElementById('email-error').textContent = 'A valid email is required.';
      isValid = false;
    }
    if (!phoneInput.value.trim()) {
      console.log('Phone validation failed');
      document.getElementById('phone-error').textContent = 'Phone number is required.';
      isValid = false;
    } else if (!/^[\d\s\-\(\)]+$/.test(phoneInput.value.trim())) {
      console.log('Phone format validation failed');
      document.getElementById('phone-error').textContent = 'Please enter a valid phone number.';
      isValid = false;
    }
    
    console.log('Validation result:', isValid);
    return isValid;
  }

  // Event listeners
  serviceSelect.addEventListener('change', (e) => {
    const selectedId = parseInt(e.target.value, 10);
    selectedService = services.find(s => s.id === selectedId) || null;
    bookingState.service = selectedService;
    updateSummary();
    
    // Update points preview if member is validated
    if (currentMember && selectedService) {
      const points = membershipSystem.calculateBookingPoints(selectedService.price, currentMember.level);
      document.getElementById('booking-points').textContent = points;
      document.getElementById('points-preview').style.display = 'block';
    }
  });

  timeslotSelect.addEventListener('change', (e) => {
    bookingState.time = e.target.value;
    updateSummary();
  });

  stylistSelect.addEventListener('change', (e) => {
    const selectedId = parseInt(e.target.value, 10);
    bookingState.stylist = stylists.find(s => s.id === selectedId) || null;
    updateSummary();
  });

  document.getElementById('validate-membership-btn').addEventListener('click', validateMembership);

  confirmBtn.addEventListener('click', () => {
    console.log('Confirm button clicked');
    console.log('Current bookingState:', bookingState);
    
    if (handleFormValidation()) {
      console.log('Validation passed');
      bookingState.customer.name = nameInput.value;
      bookingState.customer.email = emailInput.value;
      bookingState.customer.phone = phoneInput.value;
      
      const bookingReference = generateBookingReference();
      bookingState.reference = bookingReference;
      
      // Add points to member account if applicable
      let pointsMessage = '';
      if (currentMember && currentMember.membershipNumber && bookingState.service) {
        const points = membershipSystem.calculateBookingPoints(bookingState.service.price, currentMember.level);
        membershipSystem.addPoints(currentMember.membershipNumber, points, 'booking');
        pointsMessage = `\n\nYou earned ${points} points! Your new balance: ${currentMember.points + points} points.`;
      }
      
      console.log('Booking Confirmed:', bookingState);
      alert(`Thank you! Your booking has been confirmed.\n\nBooking Reference: ${bookingReference}${pointsMessage}\n\nPlease save this reference for your records.`);
    } else {
      console.log('Validation failed');
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
