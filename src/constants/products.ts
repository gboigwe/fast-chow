import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  // Budget-Friendly Packages (Package A, B, C)
  {
    id: 'budget-a',
    name: 'Quick Refresh Package',
    description: 'Perfect for a quick snack break',
    price: 100,
    category: 'budget',
    items: ['Sachet water', 'Packet of biscuits (Shortcake/Digestive)'],
    image: '/images/packages/budget-a.jpg',
  },
  {
    id: 'budget-b',
    name: 'Energy Boost Package',
    description: 'Get energized with this combo',
    price: 200,
    category: 'budget',
    items: ['Gala (beef roll)', 'Soft drink (Coke/Pepsi/Fanta)'],
    image: '/images/packages/budget-b.jpg',
  },
  {
    id: 'budget-c',
    name: 'Morning Starter Package',
    description: 'Start your day right',
    price: 250,
    category: 'budget',
    items: ['Small loaf of bread', 'Sachet water', 'Small butter spread'],
    image: '/images/packages/budget-c.jpg',
  },

  // Middle-Class Packages (Package D, E, F)
  {
    id: 'middle-d',
    name: 'Premium Snack Package',
    description: 'Quality snacks for your break',
    price: 400,
    category: 'middle',
    items: ['Vega milk', 'Meat pie', 'Bottled water'],
    image: '/images/packages/middle-d.jpg',
  },
  {
    id: 'middle-e',
    name: 'Nutritious Combo',
    description: 'Healthy and delicious',
    price: 600,
    category: 'middle',
    items: ['Nutri milk', 'Sausage roll', 'Juice box'],
    image: '/images/packages/middle-e.jpg',
  },
  {
    id: 'middle-f',
    name: 'Complete Meal Package',
    description: 'Everything you need',
    price: 750,
    category: 'middle',
    items: ['Yogurt drink', 'Chicken roll', 'Fresh fruit (banana/apple)'],
    image: '/images/packages/middle-f.jpg',
  },

  // Bulk/Event Packages (Package G, H, I)
  {
    id: 'bulk-g',
    name: 'Drinks Party Package',
    description: 'Perfect for your party',
    price: 5000,
    category: 'bulk',
    items: ['50 bottles of soft drinks (mixed flavors)'],
    image: '/images/packages/bulk-g.jpg',
  },
  {
    id: 'bulk-h',
    name: 'Mega Snacks Package',
    description: 'Feed your entire event',
    price: 8000,
    category: 'bulk',
    items: ['100 meat pies', '100 small chops'],
    image: '/images/packages/bulk-h.jpg',
  },
  {
    id: 'bulk-i',
    name: 'Complete Event Package',
    description: 'Everything for your event',
    price: 15000,
    category: 'bulk',
    items: ['Cake', '200 drinks', '200 assorted snacks'],
    image: '/images/packages/bulk-i.jpg',
  },
];

export const CATEGORIES = {
  budget: {
    title: 'Budget-Friendly Packages',
    description: 'For students and quick, affordable snacks',
    priceRange: '100-300 XLM',
  },
  middle: {
    title: 'Middle-Class Packages',
    description: 'Better quality snacks and drinks',
    priceRange: '400-800 XLM',
  },
  bulk: {
    title: 'Bulk/Event Packages',
    description: 'For parties, meetings, and events',
    priceRange: '5,000+ XLM',
  },
};
