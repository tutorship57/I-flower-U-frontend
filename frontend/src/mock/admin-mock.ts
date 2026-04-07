import type { AppUser, Shop, Order } from "../../types/admin";

export const MOCK_USERS: AppUser[] = [
  { user_id: "U001", user_name: "Sarah Johnson", email: "sarah@email.com",  role: "USER",   status: "ACTIVE",    created_at: "2025-01-10", orders: 12 },
  { user_id: "U002", user_name: "Mike Chen",     email: "mike@email.com",   role: "SELLER", status: "ACTIVE",    created_at: "2025-01-15", orders: 3  },
  { user_id: "U003", user_name: "Emily Davis",   email: "emily@email.com",  role: "USER",   status: "ACTIVE",    created_at: "2025-02-01", orders: 7  },
  { user_id: "U004", user_name: "Anna Kim",      email: "anna@email.com",   role: "USER",   status: "SUSPENDED", created_at: "2025-02-14", orders: 1  },
  { user_id: "U005", user_name: "James Lee",     email: "james@email.com",  role: "SELLER", status: "ACTIVE",    created_at: "2025-02-20", orders: 0  },
  { user_id: "U006", user_name: "Yuki Tanaka",   email: "yuki@email.com",   role: "USER",   status: "ACTIVE",    created_at: "2025-03-01", orders: 4  },
  { user_id: "U007", user_name: "Chris Park",    email: "chris@email.com",  role: "USER",   status: "ACTIVE",    created_at: "2025-03-05", orders: 2  },
];

export const MOCK_SHOPS: Shop[] = [
  { shop_id: "S001", shop_name: "Rose Garden",      owner: "Emma W.",  status: "ACTIVE",    created_at: "2025-01-05" },
  { shop_id: "S002", shop_name: "Bloom House",      owner: "Chris L.", status: "ACTIVE",    created_at: "2025-01-12" },
  { shop_id: "S003", shop_name: "Petals & Co",      owner: "Nana T.",  status: "ACTIVE",    created_at: "2025-01-20" },
  { shop_id: "S004", shop_name: "Bloom & Wild Co.", owner: "Sarah K.", status: "PENDING",   created_at: "2025-03-20" },
  { shop_id: "S005", shop_name: "Sakura Florist",   owner: "Yuki T.",  status: "PENDING",   created_at: "2025-03-19" },
  { shop_id: "S006", shop_name: "Old Blooms",       owner: "Bob M.",   status: "SUSPENDED", created_at: "2024-12-01" },
];

export const MOCK_ORDERS: Order[] = [
  { order_id: "ORD-001", customer: "Sarah J.", amount: 890,  status: "PAID"   },
  { order_id: "ORD-002", customer: "Mike C.",  amount: 499,  status: "CREATE" },
  { order_id: "ORD-003", customer: "Emily D.", amount: 320,  status: "CREATE" },
  { order_id: "ORD-004", customer: "Anna K.",  amount: 1250, status: "PAID"   },
  { order_id: "ORD-005", customer: "James L.", amount: 599,  status: "CANCEL" },
];