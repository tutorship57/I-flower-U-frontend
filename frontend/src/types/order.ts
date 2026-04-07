export type OrderStatus = "PAID" | "SHIPPED" | "WAITING_PAYMENT" | "CANCEL";

export type OrderItem = {
  product_name: string;
  quantity: number;
  unit_price: number;
  image_url?: string;
};

export type UserOrder = {
  order_id: string;
  created_at: string;
  order_status: OrderStatus;
  items: OrderItem[];
  total_amount: number;
};