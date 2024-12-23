import React, { useContext, useEffect, useState } from 'react'
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
const Cart = () => {

  const {setCoupon,coupon, cartItems, food_list, removeItemFromCart, getTotalCartAmount, url } = useContext(StoreContext)
  const navigate = useNavigate();
  const [data,setData] = useState("");
  const handleChange = (event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}));
  }

  const handleSubmitPromoCode = (e)=>{
    e.preventDefault();
    setCoupon(data.promocode);
  }
 
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p className='cross' onClick={()=>removeItemFromCart(item._id)}>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-title-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-title-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-title-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button onClick={()=>(navigate('/order'))}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promo-code">
            <div>
              <p>If you have promo code, Enter it here</p>
              <form onSubmit={handleSubmitPromoCode}>
              <div className="cart-promocode-input">
                <input type="text" onChange={handleChange} name="promocode" value={data.promocode}  placeholder='Promo code'/>
                <button>Submit</button>
              </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cart