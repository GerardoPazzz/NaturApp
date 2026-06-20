import StorageService from './storageService';

const BASE_URL = 'http://192.168.1.100:9090/api';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Espirulina Premium',
    description: 'Superalimento rico en proteínas y vitaminas del grupo B',
    price: 45.90,
    image: 'https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=400',
    category: 'superfoods',
    stock: 25,
    rating: 4.8,
    benefits: ['Alto en proteína', 'Vitamina B12', 'Antioxidantes'],
  },
  {
    id: '2',
    name: 'Aceite de Coco Virgen',
    description: 'Aceite de coco prensado en frío, 100% natural',
    price: 32.50,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
    category: 'aceites',
    stock: 40,
    rating: 4.9,
    benefits: ['Energía natural', 'Salud cardiovascular', 'Cocina saludable'],
  },
  {
    id: '3',
    name: 'Cápsulas de Cúrcuma',
    description: 'Antiinflamatorio natural en presentación de cápsulas',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400',
    category: 'capsulas',
    stock: 60,
    rating: 4.6,
    benefits: ['Antiinflamatorio', 'Antioxidante', 'Inmunidad'],
  },
  {
    id: '4',
    name: 'Té Verde Matcha',
    description: 'Té verde japonés en polvo de alta calidad',
    price: 55.00,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
    category: 'infusiones',
    stock: 30,
    rating: 4.7,
    benefits: ['Energía sostenida', 'Concentración', 'Metabolismo'],
  },
  {
    id: '5',
    name: 'Miel de Manuka',
    description: 'Miel premium con propiedades antibacterianas',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400',
    category: 'miel',
    stock: 15,
    rating: 4.9,
    benefits: ['Antibacteriano natural', 'Inmune', 'Digestivo'],
  },
  {
    id: '6',
    name: 'Maca Peruana',
    description: 'Raíz energética del Perú, potenciador natural',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    category: 'superfoods',
    stock: 50,
    rating: 4.5,
    benefits: ['Energía', 'Vitalidad', 'Equilibrio hormonal'],
  },
  {
    id: '7',
    name: 'Aceite de Lavanda',
    description: 'Aceite esencial puro para aromaterapia',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
    category: 'aceites',
    stock: 35,
    rating: 4.4,
    benefits: ['Relajante', 'Antiestrés', 'Sueño reparador'],
  },
  {
    id: '8',
    name: 'Vitamina C Natural',
    description: 'Cápsulas de acerola, fuente natural de vitamina C',
    price: 29.90,
    image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400',
    category: 'capsulas',
    stock: 45,
    rating: 4.6,
    benefits: ['Inmunidad', 'Colágeno', 'Antioxidante'],
  },
  {
    id: '9',
    name: 'Jalea Real',
    description: 'Suplemento natural de la abeja, rico en nutrientes',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400',
    category: 'superfoods',
    stock: 20,
    rating: 4.7,
    benefits: ['Energía', 'Sistema inmune', 'Vitalidad'],
  },
  {
    id: '10',
    name: 'Propóleo',
    description: 'Producto natural de las colmenas con propiedades antibióticas',
    price: 35.90,
    image: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400',
    category: 'superfoods',
    stock: 30,
    rating: 4.4,
    benefits: ['Antibacteriano', 'Antiinflamatorio', 'Cicatrizante'],
  },
  {
    id: '11',
    name: 'Té de Manzanilla',
    description: 'Infusión suave para la relajación y digestión',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
    category: 'infusiones',
    stock: 50,
    rating: 4.8,
    benefits: ['Relajante', 'Digestión', 'Antiinflamatorio'],
  },
  {
    id: '12',
    name: 'Jengibre Raíz',
    description: 'Raíz fresca de jengibre para cocinar o infusiones',
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400',
    category: 'superfoods',
    stock: 40,
    rating: 4.5,
    benefits: ['Antiinflamatorio', 'Digestión', 'Náuseas'],
  },
  {
    id: '13',
    name: 'Omega 3 Cápsulas',
    description: 'Suplemento de aceite de pescado rico en ácidos grasos',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400',
    category: 'capsulas',
    stock: 55,
    rating: 4.6,
    benefits: ['Corazón', 'Cerebro', 'Antiinflamatorio'],
  },
  {
    id: '14',
    name: 'Miel de Eucalipto',
    description: 'Miel con propiedades expectorantes y antibacterianas',
    price: 38.90,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400',
    category: 'miel',
    stock: 25,
    rating: 4.6,
    benefits: ['Garganta', 'Expectorante', 'Antiséptico'],
  },
  {
    id: '15',
    name: 'Valeriana Cápsulas',
    description: 'Suplemento natural para combatir el insomnio y estrés',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400',
    category: 'capsulas',
    stock: 40,
    rating: 4.3,
    benefits: ['Sueño', 'Relajante', 'Ansiedad'],
  },
  {
    id: '17',
    name: 'Clorofila Líquida',
    description: 'Suplemento detoxificante a base de clorofila natural',
    price: 38.50,
    image: 'https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=400',
    category: 'superfoods',
    stock: 30,
    rating: 4.4,
    benefits: ['Detox', 'Energía', 'Alcalinizante'],
  },
  {
    id: '18',
    name: 'Semillas de Chía',
    description: 'Semillas de chía orgánicas ricas en omega 3',
    price: 22.90,
    image: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400',
    category: 'superfoods',
    stock: 45,
    rating: 4.6,
    benefits: ['Omega 3', 'Fibra', 'Antioxidantes'],
  },
  {
    id: '19',
    name: 'Aceite de Ricino',
    description: 'Aceite vegetal para uso cosmético y digestivo',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
    category: 'aceites',
    stock: 40,
    rating: 4.2,
    benefits: ['Digestivo', 'Piel', 'Cabello'],
  },
  {
    id: '20',
    name: 'Aceite de Onagra',
    description: 'Aceite de onagra para equilibrar hormones',
    price: 35.90,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
    category: 'aceites',
    stock: 25,
    rating: 4.5,
    benefits: ['Hormonas', 'Piel', 'Antiinflamatorio'],
  },
  {
    id: '21',
    name: 'Multivitamínico Natural',
    description: 'Complejo vitamínico de frutas y verduras',
    price: 48.00,
    image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400',
    category: 'capsulas',
    stock: 50,
    rating: 4.7,
    benefits: ['Energía', 'Inmunidad', 'Vitalidad'],
  },
  {
    id: '22',
    name: 'Colágeno hidrolizado',
    description: 'Colágeno en polvo para piel y articulaciones',
    price: 55.90,
    image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400',
    category: 'capsulas',
    stock: 35,
    rating: 4.6,
    benefits: ['Piel', 'Articulaciones', 'Cabello'],
  },
  {
    id: '23',
    name: 'Té de Menta',
    description: 'Infusión fresca de menta para digestión',
    price: 15.90,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
    category: 'infusiones',
    stock: 55,
    rating: 4.8,
    benefits: ['Digestión', 'Respiratorio', ' Frescor'],
  },
  {
    id: '24',
    name: 'Té de Jengibre',
    description: 'Infusión cálida de jengibre para el inmunológico',
    price: 16.90,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
    category: 'infusiones',
    stock: 50,
    rating: 4.7,
    benefits: ['Inmunológico', 'Calentamiento', 'Digestión'],
  },
  {
    id: '25',
    name: 'Miel de Almendra',
    description: 'Miel suave con sabor a almendra',
    price: 42.90,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400',
    category: 'miel',
    stock: 20,
    rating: 4.5,
    benefits: ['Energía', 'Antioxidante', 'Suave'],
  },
  {
    id: '26',
    name: 'Miel de Romero',
    description: 'Miel monofloral de romero, digestiva y tonificante',
    price: 45.90,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400',
    category: 'miel',
    stock: 18,
    rating: 4.6,
    benefits: ['Digestiva', 'Hígado', 'Tonificante'],
  },
  {
    id: '27',
    name: 'Probióticos Cápsulas',
    description: 'Cápsulas con bacterias beneficiosas para el gut',
    price: 52.00,
    image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400',
    category: 'capsulas',
    stock: 40,
    rating: 4.8,
    benefits: ['Flora intestinal', 'Inmunidad', 'Digestión'],
  },
  {
    id: '29',
    name: 'Aceite de Árbol de Té',
    description: 'Aceite esencial antiséptico para piel',
    price: 21.90,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
    category: 'aceites',
    stock: 30,
    rating: 4.5,
    benefits: ['Antiséptico', 'Acné', 'Hongos'],
  },
  {
    id: '30',
    name: 'Té de Hibisco',
    description: 'Infusión de hibisco rica en vitamina C',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
    category: 'infusiones',
    stock: 45,
    rating: 4.6,
    benefits: ['Vitamina C', 'Presión arterial', 'Antioxidante'],
  },
];

const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    items: [
      { productId: '1', name: 'Espirulina Premium', price: 45.90, quantity: 2 },
      { productId: '4', name: 'Té Verde Matcha', price: 55.00, quantity: 1 },
    ],
    total: 146.80,
    status: 'entregado',
    date: '2026-06-10T14:30:00Z',
    address: 'Av. Lima 123, Lima',
  },
  {
    id: 'ORD-002',
    items: [
      { productId: '2', name: 'Aceite de Coco Virgen', price: 32.50, quantity: 1 },
    ],
    total: 32.50,
    status: 'procesando',
    date: '2026-06-15T09:15:00Z',
    address: 'Calle México 456, Lima',
  },
];

// Reserved for future backend connection
// eslint-disable-next-line no-unused-vars
async function request(endpoint, options = {}) {
  try {
    const token = await StorageService.getToken();
    const response = await fetch(
      `${BASE_URL}${endpoint}`,
      {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

const ApiService = {
  async getProducts(category = null) {
    await new Promise(r => setTimeout(r, 300));
    if (category && category !== 'todos') {
      return MOCK_PRODUCTS.filter(p => p.category === category);
    }
    return MOCK_PRODUCTS;
  },

  async getProductById(id) {
    await new Promise(r => setTimeout(r, 200));
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    if (!product) throw new Error('Producto no encontrado');
    return product;
  },

  async searchProducts(query) {
    await new Promise(r => setTimeout(r, 300));
    const q = query.toLowerCase();
    return MOCK_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  },

  async createOrder(orderData) {
    await new Promise(r => setTimeout(r, 500));
    const newOrder = {
      id: `ORD-${Date.now()}`,
      ...orderData,
      status: 'pendiente',
      date: new Date().toISOString(),
    };
    MOCK_ORDERS.push(newOrder);
    return newOrder;
  },

  async getOrders() {
    await new Promise(r => setTimeout(r, 300));
    return MOCK_ORDERS;
  },

  async getOrderById(id) {
    await new Promise(r => setTimeout(r, 200));
    const order = MOCK_ORDERS.find(o => o.id === id);
    if (!order) throw new Error('Pedido no encontrado');
    return order;
  },

  async login(email, password) {
    await new Promise(r => setTimeout(r, 500));
    if (email && password) {
      const user = { name: 'Usuario Demo', email };
      const token = 'mock_token_' + Date.now();
      await StorageService.saveToken(token);
      await StorageService.saveUserProfile(user.name, user.email);
      return { user, token };
    }
    throw new Error('Credenciales inválidas');
  },

  async getCategories() {
    return ['superfoods', 'aceites', 'capsulas', 'infusiones', 'miel'];
  },
};

export default ApiService;
