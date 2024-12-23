import React, { useContext, useState } from 'react'
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
const FoodItem = ({id,name,price,description,image}) => {
    // const [itemCount, setItemCount] = useState(0);
    const {cartItems, addItemsToCart, removeItemFromCart, url} = useContext(StoreContext);
  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img src={url+"/images/"+image}  alt="" className='food-item-image' />
            {!cartItems[id]
            ?<img src={assets.add_icon_white} onClick={()=>addItemsToCart(id)} alt="" className="add" />
            :<div className="food-item-counter">
                <img src={assets.remove_icon_red} onClick={()=>removeItemFromCart(id)} alt="" />
                <p>{cartItems[id]}</p>
                <img src={assets.add_icon_green} onClick={()=>addItemsToCart(id)} alt="" />
            </div>
            
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className='food-item-desc'>{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem