export type OrderStatus = "PAID" | "WAITING_PAYMENT" | "SHIPPED" | "CANCEL";
 
export type OrderItem = {
  product_name: string;
  quantity: number;
  unit_price: number;
  image_url?: string;
};
 
export type UserOrder = {
  order_id: string;
  created_at: Date;
  total_amount: number;
  order_status: OrderStatus;
  items: OrderItem[];
};