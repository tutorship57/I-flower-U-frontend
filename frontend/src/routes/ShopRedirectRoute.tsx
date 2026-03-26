import { Navigate, useParams, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/auth-store';
import { useEffect } from 'react';

// const ShopRedirectRoute = () => {
//   const { shopId } = useParams(); // This checks if a shopId is already in the URL
//   const { user, role, shop_id, loading, fetchCurrentUser } = useAuthStore(); 

//   useEffect(() => {
//     fetchCurrentUser();
//   }, [fetchCurrentUser]);

//   if (loading) return <div>Loading...</div>;

//   // 1. Guard Clause: Not logged in or not a seller
//   if (!user || role !== 'SELLER') {
//     return <Navigate to="/login" replace />;
//   }

//   // 2. Logic: If we are just at "/shop" (no shopId in URL), redirect to their specific shop
//   if (!shopId) {
//     return <Navigate to={`/shop/${shop_id}`} replace />;
//   }
  
//   // 3. IMPORTANT: If we ALREADY have a shopId in the URL, render the children!
//   return <Outlet context={shopId}/>; 
// };

const ShopRedirectRoute = () => {
  const { shopId } = useParams(); 
  const { user, role, shop_id, loading, fetchCurrentUser } = useAuthStore(); 

  useEffect(() => {
    const init = async ()=>{
      await fetchCurrentUser()
    }
    init()
  }, []);

  useEffect(() => {
  console.log('this is user', user, role, shop_id)
}, [user, role, shop_id])

  if (loading) return <div>Loading...</div>;

  if (!user || role !== 'SELLER') {
    return <Navigate to="/login" replace />;
  }


  if (!shopId) {
    return <Navigate to={`/shop/${shop_id}`} replace />;
  }
  
  return <Outlet />; 
};

export default ShopRedirectRoute;