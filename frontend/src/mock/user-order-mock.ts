export const userOrders: UserOrder[] = [
  {
    order_id: "ORD-20250215-002",
    created_at: new Date("2025-02-15T14:20:00"),
    total_amount: 998,
    order_status: "SHIPPED",
    items: [
      {
        product_name: "Spring Tulip Set",
        quantity: 2,
        unit_price: 499,
        image_url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200&q=80",
      },
    ],
  },
  {
    order_id: "ORD-20250210-003",
    created_at: new Date("2025-02-10T09:15:00"),
    total_amount: 320,
    order_status: "WAITING_PAYMENT",
    items: [
      {
        product_name: "Sunflower Smile",
        quantity: 1,
        unit_price: 320,
        image_url: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=200&q=80",
      },
    ],
  },
  {
    order_id: "ORD-20250115-005",
    created_at: new Date("2025-01-15T11:00:00"),
    total_amount: 599,
    order_status: "CANCEL",
    items: [
      {
        product_name: "Spring Tulip Set",
        quantity: 1,
        unit_price: 599,
        image_url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200&q=80",
      },
    ],
  },
];