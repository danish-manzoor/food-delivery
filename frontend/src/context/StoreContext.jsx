import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:5000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [coupon, setCoupon] = useState("");
  const addItemsToCart = async (itemId) => {
    if (token) {
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    } else {
      toast.warn("Please login first.");
    }
  };

  const removeItemFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let productInfo = food_list.find((product) => product._id === item);
        totalAmount += productInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };
  const loadCartData = async (token) => {
    let response = await axios.post(
      url + "/api/cart/list",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        loadCartData(localStorage.getItem("token"));
      }
    }

    loadData();
  }, []);

  const ContextValue = {
    food_list,
    addItemsToCart,
    removeItemFromCart,
    cartItems,
    getTotalCartAmount,
    url,
    token,
    setToken,
    setCoupon,
    coupon,
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
