import { useEffect, useRef } from "react"
import { paymentService } from "../services/payment.service"
import { useCartStore } from "../stores/cart-store"

export const usePaymentRedirect = (order_id?: string | null, user_id?: string | null) => {
  const redirectedRef = useRef(false)

  useEffect(() => {
    if (!user_id || !order_id) return

    let attempts = 0

    const interval = setInterval(async () => {
      attempts++
      if (attempts > 5) {
        clearInterval(interval)
        return
      }

      const res = await paymentService.getPaymentByOrderId(order_id)
      console.log("💳 payment response:", JSON.stringify(res))
      if (!res.data || redirectedRef.current) return

      redirectedRef.current = true
      clearInterval(interval)
      console.log("🛒 before clear:", localStorage.getItem("cartItems"))
      // useCartStore.getState().clear()  // clear ตอน redirect 
      console.log("🛒 after clear:", localStorage.getItem("cartItems"))
      window.location.href = res.data.payment_url
    }, 2000)
    console.log("this is order id",order_id)

    return () => clearInterval(interval)
  }, [order_id, user_id])
}
