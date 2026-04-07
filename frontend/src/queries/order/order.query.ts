import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../services/order.service";
import { type UserOrder } from "../../types/user-order";


// export const useOrdersQuery = (userId: string) => {
//   return useQuery<UserOrder[]>({
//     queryKey: ["orders", userId],
//     queryFn: async () => {
//       const res = await orderService.getOrdersByUserId(userId);
//       return res.data; // assume API returns { data: UserOrder[] }
//     },
//     refetchOnWindowFocus: false,
//     staleTime: 5 * 60 * 1000, // cache 5 นาที
//   });
// };

// const fetchOrders = async () => {
//   const res = await fetch("http://localhost:3000/api/order/", {
//     credentials: "include"  // ส่ง cookie session ไปด้วย
//   })
//   const data = await res.json()
//   console.log("📦 orders response:", JSON.stringify(data.data?.[0], null, 2))
//   return data.data
// }

// export const useOrders = () =>
//   useQuery({
//     queryKey: ["orders"],
//     queryFn: fetchOrders,
//   })

// หลังแก้

// export const useOrders = (shopId: string) =>
// //   useQuery({
// //     queryKey: ["orders"],
// //     queryFn: fetchOrders,
// //   })
// useQuery({
//     queryKey: ["orders", shopId], 
//     queryFn: () => fetchOrders(shopId),
//     enabled: !!shopId, 
//   })

// const fetchOrders = async () => {
//   try {
//     // const res = await fetch("http://localhost:3000/api/order/", {
//     //   credentials: "include"
//     // })
//     const res = await fetch(`http://localhost:3000/api/shop/${shopId}/orders`, {
//         credentials: "include"
//     })
//     const data = await res.json()
//     const orders = data.data ?? []

//     const ordersWithItems = await Promise.all(
//       orders.map(async (order: any) => {
//         try {
//           const itemsRes = await fetch(`http://localhost:3000/api/order/${order.order_id}/items/`, {
//             credentials: "include"
//           })
//           const itemsData = await itemsRes.json()
//           return {
//             ...order,
//             items: (itemsData.data ?? []).map((item: any) => ({
//               product_name: item.product?.product_name,
//               image_url: item.product?.productImage?.[0]?.image_url,
//               quantity: item.quantity,
//               unit_price: item.unit_price,
//             }))
//           }
//         } catch (err) {
//           console.error("items fetch error:", err)
//           return { ...order, items: [] }
//         }
//       })
//     )
//     return ordersWithItems
//   } catch (err) {
//     console.error("orders fetch error:", err)
//     return []
//   }
// }

// หลังแก้ — user history (ไม่ต้อง shopId)
// หลังแก้
export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrders(""),
  })

export const useShopOrders = (shopId: string) =>
  useQuery({
    queryKey: ["shop-orders", shopId],
    queryFn: () => fetchOrders(shopId),
    enabled: !!shopId,
  })

const fetchOrders = async (shopId: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/order/", {
      credentials: "include"
    })
    const data = await res.json()
    const allOrders = data.data ?? []
    const shopOrders = allOrders.filter((order: any) => order.shop_id === shopId || !shopId);

    const ordersWithItems = await Promise.all(
      shopOrders.map(async (order: any) => {
        try {
          const itemsRes = await fetch(`http://localhost:3000/api/order/${order.order_id}/items/`, {
            credentials: "include"
          })
          if (!itemsRes.ok) return null
          const itemsData = await itemsRes.json()
          return {
            ...order,
            items: (itemsData.data ?? []).map((item: any) => ({
              product_name: item.product?.product_name,
              image_url: item.product?.productImage?.[0]?.image_url,
              quantity: item.quantity,
              unit_price: item.unit_price,
            }))
          }
        } catch (err: any) {
        if (err?.status === 403 || err?.response?.status === 403) {
            return null  
        }
        return { ...order, items: [] }
        }
      })
    )
    return ordersWithItems.filter(Boolean)
  } catch (err) {
    return []
  }
}