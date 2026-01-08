export const orders = [
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

