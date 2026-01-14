export const generateMockData = () => {
  const categories = [
    { category_id: 1, category_name: 'Bouquets' },
    { category_id: 2, category_name: 'Sets' },
    { category_id: 3, category_name: 'Accessories' },
    { category_id: 4, category_name: 'Vases' },
    { category_id: 5, category_name: 'Gift Boxes' }
  ];

  const colors = [
    { color_id: 1, color_name: 'Red' },
    { color_id: 2, color_name: 'Pink' },
    { color_id: 3, color_name: 'White' },
    { color_id: 4, color_name: 'Yellow' },
    { color_id: 5, color_name: 'Purple' }
  ];

  const tagEvents = [
    { tag_id: 1, tag_event_name: 'Valentine' },
    { tag_id: 2, tag_event_name: 'Mother\'s Day' },
    { tag_id: 3, tag_event_name: 'Wedding' },
    { tag_id: 4, tag_event_name: 'Birthday' },
    { tag_id: 5, tag_event_name: 'Sale' }
  ];

  const products = [
    {
      product_id: '1',
      product_name: 'Rose Bouquet Deluxe',
      product_description: 'Premium red roses arrangement',
      product_price: 89.99,
      product_stock: 15,
      category_id: 1,
      colors: [1, 2],
      tags: [1, 4],
      images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400'],
      sold: 245
    },
    {
      product_id: '2',
      product_name: 'Spring Tulip Set',
      product_description: 'Colorful tulip collection',
      product_price: 65.00,
      product_stock: 8,
      category_id: 2,
      colors: [2, 4],
      tags: [4],
      images: ['https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400'],
      sold: 198
    },
    {
      product_id: '3',
      product_name: 'Carnation Love',
      product_description: 'Sweet carnation bouquet',
      product_price: 45.50,
      product_stock: 23,
      category_id: 1,
      colors: [2, 3],
      tags: [1],
      images: ['https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400'],
      sold: 176
    },
    {
      product_id: '4',
      product_name: 'Ceramic Vase Pink',
      product_description: 'Elegant ceramic vase',
      product_price: 32.00,
      product_stock: 5,
      category_id: 4,
      colors: [2],
      tags: [],
      images: ['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400'],
      sold: 142
    },
    {
      product_id: '5',
      product_name: 'Sunflower Smile',
      product_description: 'Bright sunflower arrangement',
      product_price: 52.00,
      product_stock: 2,
      category_id: 1,
      colors: [4],
      tags: [4, 5],
      images: ['https://images.unsplash.com/photo-1597848212624-e530bb09f013?w=400'],
      sold: 89
    }
  ];

  const orders = [
    {
      order_id: '1',
      user_name: 'Sarah Johnson',
      total_amount: 89.99,
      order_status: 'PAID',
      created_at: new Date('2025-01-01'),
      items: [{ product_name: 'Rose Bouquet Deluxe', quantity: 1, unit_price: 89.99 }]
    },
    {
      order_id: '2',
      user_name: 'Michael Chen',
      total_amount: 130.00,
      order_status: 'WAITING_PAYMENT',
      created_at: new Date('2025-01-02'),
      items: [{ product_name: 'Spring Tulip Set', quantity: 2, unit_price: 65.00 }]
    },
    {
      order_id: '3',
      user_name: 'Emily Davis',
      total_amount: 45.50,
      order_status: 'CREATE',
      created_at: new Date('2025-01-03'),
      items: [{ product_name: 'Carnation Love', quantity: 1, unit_price: 45.50 }]
    }
  ];

  const shop = {
    shop_id: '1',
    shop_name: 'Bloom Market',
    shop_address: '123 Flower Street, Bangkok, Thailand',
    shop_phone: '+66 123 456 789',
    shop_open: 540,
    shop_close: 1290,
    user: {
      user_name: 'John Smith',
      user_email: 'john@bloommarket.com'
    }
  };

  return { categories, colors, tagEvents, products, orders, shop };
};

