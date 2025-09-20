const services = [
  {
    id: 1,
    name: "Signature Cut & Style",
    price: 75,
    duration: 60,
    description: "A customized haircut and professional styling for a fresh, new look.",
    imageUrl: "images/signature_cut_&_style.png"
  },
  {
    id: 2,
    name: "Full Color",
    price: 150,
    duration: 120,
    description: "A single-process color application from roots to ends for a vibrant, uniform color.",
    imageUrl: "images/full_color.png"
  },
  {
    id: 3,
    name: "Balayage",
    price: 250,
    duration: 180,
    description: "Hand-painted highlights for a natural, sun-kissed look with a soft grow-out.",
    imageUrl: "images/balayage.png"
  }
];

const products = [
  {
    id: 1,
    name: "Lavender & Oatmeal Calming Bar",
    imageUrl: "images/lavander_oatmilk.png"
  },
  {
    id: 2,
    name: "Charcoal & Tea Tree Detox Soap",
    imageUrl: "images/Charcoal_&_Tea_Tree_Detox_Soap.png"
  },
  {
    id: 3,
    name: "Citrus & Honey Brightening Soap",
    imageUrl: "images/Citrus_&_Honey_Brightening_Soap.png"
  },
  {
    id: 4,
    name: "Rose & Shea Butter Moisturizing Bar",
    imageUrl: "images/Rose_&_Shea_Butter_Moisturizing_Bar.png"
  }
];

const stylists = [
  { id: 1, name: 'Sarah', role: 'Senior Stylist' },
  { id: 2, name: 'Jessica', role: 'Art Director' },
  { id: 3, name: 'Emily', role: 'Junior Stylist' }
];

const bookedDates = {
  // YYYY-MM-DD format
  '2025-10-05': 'fully-booked', // Example for current year
  '2025-10-12': 'limited',
  '2025-10-18': 'fully-booked',
  '2025-10-25': 'limited',
};
