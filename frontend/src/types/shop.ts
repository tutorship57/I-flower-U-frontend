export type ShopInfo = {
  shop_id: string;
  shop_name: string;
  shop_address: string;
  shop_phone: string;
  shop_open: number;
  shop_close: number;
  user: {
    user_id: string;
    user_name: string;
    user_email: string;
  };
};