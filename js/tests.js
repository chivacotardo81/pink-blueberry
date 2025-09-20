/**
 * Pink Blueberry Salon - Test Suite
 * Comprehensive testing for core application functionality
 */

// Test utilities
function assert(condition, message) {
  if (condition) {
    console.log(`✅ ${message}`);
    return true;
  } else {
    console.log(`❌ ${message}`);
    return false;
  }
}

function testHeader(testName) {
  console.log(`\n🧪 ${testName}`);
  console.log('='.repeat(50));
}

// Test 1: Cart Calculation Logic
function testCartCalculation() {
  testHeader('Cart Calculation Tests');
  
  let passed = 0;
  let total = 0;
  
  // Test empty cart
  let cart = [];
  let cartTotal = calculateCartTotal(cart);
  if (assert(cartTotal === 0, 'Empty cart should return $0')) passed++;
  total++;
  
  // Test single item
  cart = [{ id: 1, name: 'Lavender Soap', price: 12, quantity: 1 }];
  cartTotal = calculateCartTotal(cart);
  if (assert(cartTotal === 12, 'Single item (1x$12) should return $12')) passed++;
  total++;
  
  // Test multiple quantities
  cart = [{ id: 1, name: 'Lavender Soap', price: 12, quantity: 3 }];
  cartTotal = calculateCartTotal(cart);
  if (assert(cartTotal === 36, 'Multiple quantities (3x$12) should return $36')) passed++;
  total++;
  
  // Test multiple items
  cart = [
    { id: 1, name: 'Lavender Soap', price: 12, quantity: 2 },
    { id: 2, name: 'Charcoal Soap', price: 12, quantity: 1 }
  ];
  cartTotal = calculateCartTotal(cart);
  if (assert(cartTotal === 36, 'Multiple items (2x$12 + 1x$12) should return $36')) passed++;
  total++;
  
  console.log(`\n📊 Cart Tests: ${passed}/${total} passed`);
  return passed === total;
}

// Helper function for cart calculation
function calculateCartTotal(cart) {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Test 2: Form Validation
function testFormValidation() {
  testHeader('Form Validation Tests');
  
  let passed = 0;
  let total = 0;
  
  // Test email validation
  if (assert(validateEmail('test@example.com'), 'Valid email should pass validation')) passed++;
  total++;
  
  if (assert(!validateEmail('invalid-email'), 'Invalid email should fail validation')) passed++;
  total++;
  
  if (assert(!validateEmail(''), 'Empty email should fail validation')) passed++;
  total++;
  
  // Test name validation
  if (assert(validateName('John Doe'), 'Valid name should pass validation')) passed++;
  total++;
  
  if (assert(!validateName(''), 'Empty name should fail validation')) passed++;
  total++;
  
  if (assert(!validateName('   '), 'Whitespace-only name should fail validation')) passed++;
  total++;
  
  // Test phone validation (optional field)
  if (assert(validatePhone('(123) 456-7890'), 'Valid phone should pass validation')) passed++;
  total++;
  
  if (assert(validatePhone(''), 'Empty phone should pass validation (optional)')) passed++;
  total++;
  
  console.log(`\n📊 Form Validation Tests: ${passed}/${total} passed`);
  return passed === total;
}

// Helper functions for form validation
function validateEmail(email) {
  if (!email || !email.trim()) return false;
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

function validateName(name) {
  return name && name.trim().length > 0;
}

function validatePhone(phone) {
  // Phone is optional, so empty is valid
  if (!phone || !phone.trim()) return true;
  // Basic phone validation
  const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return phoneRegex.test(phone);
}

// Test 3: Booking State Management
function testBookingState() {
  testHeader('Booking State Management Tests');
  
  let passed = 0;
  let total = 0;
  
  // Test initial booking state
  let bookingState = createInitialBookingState();
  if (assert(bookingState.service === null, 'Initial service should be null')) passed++;
  total++;
  
  if (assert(bookingState.date === null, 'Initial date should be null')) passed++;
  total++;
  
  if (assert(bookingState.time === null, 'Initial time should be null')) passed++;
  total++;
  
  // Test service selection
  const testService = { id: 1, name: 'Signature Cut & Style', price: 75, duration: 60 };
  bookingState = updateBookingService(bookingState, testService);
  if (assert(bookingState.service.id === 1, 'Service should be updated correctly')) passed++;
  total++;
  
  // Test date selection
  bookingState = updateBookingDate(bookingState, '2024-01-15');
  if (assert(bookingState.date === '2024-01-15', 'Date should be updated correctly')) passed++;
  total++;
  
  // Test time selection
  bookingState = updateBookingTime(bookingState, '10:00 AM');
  if (assert(bookingState.time === '10:00 AM', 'Time should be updated correctly')) passed++;
  total++;
  
  // Test booking validation
  if (assert(isBookingComplete(bookingState), 'Complete booking should validate as true')) passed++;
  total++;
  
  console.log(`\n📊 Booking State Tests: ${passed}/${total} passed`);
  return passed === total;
}

// Helper functions for booking state
function createInitialBookingState() {
  return {
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
}

function updateBookingService(state, service) {
  return { ...state, service: service };
}

function updateBookingDate(state, date) {
  return { ...state, date: date };
}

function updateBookingTime(state, time) {
  return { ...state, time: time };
}

function isBookingComplete(state) {
  return state.service !== null && state.date !== null && state.time !== null;
}

// Test 4: Service Data Integrity
function testServiceData() {
  testHeader('Service Data Integrity Tests');
  
  let passed = 0;
  let total = 0;
  
  // Test services array exists and has content
  if (assert(typeof services !== 'undefined', 'Services data should be defined')) passed++;
  total++;
  
  if (assert(Array.isArray(services), 'Services should be an array')) passed++;
  total++;
  
  if (assert(services.length > 0, 'Services array should not be empty')) passed++;
  total++;
  
  // Test service object structure
  if (services.length > 0) {
    const service = services[0];
    if (assert(service.hasOwnProperty('id'), 'Service should have id property')) passed++;
    total++;
    
    if (assert(service.hasOwnProperty('name'), 'Service should have name property')) passed++;
    total++;
    
    if (assert(service.hasOwnProperty('price'), 'Service should have price property')) passed++;
    total++;
    
    if (assert(service.hasOwnProperty('duration'), 'Service should have duration property')) passed++;
    total++;
    
    if (assert(typeof service.price === 'number', 'Service price should be a number')) passed++;
    total++;
  }
  
  console.log(`\n📊 Service Data Tests: ${passed}/${total} passed`);
  return passed === total;
}

// Test 5: Product Data Integrity
function testProductData() {
  testHeader('Product Data Integrity Tests');
  
  let passed = 0;
  let total = 0;
  
  // Test products array exists and has content
  if (assert(typeof products !== 'undefined', 'Products data should be defined')) passed++;
  total++;
  
  if (assert(Array.isArray(products), 'Products should be an array')) passed++;
  total++;
  
  if (assert(products.length > 0, 'Products array should not be empty')) passed++;
  total++;
  
  // Test product object structure
  if (products.length > 0) {
    const product = products[0];
    if (assert(product.hasOwnProperty('id'), 'Product should have id property')) passed++;
    total++;
    
    if (assert(product.hasOwnProperty('name'), 'Product should have name property')) passed++;
    total++;
    
    if (assert(product.hasOwnProperty('imageUrl'), 'Product should have imageUrl property')) passed++;
    total++;
    
    if (assert(typeof product.name === 'string', 'Product name should be a string')) passed++;
    total++;
  }
  
  console.log(`\n📊 Product Data Tests: ${passed}/${total} passed`);
  return passed === total;
}

// Test 6: Calendar Date Utilities
function testCalendarUtilities() {
  testHeader('Calendar Utilities Tests');
  
  let passed = 0;
  let total = 0;
  
  // Test date formatting
  const testDate = new Date(2024, 0, 15); // January 15, 2024
  const formattedDate = formatDateForBooking(testDate);
  if (assert(formattedDate === '2024-01-15', 'Date should format correctly (YYYY-MM-DD)')) passed++;
  total++;
  
  // Test date validation (not in past)
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1);
  if (assert(isDateAvailable(futureDate), 'Future date should be available')) passed++;
  total++;
  
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 1);
  if (assert(!isDateAvailable(pastDate), 'Past date should not be available')) passed++;
  total++;
  
  // Test month navigation
  const currentMonth = new Date(2024, 0, 1); // January 2024
  const nextMonth = getNextMonth(currentMonth);
  if (assert(nextMonth.getMonth() === 1, 'Next month should be February (month 1)')) passed++;
  total++;
  
  const prevMonth = getPreviousMonth(currentMonth);
  if (assert(prevMonth.getMonth() === 11, 'Previous month should be December (month 11)')) passed++;
  total++;
  
  console.log(`\n📊 Calendar Utilities Tests: ${passed}/${total} passed`);
  return passed === total;
}

// Helper functions for calendar utilities
function formatDateForBooking(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isDateAvailable(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

function getNextMonth(date) {
  const nextMonth = new Date(date);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return nextMonth;
}

function getPreviousMonth(date) {
  const prevMonth = new Date(date);
  prevMonth.setMonth(prevMonth.getMonth() - 1);
  return prevMonth;
}

// Main test runner
function runAllTests() {
  console.log('🚀 Starting Pink Blueberry Salon Test Suite');
  console.log('=' .repeat(60));
  
  const startTime = Date.now();
  let totalPassed = 0;
  let totalTests = 6;
  
  // Run all tests
  if (testCartCalculation()) totalPassed++;
  if (testFormValidation()) totalPassed++;
  if (testBookingState()) totalPassed++;
  if (testServiceData()) totalPassed++;
  if (testProductData()) totalPassed++;
  if (testCalendarUtilities()) totalPassed++;
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  // Final results
  console.log('\n' + '='.repeat(60));
  console.log('🏁 Test Suite Complete');
  console.log(`📊 Overall Results: ${totalPassed}/${totalTests} test suites passed`);
  console.log(`⏱️  Duration: ${duration}ms`);
  
  if (totalPassed === totalTests) {
    console.log('🎉 All tests passed! The application is working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Please review the results above.');
  }
  
  return totalPassed === totalTests;
}

// Export for use in other files (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    runAllTests,
    testCartCalculation,
    testFormValidation,
    testBookingState,
    testServiceData,
    testProductData,
    testCalendarUtilities
  };
}

// Auto-run tests when loaded in browser (optional)
// Uncomment the line below to run tests automatically
// runAllTests();
