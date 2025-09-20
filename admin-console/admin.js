// Pink Blueberry Admin Console - Complete JavaScript Functionality
const mockData = {
    services: [
        { id: 1, name: 'Signature Cut & Style', price: 75, category: 'cuts', description: 'Corte personalizado con peinado profesional', duration: '60 min', status: 'active' },
        { id: 2, name: 'Balayage Color', price: 150, category: 'color', description: 'Técnica de coloración natural y moderna', duration: '180 min', status: 'active' },
        { id: 3, name: 'Deep Conditioning Treatment', price: 45, category: 'treatments', description: 'Tratamiento intensivo para cabello dañado', duration: '45 min', status: 'active' },
        { id: 4, name: 'Wedding Updo', price: 120, category: 'styling', description: 'Peinado elegante para ocasiones especiales', duration: '90 min', status: 'active' },
        { id: 5, name: 'Keratin Treatment', price: 200, category: 'treatments', description: 'Alisado y nutrición profunda del cabello', duration: '240 min', status: 'active' },
        { id: 6, name: 'Highlights & Lowlights', price: 130, category: 'color', description: 'Mechas y reflejos para dar dimensión', duration: '150 min', status: 'active' }
    ],
    products: [
        { id: 1, name: 'Lavender & Mint Refreshing Soap', price: 12, category: 'Organic Soap', stock: 25, lowStock: 10 },
        { id: 2, name: 'Rose & Shea Butter Moisturizing Bar', price: 15, category: 'Organic Soap', stock: 8, lowStock: 10 },
        { id: 3, name: 'Charcoal & Tea Tree Detox Soap', price: 14, category: 'Organic Soap', stock: 18, lowStock: 10 },
        { id: 4, name: 'Citrus & Honey Brightening Soap', price: 13, category: 'Organic Soap', stock: 22, lowStock: 10 },
        { id: 5, name: 'Oatmeal & Vanilla Gentle Cleanser', price: 11, category: 'Organic Soap', stock: 30, lowStock: 10 },
        { id: 6, name: 'Coconut & Lime Energizing Bar', price: 12, category: 'Organic Soap', stock: 5, lowStock: 10 },
        { id: 7, name: 'Argan Oil Hair Serum', price: 28, category: 'Hair Care', stock: 15, lowStock: 5 },
        { id: 8, name: 'Keratin Repair Shampoo', price: 24, category: 'Hair Care', stock: 20, lowStock: 5 },
        { id: 9, name: 'Deep Moisture Conditioner', price: 22, category: 'Hair Care', stock: 18, lowStock: 5 },
        { id: 10, name: 'Volumizing Hair Mousse', price: 19, category: 'Hair Care', stock: 12, lowStock: 5 },
        { id: 11, name: 'Heat Protection Spray', price: 16, category: 'Hair Care', stock: 25, lowStock: 5 },
        { id: 12, name: 'Curl Defining Cream', price: 21, category: 'Hair Care', stock: 3, lowStock: 5 }
    ],
    customers: [
        { id: 1, name: 'María González', email: 'maria@email.com', phone: '555-0101', segment: 'vip', totalSpent: 850, lastVisit: '2025-01-15' },
        { id: 2, name: 'Ana Rodríguez', email: 'ana@email.com', phone: '555-0102', segment: 'regular', totalSpent: 320, lastVisit: '2025-01-10' },
        { id: 3, name: 'Carmen López', email: 'carmen@email.com', phone: '555-0103', segment: 'new', totalSpent: 75, lastVisit: '2025-01-18' },
        { id: 4, name: 'Isabel Martín', email: 'isabel@email.com', phone: '555-0104', segment: 'regular', totalSpent: 450, lastVisit: '2025-01-12' },
        { id: 5, name: 'Sofía Hernández', email: 'sofia@email.com', phone: '555-0105', segment: 'at_risk', totalSpent: 200, lastVisit: '2024-12-01' },
        { id: 6, name: 'Lucía Jiménez', email: 'lucia@email.com', phone: '555-0106', segment: 'vip', totalSpent: 1200, lastVisit: '2025-01-16' }
    ],
    bookings: [
        { id: 1, customerName: 'María González', service: 'Balayage Color', stylist: 'Sarah Mitchell', date: '2025-01-20', time: '10:00', status: 'confirmed', price: 150 },
        { id: 2, customerName: 'Ana Rodríguez', service: 'Signature Cut & Style', stylist: 'Maria Garcia', date: '2025-01-20', time: '14:00', status: 'confirmed', price: 75 },
        { id: 3, customerName: 'Carmen López', service: 'Deep Conditioning Treatment', stylist: 'James Chen', date: '2025-01-20', time: '16:00', status: 'in_progress', price: 45 },
        { id: 4, customerName: 'Isabel Martín', service: 'Wedding Updo', stylist: 'Sarah Mitchell', date: '2025-01-21', time: '09:00', status: 'confirmed', price: 120 },
        { id: 5, customerName: 'Sofía Hernández', service: 'Keratin Treatment', stylist: 'Maria Garcia', date: '2025-01-21', time: '11:00', status: 'pending', price: 200 },
        { id: 6, customerName: 'Lucía Jiménez', service: 'Highlights & Lowlights', stylist: 'James Chen', date: '2025-01-22', time: '13:00', status: 'confirmed', price: 130 }
    ],
    activities: [
        { type: 'booking', description: 'New booking: María González - Balayage Color', time: '10:30 AM', icon: '📅' },
        { type: 'customer', description: 'New customer registered: Carmen López', time: '09:15 AM', icon: '👤' },
        { type: 'product', description: 'Low stock: Curl Defining Cream (3 units)', time: '08:45 AM', icon: '📦' },
        { type: 'booking', description: 'Booking completed: Ana Rodríguez - Signature Cut', time: '08:00 AM', icon: '✅' },
        { type: 'system', description: 'Automatic backup completed', time: '07:00 AM', icon: '💾' }
    ]
};

let currentData = { ...mockData };
let currentFilters = {
    services: { category: 'all', search: '' },
    products: { category: 'all', stock: 'all' },
    customers: { segment: 'all', search: '' },
    bookings: { date: '', status: 'all', stylist: 'all' }
};

document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
});

function initializeAdmin() {
    updateLastUpdate();
    loadDashboardData();
    loadServicesData();
    loadProductsData();
    loadCustomersData();
    loadBookingsData();
    
    const today = new Date().toISOString().split('T')[0];
    const bookingDateFilter = document.getElementById('booking-date-filter');
    if (bookingDateFilter) {
        bookingDateFilter.value = today;
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    
    switch(sectionId) {
        case 'dashboard': loadDashboardData(); break;
        case 'catalogs': loadServicesData(); loadProductsData(); break;
        case 'customers': loadCustomersData(); break;
        case 'bookings': loadBookingsData(); break;
    }
}

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabId}-tab`).classList.add('active');
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
}

function goToMainSite() {
    window.open('/', '_blank');
}

function updateLastUpdate() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    document.getElementById('lastUpdate').textContent = timeString;
}

function loadDashboardData() {
    const todayBookings = currentData.bookings.filter(b => b.date === '2025-01-20').length;
    const todayRevenue = currentData.bookings
        .filter(b => b.date === '2025-01-20' && b.status === 'completed')
        .reduce((sum, b) => sum + b.price, 0);
    
    document.getElementById('todayBookings').textContent = todayBookings;
    document.getElementById('todayRevenue').textContent = `$${todayRevenue.toLocaleString()}`;
    document.getElementById('totalCustomers').textContent = currentData.customers.length;
    
    const lowStockCount = currentData.products.filter(p => p.stock <= p.lowStock).length;
    document.getElementById('lowStock').textContent = lowStockCount;
    
    loadRecentActivities();
}

function loadRecentActivities() {
    const container = document.getElementById('recentActivities');
    if (!container) return;
    
    let html = '';
    currentData.activities.forEach(activity => {
        html += `
            <div class="activity-item" style="display: flex; align-items: center; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--gray-200);">
                <span style="font-size: 1.5rem;">${activity.icon}</span>
                <div style="flex: 1;">
                    <p style="margin: 0; font-weight: 500; color: var(--gray-800);">${activity.description}</p>
                    <p style="margin: 0; font-size: 0.875rem; color: var(--gray-600);">${activity.time}</p>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function loadServicesData() {
    const container = document.getElementById('services-grid');
    if (!container) return;
    
    let filteredServices = currentData.services;
    if (currentFilters.services.category !== 'all') {
        filteredServices = filteredServices.filter(s => s.category === currentFilters.services.category);
    }
    if (currentFilters.services.search) {
        filteredServices = filteredServices.filter(s => 
            s.name.toLowerCase().includes(currentFilters.services.search.toLowerCase())
        );
    }
    
    let html = '';
    filteredServices.forEach(service => {
        html += `
            <div class="item-card">
                <h3>${service.name}</h3>
                <p><strong>Price:</strong> $${service.price}</p>
                <p><strong>Duration:</strong> ${service.duration}</p>
                <p><strong>Category:</strong> ${service.category}</p>
                <p>${service.description}</p>
                <div class="actions">
                    <button class="btn-secondary" onclick="editService(${service.id})">Edit</button>
                    <button class="btn-danger" onclick="deleteService(${service.id})">Delete</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function loadProductsData() {
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    let filteredProducts = currentData.products;
    if (currentFilters.products.category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === currentFilters.products.category);
    }
    if (currentFilters.products.stock === 'low') {
        filteredProducts = filteredProducts.filter(p => p.stock <= p.lowStock);
    }
    
    let html = '';
    filteredProducts.forEach(product => {
        const isLowStock = product.stock <= product.lowStock;
        html += `
            <div class="item-card ${isLowStock ? 'low-stock' : ''}">
                <h3>${product.name}</h3>
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Stock:</strong> ${product.stock} units</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <div class="actions">
                    <button class="btn-secondary" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn-success" onclick="updateStock(${product.id})">Stock</button>
                    <button class="btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function loadCustomersData() {
    const container = document.getElementById('customers-grid');
    if (!container) return;
    
    let filteredCustomers = currentData.customers;
    if (currentFilters.customers.segment !== 'all') {
        filteredCustomers = filteredCustomers.filter(c => c.segment === currentFilters.customers.segment);
    }
    if (currentFilters.customers.search) {
        filteredCustomers = filteredCustomers.filter(c => 
            c.name.toLowerCase().includes(currentFilters.customers.search.toLowerCase())
        );
    }
    
    const segments = currentData.customers.reduce((acc, customer) => {
        acc[customer.segment] = (acc[customer.segment] || 0) + 1;
        return acc;
    }, {});
    
    document.getElementById('newCustomers').textContent = segments.new || 0;
    document.getElementById('regularCustomers').textContent = segments.regular || 0;
    document.getElementById('vipCustomers').textContent = segments.vip || 0;
    document.getElementById('atRiskCustomers').textContent = segments.at_risk || 0;
    
    let html = '';
    filteredCustomers.forEach(customer => {
        const segmentClass = `status-${customer.segment}`;
        html += `
            <div class="item-card">
                <h3>${customer.name}</h3>
                <p><strong>Email:</strong> ${customer.email}</p>
                <p><strong>Phone:</strong> ${customer.phone}</p>
                <p><strong>Segment:</strong> <span class="${segmentClass}">${customer.segment.toUpperCase()}</span></p>
                <p><strong>Total spent:</strong> $${customer.totalSpent}</p>
                <p><strong>Last visit:</strong> ${customer.lastVisit}</p>
                <div class="actions">
                    <button class="btn-secondary" onclick="editCustomer(${customer.id})">Edit</button>
                    <button class="btn-success" onclick="viewCustomerHistory(${customer.id})">History</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function loadBookingsData() {
    const container = document.getElementById('bookings-grid');
    if (!container) return;
    
    let filteredBookings = currentData.bookings;
    if (currentFilters.bookings.date) {
        filteredBookings = filteredBookings.filter(b => b.date === currentFilters.bookings.date);
    }
    if (currentFilters.bookings.status !== 'all') {
        filteredBookings = filteredBookings.filter(b => b.status === currentFilters.bookings.status);
    }
    if (currentFilters.bookings.stylist !== 'all') {
        filteredBookings = filteredBookings.filter(b => b.stylist === currentFilters.bookings.stylist);
    }
    
    const today = '2025-01-20';
    const todayBookings = currentData.bookings.filter(b => b.date === today);
    const statusCounts = currentData.bookings.reduce((acc, booking) => {
        acc[booking.status] = (acc[booking.status] || 0) + 1;
        return acc;
    }, {});
    
    document.getElementById('todayBookingsDetail').textContent = todayBookings.length;
    document.getElementById('confirmedBookings').textContent = statusCounts.confirmed || 0;
    document.getElementById('completedBookings').textContent = statusCounts.completed || 0;
    document.getElementById('pendingBookings').textContent = statusCounts.pending || 0;
    
    let html = '';
    filteredBookings.forEach(booking => {
        const statusClass = `status-${booking.status}`;
        html += `
            <div class="item-card">
                <h3>${booking.customerName}</h3>
                <p><strong>Service:</strong> ${booking.service}</p>
                <p><strong>Stylist:</strong> ${booking.stylist}</p>
                <p><strong>Date:</strong> ${booking.date}</p>
                <p><strong>Time:</strong> ${booking.time}</p>
                <p><strong>Status:</strong> <span class="${statusClass}">${booking.status.toUpperCase()}</span></p>
                <p><strong>Price:</strong> $${booking.price}</p>
                <div class="actions">
                    <button class="btn-secondary" onclick="editBooking(${booking.id})">Edit</button>
                    <button class="btn-success" onclick="completeBooking(${booking.id})">Complete</button>
                    <button class="btn-danger" onclick="cancelBooking(${booking.id})">Cancel</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Filter functions
function filterServices() {
    currentFilters.services.category = document.getElementById('service-filter').value;
    loadServicesData();
}

function searchServices() {
    currentFilters.services.search = document.getElementById('service-search').value;
    loadServicesData();
}

function filterProducts() {
    currentFilters.products.category = document.getElementById('product-filter').value;
    currentFilters.products.stock = document.getElementById('stock-filter').value;
    loadProductsData();
}

function filterCustomers() {
    currentFilters.customers.segment = document.getElementById('customer-segment-filter').value;
    loadCustomersData();
}

function searchCustomers() {
    currentFilters.customers.search = document.getElementById('customer-search').value;
    loadCustomersData();
}

function filterBookings() {
    currentFilters.bookings.date = document.getElementById('booking-date-filter').value;
    currentFilters.bookings.status = document.getElementById('booking-status-filter').value;
    currentFilters.bookings.stylist = document.getElementById('booking-stylist-filter').value;
    loadBookingsData();
}

// Modal functions
function showModal(title, content) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = content;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Quick actions
function quickAddBooking() {
    showModal('New Booking', `
        <div style="margin-bottom: 1rem;">
            <label>Customer:</label>
            <input type="text" id="booking-customer" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
        </div>
        <div style="margin-bottom: 1rem;">
            <label>Service:</label>
            <select id="booking-service" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
                ${currentData.services.map(s => `<option value="${s.name}">${s.name} - $${s.price}</option>`).join('')}
            </select>
        </div>
        <div style="margin-bottom: 1rem;">
            <label>Date:</label>
            <input type="date" id="booking-date" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
        </div>
        <button onclick="saveQuickBooking()" class="btn-primary">Save Booking</button>
    `);
}

function quickAddCustomer() {
    showModal('New Customer', `
        <div style="margin-bottom: 1rem;">
            <label>Name:</label>
            <input type="text" id="customer-name" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
        </div>
        <div style="margin-bottom: 1rem;">
            <label>Email:</label>
            <input type="email" id="customer-email" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
        </div>
        <div style="margin-bottom: 1rem;">
            <label>Phone:</label>
            <input type="tel" id="customer-phone" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
        </div>
        <button onclick="saveQuickCustomer()" class="btn-primary">Save Customer</button>
    `);
}

function quickUpdateStock() {
    const lowStockProducts = currentData.products.filter(p => p.stock <= p.lowStock);
    let content = '<h4>Low Stock Products:</h4>';
    lowStockProducts.forEach(product => {
        content += `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--gray-200);">
                <div>
                    <strong>${product.name}</strong><br>
                    <small>Current stock: ${product.stock} units</small>
                </div>
                <button class="btn-success" onclick="updateProductStock(${product.id})">Update</button>
            </div>
        `;
    });
    showModal('Update Stock', content);
}

function addService() {
    showModal('New Service', `
        <div style="margin-bottom: 1rem;">
            <label>Name:</label>
            <input type="text" id="service-name" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
        </div>
        <div style="margin-bottom: 1rem;">
            <label>Price:</label>
            <input type="number" id="service-price" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
        </div>
        <div style="margin-bottom: 1rem;">
            <label>Category:</label>
            <select id="service-category" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
                <option value="cuts">Cuts</option>
                <option value="color">Color</option>
                <option value="treatments">Treatments</option>
                <option value="styling">Styling</option>
            </select>
        </div>
        <button onclick="saveNewService()" class="btn-primary">Save Service</button>
    `);
}

function addProduct() {
    showModal('New Product', `
        <div style="margin-bottom: 1rem;">
            <label>Name:</label>
            <input type="text" id="product-name" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
        </div>
        <div style="margin-bottom: 1rem;">
            <label>Price:</label>
            <input type="number" id="product-price" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
        </div>
        <div style="margin-bottom: 1rem;">
            <label>Stock:</label>
            <input type="number" id="product-stock" style="width: 100%; padding: 0.5rem; margin-top: 0.25rem;">
        </div>
        <button onclick="saveNewProduct()" class="btn-primary">Save Product</button>
    `);
}

function addCustomer() {
    quickAddCustomer();
}

function addBooking() {
    quickAddBooking();
}

// Save functions (demo purposes)
function saveQuickBooking() {
    alert('Booking saved successfully (demo)');
    closeModal();
}

function saveQuickCustomer() {
    alert('Customer saved successfully (demo)');
    closeModal();
}

function saveNewService() {
    alert('Service saved successfully (demo)');
    closeModal();
}

function saveNewProduct() {
    alert('Product saved successfully (demo)');
    closeModal();
}

// Placeholder functions for demo
function editService(id) { alert(`Edit service ${id} (demo)`); }
function deleteService(id) { alert(`Delete service ${id} (demo)`); }
function editProduct(id) { alert(`Edit product ${id} (demo)`); }
function deleteProduct(id) { alert(`Delete product ${id} (demo)`); }
function updateStock(id) { alert(`Update stock product ${id} (demo)`); }
function updateProductStock(id) { alert(`Update stock product ${id} (demo)`); }
function editCustomer(id) { alert(`Edit customer ${id} (demo)`); }
function viewCustomerHistory(id) { alert(`View customer history ${id} (demo)`); }
function editBooking(id) { alert(`Edit booking ${id} (demo)`); }
function completeBooking(id) { alert(`Complete booking ${id} (demo)`); }
function cancelBooking(id) { alert(`Cancel booking ${id} (demo)`); }
