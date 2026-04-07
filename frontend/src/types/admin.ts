// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole   = "USER" | "SELLER" | "ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED";
export type ShopStatus = "ACTIVE" | "PENDING" | "SUSPENDED";
export type OrderStatus = "PAID" | "CREATE" | "CANCEL";

export type AppUser = {
  user_id: string;
  user_name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  orders: number;
};

export type Shop = {
  shop_id: string;
  shop_name: string;
  owner: string;
  status: ShopStatus;
  created_at: string;
};

export type Order = {
  order_id: string;
  customer: string;
  amount: number;
  status: OrderStatus;
};

// ─── Style Configs ────────────────────────────────────────────────────────────

export const USER_ROLE_STYLE: Record<UserRole, { bg: string; text: string }> = {
  USER:   { bg: "bg-rose-50",   text: "text-rose-500"   },
  SELLER: { bg: "bg-pink-50",   text: "text-pink-500"   },
  ADMIN:  { bg: "bg-purple-50", text: "text-purple-500" },
};

export const USER_STATUS_STYLE: Record<UserStatus, { bg: string; text: string }> = {
  ACTIVE:    { bg: "bg-emerald-50", text: "text-emerald-600" },
  SUSPENDED: { bg: "bg-red-50",     text: "text-red-500"     },
};

export const SHOP_STATUS_STYLE: Record<ShopStatus, { bg: string; text: string; dot: string }> = {
  ACTIVE:    { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-400" },
  PENDING:   { bg: "bg-amber-50",   text: "text-amber-600",   dot: "bg-amber-400"   },
  SUSPENDED: { bg: "bg-red-50",     text: "text-red-500",     dot: "bg-red-400"     },
};

export const ORDER_STATUS_STYLE: Record<OrderStatus, { bg: string; text: string }> = {
  PAID:   { bg: "bg-emerald-50", text: "text-emerald-600" },
  CREATE: { bg: "bg-gray-50",    text: "text-gray-500"    },
  CANCEL: { bg: "bg-red-50",     text: "text-red-500"     },
};