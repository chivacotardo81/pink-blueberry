<div align="center">
  <img src="images/logo.png" alt="Pink Blueberry Salon Logo" width="150">
  
  # 🌸 The Pink Blueberry Salon
  
  **Luxury Salon & Artisanal Soap Shop**
  
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  
  *A modern, responsive web application for a luxury salon featuring appointment booking and artisanal soap shopping*
</div>

---

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [👥 Team Information](#-team-information)
- [✨ Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Setup Instructions](#-setup-instructions)
- [📱 Application Navigation](#-application-navigation)
- [🏗️ Project Structure](#️-project-structure)
- [📸 Screenshots](#-screenshots)
- [⚠️ Known Issues](#️-known-issues)
- [🔮 Future Enhancements](#-future-enhancements)
- [📞 Contact Information](#-contact-information)

---

## 🎯 Project Overview

The Pink Blueberry Salon is a comprehensive web application designed for a luxury salon and artisanal soap shop. The project features a modern, responsive design with three main sections: a homepage showcasing services and products, a complete appointment booking system, and an e-commerce shop for handcrafted soaps.

---

## 👥 Team Information

| Role | Contributor | Responsibilities |
|------|-------------|------------------|
| **Lead Developer** | Development Team | Full-stack development, UI/UX design |
| **Designer** | Creative Team | Brand identity, visual design, user experience |
| **Product Owner** | Pink Blueberry Salon | Business requirements, content strategy |

---

## ✨ Features

### 🏠 Homepage
- [x] Responsive hero section with brand logo
- [x] Service preview cards with real images
- [x] Featured artisanal soap products
- [x] Professional navigation system
- [x] Contact information footer

### 📅 Booking System
- [x] Multi-step appointment booking flow
- [x] Service selection with pricing
- [x] Interactive calendar with availability indicators
- [x] Time slot selection
- [x] Stylist preference options
- [x] Customer information form with validation
- [x] Real-time booking summary
- [x] Form validation and error handling

### 🛒 E-commerce Shop
- [x] Product catalog for artisanal soaps
- [x] Shopping cart functionality
- [x] Add/remove items with quantity controls
- [x] Real-time price calculation
- [x] Checkout process
- [x] Responsive product grid

### 🎨 Design & UX
- [x] Mobile-first responsive design
- [x] Consistent brand colors and typography
- [x] Smooth transitions and hover effects
- [x] Accessible navigation
- [x] Professional color scheme (#F6F4F2 hero background)

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with Flexbox and Grid
- **Vanilla JavaScript** - Interactive functionality and DOM manipulation

### Design
- **Custom CSS Variables** - Consistent theming
- **Responsive Design** - Mobile-first approach
- **Modern UI Components** - Cards, buttons, forms

### Assets
- **Custom Images** - Service and product photography
- **Brand Logo** - Professional salon branding
- **Icon System** - Consistent visual language

---

## 🚀 Setup Instructions

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Local web server (optional but recommended)

### Installation & Running

#### Option 1: Direct File Access
1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd pink-blueberry
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your preferred browser
   open index.html
   ```

#### Option 2: Local Server (Recommended)
1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd pink-blueberry
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Access the application**
   ```
   http://localhost:8000
   ```

### Testing the Application
1. **Homepage Testing**
   - Verify all images load correctly
   - Test navigation links
   - Check responsive behavior

2. **Booking System Testing**
   - Select different services
   - Navigate through calendar months
   - Test form validation
   - Complete a full booking flow

3. **Shop Testing**
   - Add items to cart
   - Modify quantities
   - Test checkout process

---

## 📱 Application Navigation

### Main Pages
- **Homepage** (`index.html`) - Service previews and featured products
- **Booking** (`booking.html`) - Complete appointment booking system
- **Shop** (`shop.html`) - Artisanal soap e-commerce

### Navigation Flow
```
Homepage → Book Now → Booking System
Homepage → Shop → Product Catalog → Cart → Checkout
Any Page → Navigation Menu → Other Sections
```

---

## 🏗️ Project Structure

```
pink-blueberry/
├── 📄 index.html              # Homepage
├── 📄 booking.html            # Appointment booking page
├── 📄 shop.html               # E-commerce shop page
├── 📄 README.md               # Project documentation
├── 📁 styles/
│   └── 📄 main.css            # Main stylesheet
├── 📁 js/
│   ├── 📄 data.js             # Service and product data
│   ├── 📄 main.js             # Homepage functionality
│   ├── 📄 booking.js          # Booking system logic
│   └── 📄 shop.js             # Shopping cart functionality
├── 📁 images/
│   ├── 🖼️ logo.png            # Brand logo
│   ├── 🖼️ signature_cut_&_style.png
│   ├── 🖼️ full_color.png
│   ├── 🖼️ balayage.png
│   ├── 🖼️ lavander_oatmilk.png
│   ├── 🖼️ Charcoal_&_Tea_Tree_Detox_Soap.png
│   └── 🖼️ Citrus_&_Honey_Brightening_Soap.png
├── 📁 docs/                   # Documentation
└── 📁 tests/                  # Test files
```

---

## 📸 Screenshots

### Homepage
*Clean, professional layout showcasing services and products*

### Booking System
*Multi-step appointment booking with calendar integration*

### Shop
*E-commerce interface for artisanal soap products*

---

## ⚠️ Known Issues

- Calendar availability is currently simulated with sample data
- Booking confirmations are displayed via browser alerts (not persistent)
- Shop checkout process shows confirmation alerts (no payment integration)
- No backend database integration (all data is client-side)

---

## 🔮 Future Enhancements

### Phase 1: Backend Integration
- [ ] Database integration for appointments and orders
- [ ] Real-time availability checking
- [ ] Email confirmation system
- [ ] Admin dashboard for managing bookings

### Phase 2: Enhanced Features
- [ ] User account system with login/registration
- [ ] Appointment history and management
- [ ] Payment gateway integration
- [ ] Inventory management for products
- [ ] Customer reviews and ratings

### Phase 3: Advanced Functionality
- [ ] SMS notifications for appointments
- [ ] Online consultation booking
- [ ] Loyalty program integration
- [ ] Social media integration
- [ ] Multi-language support

### Phase 4: Mobile App
- [ ] React Native mobile application
- [ ] Push notifications
- [ ] Offline booking capability
- [ ] GPS integration for location services

---

## 📞 Contact Information

### Pink Blueberry Salon
- **Phone:** (123) 456-7890
- **Email:** contact@pinkblueberry.com
- **Address:** 123 Beauty Lane, Style City, ST 12345

### Development Team
- **Project Repository:** [GitHub Repository]
- **Issues & Support:** [GitHub Issues]
- **Documentation:** [Project Wiki]

---

<div align="center">
  <p><strong>Made with 💖 for The Pink Blueberry Salon</strong></p>
  <p><em>Luxury Beauty • Artisanal Quality • Professional Service</em></p>
</div>
