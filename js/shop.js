// Cart persistence functions
function saveCartToStorage() {
  try {
    localStorage.setItem('pinkblueberry_cart', JSON.stringify(cart));
  } catch (error) {
    console.warn('Could not save cart to storage:', error);
  }
}

function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem('pinkblueberry_cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (error) {
    console.warn('Could not load cart from storage:', error);
    cart = []; // Reset to empty cart if corrupted
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // --- CACHE DOM ELEMENTS ---
  const productsContainer = document.getElementById('products-container');
  const cartItems = document.getElementById('cart-items');
  const cartTotalPrice = document.getElementById('cart-total-price');
  const checkoutBtn = document.getElementById('checkout-btn');

  // --- CART STATE ---
  let cart = [];

  // --- PRODUCT RENDERING ---
  function renderProducts() {
    if (!productsContainer) return;
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
      const productCard = document.createElement('article');
      productCard.classList.add('card', 'product-card');
      productCard.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="product-price">$${product.price}</div>
        <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">
          Add to Cart
        </button>
      `;
      productsContainer.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.productId);
        addToCart(productId);
      });
    });
  }

  // --- CART FUNCTIONALITY ---
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }

    updateCartDisplay();
    saveCartToStorage();
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToStorage();
  }

  function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
      if (newQuantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = newQuantity;
        updateCartDisplay();
        saveCartToStorage();
      }
    }
  }

  function updateCartDisplay() {
    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
      cartTotalPrice.textContent = '$0';
      checkoutBtn.disabled = true;
      return;
    }

    let cartHTML = '';
    let total = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      cartHTML += `
        <div class="cart-item">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <span class="cart-item-price">$${item.price} each</span>
          </div>
          <div class="cart-item-controls">
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">×</button>
          </div>
        </div>
      `;
    });

    cartItems.innerHTML = cartHTML;
    cartTotalPrice.textContent = `$${total}`;
    checkoutBtn.disabled = false;
  }

  // --- GLOBAL FUNCTIONS (for onclick handlers) ---
  window.updateQuantity = updateQuantity;
  window.removeFromCart = removeFromCart;

  // --- CHECKOUT ---
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    alert(`Thank you for your purchase!\nTotal: ${cartTotalPrice.textContent}\nItems: ${cart.length}`);
    cart = [];
    updateCartDisplay();
    saveCartToStorage();
  });

  // --- INITIALIZATION ---
  loadCartFromStorage();
  renderProducts();
  updateCartDisplay();
});
