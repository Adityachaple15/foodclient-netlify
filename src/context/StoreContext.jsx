// StoreContext.jsx
import { createContext, useEffect, useState, useMemo } from "react";
import { fetchFoodList } from "../service/foodService";
import {
  addToCart,
  getCartData,
  removeQtyFromCart,
  clearCartItems, // ✅ IMPORT
} from "../service/cartService";

export const StoreContext = createContext();

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // ================= TOKEN SYNC =================
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // ================= ADD TO CART =================
  const increaseQty = async (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1,
    }));

    try {
      await addToCart(foodId, token);
    } catch (err) {
      console.error(err);
      setQuantities((prev) => ({
        ...prev,
        [foodId]: (prev[foodId] || 1) - 1,
      }));
    }
  };

  // ================= REMOVE QTY =================
  const decreaseQty = async (foodId) => {
    setQuantities((prev) => {
      const current = prev[foodId] || 0;
      if (current <= 1) {
        const { [foodId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [foodId]: current - 1 };
    });

    try {
      await removeQtyFromCart(foodId, token);
    } catch (err) {
      console.error(err);
      setQuantities((prev) => ({
        ...prev,
        [foodId]: (prev[foodId] || 0) + 1,
      }));
    }
  };

  // ================= CLEAR CART (🔥 FIX) =================
  const clearCart = async () => {
    try {
      await clearCartItems();   // ✅ NO PARAM
      setQuantities({});        // ✅ UI clear
    } catch (err) {
      console.error("Error while clearing cart", err);
      alert("Error while clearing cart");
    }
  };



  // ================= LOAD CART =================
  const loadCartData = async (tok) => {
    try {
      const items = await getCartData(tok);
      setQuantities(items || {});
    } catch (err) {
      console.error("Failed to load cart data", err);
      setQuantities({});
    }
  };

  // ================= LOAD DATA =================
  useEffect(() => {
    const loadData = async () => {
      try {
        setFoodList(await fetchFoodList());
        if (token) await loadCartData(token);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, []);

  const contextValue = useMemo(
    () => ({
      foodList,
      quantities,
      increaseQty,
      decreaseQty,
      clearCart, // ✅ EXPOSE
      token,
      setToken,
      setQuantities,
      loadCartData,
    }),
    [foodList, quantities, token]
  );

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
