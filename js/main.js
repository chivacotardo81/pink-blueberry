document.addEventListener('DOMContentLoaded', () => {
  const serviceCardsContainer = document.getElementById('service-cards-preview');
  const productCardsContainer = document.getElementById('product-cards-preview');


  // Function to render service preview cards
  function renderServicePreviews() {
    if (!serviceCardsContainer) return;
    serviceCardsContainer.innerHTML = ''; // Clear existing cards
    services.slice(0, 3).forEach(service => {
      const card = document.createElement('article');
      card.classList.add('card', 'service-card');
      card.innerHTML = `
        <img src="${service.imageUrl}" alt="Professional ${service.name} service - luxury salon treatment" loading="lazy" style="background-color: #f3f4f6;" onerror="this.style.backgroundColor='#f9fafb'; this.alt='Image unavailable';">
        <h3>${service.name}</h3>
        <div class="details">
          <span class="service-price">$${service.price}</span>
          <span>${service.duration} min</span>
        </div>
        <p>${service.description}</p>
        <a href="booking.html" class="btn btn-primary">Book Now</a>
      `;
      serviceCardsContainer.appendChild(card);
    });
  }

  // Function to render product preview cards
  function renderProductPreviews() {
    if (!productCardsContainer) return;
    productCardsContainer.innerHTML = ''; // Clear existing cards
    products.slice(0, 4).forEach(product => {
      const card = document.createElement('article');
      card.classList.add('card', 'product-card');
      card.innerHTML = `
        <img src="${product.imageUrl}" alt="Artisanal ${product.name} - handcrafted organic soap for luxury skincare" loading="lazy" style="background-color: #f3f4f6;" onerror="this.style.backgroundColor='#f9fafb'; this.alt='Image unavailable';">
        <h3>${product.name}</h3>
        <div class="product-price">$${product.price}</div>
        <a href="shop.html" class="btn btn-primary">Shop Now</a>
      `;
      productCardsContainer.appendChild(card);
    });
  }

  // Initial render
  renderServicePreviews();
  renderProductPreviews();
});

