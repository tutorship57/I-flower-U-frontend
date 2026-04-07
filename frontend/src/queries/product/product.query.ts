import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/product-service/product";    

export const useProducts =()=>{ 
    return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const productRes = await productService.getProducts();
      return productRes.data;
    },
    refetchOnWindowFocus: true,
    staleTime: 0 ,
    gcTime: 0
})};


//แก้ใหม่
// import { useQuery } from "@tanstack/react-query";

// const fetchShopProducts = async (shopId: string) => {
//   try {
//     const res = await fetch(`http://localhost:3000/api/product/shop/${shopId}`, {
//       credentials: "include"
//     });
//     const result = await res.json();
//     const products = result.data ?? [];
//     const detailedProducts = await Promise.all(
//       products.map(async (product: any) => {
//         try {
//           const imgRes = await fetch(`http://localhost:3000/api/product/${product.product_id}/images/`, {
//             credentials: "include"
//           });
//           const imgData = await imgRes.json();
//           return {
//             ...product,
//             productImage: imgData.data ?? [], 
//           };
//         } catch (err) {
//           return { ...product, productImage: [] };
//         }
//       })
//     );
//     return detailedProducts;
//   } catch (err) {
//     console.error("❌ fetchShopProducts error:", err);
//     return [];
//   }
// };

// export const useShopProducts = (shopId: string) => {
//   return useQuery({
//     queryKey: ["products", shopId],
//     queryFn: () => fetchShopProducts(shopId),
//     enabled: !!shopId, 
//     refetchOnWindowFocus: true,
//   });
// };



// import { useQuery } from "@tanstack/react-query";
// import { productImageService } from "../../services/product-service/product-image.service";
// import { productColorService } from "../../services/product-service/product-color.service";
// import { productTagsService } from "../../services/product-service/product-tag.service";

// const fetchProductsData = async (shopId?: string) => {
//   try {
//     // เลือก URL ตามสถานการณ์: ถ้ามี shopId ใช้เส้น shop ถ้าไม่มีใช้เส้นรวม
//     const url = shopId 
//       ? `http://localhost:3000/api/product/shop/${shopId}`
//       : `http://localhost:3000/api/product/`;

//     const res = await fetch(url, { credentials: "include" });
//     const result = await res.json();
//     const products = result.data ?? [];

//     // ดึงข้อมูลเสริม (Images, Colors, Tags) มาประกอบร่างเหมือนเดิม
//     return await Promise.all(
//       products.map(async (product: any) => {
//         const productId = product.product_id;
//         try {
//           const [images, colors, tags] = await Promise.all([
//             productImageService.getImages(productId).catch(() => ({ data: [] })),
//             productColorService.getColors(productId).catch(() => ({ data: [] })),
//             productTagsService.getProductTags(productId).catch(() => ({ data: [] }))
//           ]);
//           return {
//             ...product,
//             productImage: images.data ?? [],
//             productColors: colors.data ?? [],
//             productTagEvent: tags.data ?? [],
//           };
//         } catch {
//           return { ...product, productImage: [], productColors: [], productTagEvent: [] };
//         }
//       })
//     );
//   } catch (err) {
//     return [];
//   }
// };

// // ใช้ชื่อเดิม (useProducts) เพื่อไม่ให้ไฟล์อื่นพัง
// export const useProducts = (shopId?: string) => {
//   return useQuery({
//     queryKey: ["products", shopId], // แยก Cache ตาม shopId
//     queryFn: () => fetchProductsData(shopId),
//     refetchOnWindowFocus: true,
//   });
// };

// import { useQuery } from "@tanstack/react-query";
// import { productImageService } from "../../services/product-service/product-image.service";
// import { productColorService } from "../../services/product-service/product-color.service";
// import { productTagsService } from "../../services/product-service/product-tag.service";
// const fetchProductsData = async (shopId?: string) => {
//   try {
//     const url = shopId 
//       ? `http://localhost:3000/api/product/shop/${shopId}`
//       : `http://localhost:3000/api/product/`;

//     const res = await fetch(url, { credentials: "include" });
//     const result = await res.json();
//     const products = result.data ?? [];

//     // ดึงข้อมูลเสริมเฉพาะของสินค้าแต่ละตัว (เพื่อให้ Tag/Color ล็อคตามจริง)
//     const detailedProducts = await Promise.all(
//       products.map(async (product: any) => {
//         const productId = product.product_id;
//         try {
//           const [images, colors, tags] = await Promise.all([
//             productImageService.getImages(productId).catch(() => ({ data: [] })),
//             productColorService.getColors(productId).catch(() => ({ data: [] })),
//             productTagsService.getProductTags(productId).catch(() => ({ data: [] }))
//           ]);
          
//           return {
//             ...product,
//             productImage: images.data ?? [],
//             productColors: colors.data ?? [], // เฉพาะสีของสินค้านี้
//             productTagEvent: tags.data ?? [], // เฉพาะแท็กของสินค้านี้
//           };
//         } catch {
//           return { ...product, productImage: [], productColors: [], productTagEvent: [] };
//         }
//       })
//     );
//     return detailedProducts;
//   } catch (err) {
//     console.error("Fetch error:", err);
//     return [];
//   }
// };

// export const useProducts = (shopId?: string) => {
//   return useQuery({
//     queryKey: ["products", shopId],
//     queryFn: () => fetchProductsData(shopId),
//     refetchOnWindowFocus: true,
//   });
// };