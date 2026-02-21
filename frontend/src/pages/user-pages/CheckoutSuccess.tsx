import { useEffect ,useState} from 'react'
import { CircleCheck } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { paymentService } from '../../services/payment.service';
import { orderItemsService } from '../../services/orderItem.service';
const CheckoutSuccess = () => {
    const [searchParams,] = useSearchParams();    
    const session_id = searchParams.get('session_id');
    const [,setOrderId] = useState<string | null>(null);
    const [,setOrderItems] = useState([]);

    useEffect(()=>{
        const init = async()=>{
            if(!session_id) return
            const PaymentResponse = await paymentService.getPaymentBySessionId(session_id);
            setOrderId(PaymentResponse.data.order_id);
            const OrderItemsResponse = await orderItemsService.getOrderItemsByOrderId(PaymentResponse.data.order_id);
            setOrderItems(OrderItemsResponse.data);
            console.log("this is data Order ",OrderItemsResponse.data);
        }
        init();
    },[session_id])
    

  return (
    <div className='flex justify-center items-center h-screen '>
        <div className='flex flex-col text-center bg-white rounded-lg p-8 h-auto justify-between shadow-md gap-4'>
            <div>
                <button className=' p-2 rounded-full text-green-400'><CircleCheck className='w-16 h-16'/></button>
            </div>
            <div className='flex flex-col '>
                <h1 className='text-3xl font-bold'>Thank you for your purchase</h1>
                <p className='text-xl opacity-30'>Your order has been successfully processed</p>
                <div className='mt-4 bg-rose-50  rounded-md p-4'>
                    <p className='text-lg'>Order ID: 123456789</p>
                    <p className='text-lg'>Order Date: 2022-01-01</p>
                    <p className='text-lg'>Order Total: $100.00</p>
                    <div className='flex flex-col gap-2 '>

                    </div>
                </div>
            </div>
            <div className='flex justify-center gap-4'>
                <button className='bg-gray-500 p-3 rounded-lg text-white hover:bg-gray-600'>Back to HomePage</button>
                <button className='bg-rose-500 p-3 rounded-lg text-white hover:bg-rose-600'>Continue Shopping</button>
            </div>
        </div>
    </div>
  )
}

export default CheckoutSuccess
