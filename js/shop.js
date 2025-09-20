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
  let currentMember = null;

  // Membership validation functionality for shop
  function validateShopMembership() {
    const membershipInput = document.getElementById('shop-membership-number');
    const membershipNumber = membershipInput.value.trim().toUpperCase();
    const errorElement = document.getElementById('shop-membership-error');
    const successElement = document.getElementById('shop-membership-success');
    const membershipInfo = document.getElementById('shop-membership-info');
    const pointsPreview = document.getElementById('shop-points-preview');
    
    // Clear previous messages
    errorElement.textContent = '';
    successElement.style.display = 'none';
    membershipInfo.style.display = 'none';
    pointsPreview.style.display = 'none';
    
    if (!membershipNumber) {
      currentMember = null;
      updateCartDisplay();
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
      document.getElementById('shop-member-name').textContent = member.name;
      document.getElementById('shop-member-level').textContent = member.level;
      document.getElementById('shop-member-points').textContent = `${member.points} points`;
      membershipInfo.style.display = 'block';
      
      // Calculate and show points preview
      const cartTotal = getCartTotal();
      if (cartTotal > 0) {
        const points = membershipSystem.calculatePurchasePoints(cartTotal, member.level);
        document.getElementById('purchase-points').textContent = points;
        pointsPreview.style.display = 'block';
      }
    } else {
      currentMember = null;
      errorElement.textContent = 'Invalid membership number. Please check and try again.';
    }
    
    updateCartDisplay();
  }

  // Get cart total
  function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // --- PRODUCT RENDERING ---
  function renderProducts() {
    if (!productsContainer) return;
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
      const productCard = document.createElement('article');
      productCard.classList.add('card', 'product-card');
      productCard.innerHTML = `
        <img src="${product.imageUrl}" alt="Artisanal ${product.name} - handcrafted organic soap for luxury skincare" loading="lazy" style="background-color: #f3f4f6;" onerror="this.style.backgroundColor='#f9fafb'; this.alt='Image unavailable';">
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

  // Loading state functions
  function showButtonLoading(button, originalText) {
    button.disabled = true;
    button.innerHTML = `
      <span class="spinner">⏳</span> 
      ${originalText === 'Add to Cart' ? 'Adding...' : originalText === 'Checkout' ? 'Processing...' : 'Loading...'}
    `;
  }

  function hideButtonLoading(button, originalText) {
    button.disabled = false;
    button.innerHTML = originalText;
  }

  // --- CART FUNCTIONALITY ---
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Find the button that was clicked
    const button = document.querySelector(`[data-product-id="${productId}"]`);
    const originalText = button.innerHTML;
    
    showButtonLoading(button, 'Add to Cart');

    // Simulate brief loading for better UX
    setTimeout(() => {
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
      hideButtonLoading(button, originalText);
    }, 300);
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
      
      // Hide points preview if cart is empty
      const pointsPreview = document.getElementById('shop-points-preview');
      if (pointsPreview) pointsPreview.style.display = 'none';
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
    
    // Update points preview if member is validated
    if (currentMember && total > 0) {
      const points = membershipSystem.calculatePurchasePoints(total, currentMember.level);
      document.getElementById('purchase-points').textContent = points;
      document.getElementById('shop-points-preview').style.display = 'block';
    }
  }

  // --- GLOBAL FUNCTIONS (for onclick handlers) ---
  window.updateQuantity = updateQuantity;
  window.removeFromCart = removeFromCart;

  // --- CHECKOUT ---
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    const originalText = 'Checkout';
    showButtonLoading(checkoutBtn, originalText);
    
    // Simulate checkout processing
    setTimeout(() => {
      try {
        const total = getCartTotal();
        let pointsMessage = '';
        
        // Add points to member account if applicable
        if (currentMember && currentMember.id && total > 0) {
          const points = membershipSystem.calculatePurchasePoints(total, currentMember.level);
          const updatedMember = membershipSystem.addPoints(currentMember.id, points, 'purchase');
          if (updatedMember) {
            pointsMessage = `\n\nYou earned ${points} points! Your new balance: ${updatedMember.points} points.`;
            // Update currentMember reference
            currentMember.points = updatedMember.points;
            currentMember.level = updatedMember.level;
          }
        }
        
        alert(`Thank you for your purchase!\nTotal: ${cartTotalPrice.textContent}\nItems: ${cart.length}${pointsMessage}`);
        cart = [];
        updateCartDisplay();
        saveCartToStorage();
      } catch (error) {
        console.error('Checkout error:', error);
        alert('There was an error processing your order. Please try again.');
      } finally {
        hideButtonLoading(checkoutBtn, originalText);
      }
    }, 800);
  });

  // Add membership validation event listener
  document.getElementById('shop-validate-membership-btn').addEventListener('click', validateShopMembership);

  // --- INITIALIZATION ---
  loadCartFromStorage();
  renderProducts();
  updateCartDisplay();
});
