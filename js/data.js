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
    price: 12,
    category: "Organic Soap",
    description: "Handcrafted calming soap",
    imageUrl: "images/lavander_oatmilk.png"
  },
  {
    id: 2,
    name: "Charcoal & Tea Tree Detox Soap",
    price: 14,
    category: "Organic Soap",
    description: "Deep cleansing detox soap",
    imageUrl: "images/Charcoal_&_Tea_Tree_Detox_Soap.png"
  },
  {
    id: 3,
    name: "Citrus & Honey Brightening Soap",
    price: 13,
    category: "Organic Soap",
    description: "Brightening citrus soap",
    imageUrl: "images/Citrus_&_Honey_Brightening_Soap.png"
  },
  {
    id: 4,
    name: "Rose & Shea Butter Moisturizing Bar",
    price: 15,
    category: "Organic Soap",
    description: "Moisturizing rose soap",
    imageUrl: "images/Rose_&_Shea_Butter_Moisturizing_Bar.png"
  }
];

const stylists = [
  { id: 1, name: 'Sarah', role: 'Senior Stylist' },
  { id: 2, name: 'Jessica', role: 'Art Director' },
  { id: 3, name: 'Emily', role: 'Junior Stylist' }
];

const bookedDates = {
  '2024-12-25': 'unavailable',
  '2024-12-26': 'limited',
  '2024-12-31': 'limited',
  '2025-01-01': 'unavailable'
};

const REWARDS_CONFIG = {
  points: {
    booking: {
      perDollar: 1,
      firstTimeBonus: 50,
      referralBonus: 100
    },
    products: {
      perDollar: 1,
      bonusThreshold: 50,
      bonusMultiplier: 1.5
    }
  },
  
  redemption: [
    { points: 100, discount: 10, description: "$10 off next service" },
    { points: 250, discount: 25, description: "$25 off next service" },
    { points: 500, discount: 60, description: "$60 off next service" },
    { points: 1000, discount: 150, description: "$150 off next service" }
  ],
  
  membershipLevels: [
    { name: "Bronze", minPoints: 0, color: "#cd7f32", multiplier: 1.0 },
    { name: "Silver", minPoints: 500, color: "#c0c0c0", multiplier: 1.2 },
    { name: "Gold", minPoints: 1500, color: "#ffd700", multiplier: 1.5 },
    { name: "Platinum", minPoints: 3000, color: "#e5e4e2", multiplier: 2.0 }
  ]
};

// Mock membership database (in real app, this would be backend)
const mockMembers = {
  'M001': { id: 'M001', name: 'Sarah Johnson', points: 320, level: 'Bronze', joinDate: '2024-01-15' },
  'M002': { id: 'M002', name: 'Maria Garcia', points: 750, level: 'Silver', joinDate: '2023-11-20' },
  'M003': { id: 'M003', name: 'Jessica Chen', points: 1200, level: 'Silver', joinDate: '2023-08-10' },
  'M999': { id: 'M999', name: 'Demo User', points: 0, level: 'Bronze', joinDate: '2024-12-01' }
};
