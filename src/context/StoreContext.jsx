// StoreContext.jsx
import { createContext, useEffect, useState, useMemo } from "react";
import { fetchFoodList } from "../service/foodService";
import {
  addToCart,
  getCartData,
  removeQtyFromCart,
} from "../service/cartService";

export const StoreContext = createContext({
  foodList: [],
  quantities: {},
  increaseQty: () => {},
  decreaseQty: () => {},
  removeFromCart: () => {},
  token: "",
  setToken: () => {},
  setQuantities: () => {},
  loadCartData: () => {},
});

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  // Sync token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const increaseQty = async (foodId) => {
    // Optimistic update
    setQuantities((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1,
    }));
    try {
      await addToCart(foodId, token);
    } catch (err) {
      // rollback on failure
      setQuantities((prev) => {
        const current = prev[foodId] || 1;
        if (current <= 1) {
          const { [foodId]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [foodId]: current - 1 };
      });
      console.error("Failed to add to cart:", err);
    }
  };

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
      // rollback on failure: increment back
      setQuantities((prev) => ({
        ...prev,
        [foodId]: (prev[foodId] || 0) + 1,
      }));
      console.error("Failed to remove from cart:", err);
    }
  };

  const removeFromCart = (foodId) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[foodId];
      return updatedQuantities;
    });
  };

  const loadCartData = async (tok) => {
    try {
      const items = await getCartData(tok);
      if (items && typeof items === "object") {
        setQuantities(items);
      } else {
        setQuantities({});
      }
    } catch (err) {
      console.error("Failed to load cart data:", err);
      setQuantities({});
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchFoodList();
        setFoodList(data);
      } catch (err) {
        console.error("Failed to fetch food list:", err);
      }

      if (token) {
        await loadCartData(token);
      }
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  const contextValue = useMemo(
    () => ({
      foodList,
      increaseQty,
      decreaseQty,
      quantities,
      removeFromCart,
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
