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
        <img src="${service.imageUrl}" alt="${service.name}">
        <h3>${service.name}</h3>
        <div class="details">
          <span>${service.duration} min</span>
        </div>
        <p>${service.description}</p>
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
        <img src="${product.imageUrl}" alt="${product.name}">
        <h3>${product.name}</h3>
      `;
      productCardsContainer.appendChild(card);
    });
  }

  // Initial render
  renderServicePreviews();
  renderProductPreviews();
});

