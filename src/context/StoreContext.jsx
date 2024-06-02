import { createContext, useEffect, useState } from "react";
import { food_list } from '../assets/assets'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url ="http://localhost:4000";
    const [token,setToken]=useState("")

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((pre) => ({ ...pre, [itemId]: 1 }))
        } else {
            setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId] + 1 }))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId] - 1 }))
    }

    const getTotalCartAmount = () => {
       // console.log(cartItems);
        let totalAmount = 0;
        for (const item in cartItems) {
           // console.log(item);
            if (cartItems[item] > 0) {
               // console.log(cartItems[item]);
                let itemInfo = food_list.find((product) => product._id === item );
                //console.log(itemInfo);
                
                totalAmount += itemInfo.price * cartItems[item]
            }

        }

        return totalAmount;
    }

    useEffect(()=>{
       if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
       }
    },[])


    const contextValue = {
        food_list,
        cartItems, setCartItems, addToCart, removeFromCart,getTotalCartAmount,url,token,setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider