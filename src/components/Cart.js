import React from "react";
import axios from "axios";
import Info from "./Info";
import AppContext from '../context';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Cart({ onRemove, offClickCart, items = [] }) {
    const { cartItems, setCartItems } = React.useContext(AppContext)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
    const feePrice = Math.round(totalPrice / 100 * 5);
    const onClickOrder = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.post('https://6409cd15d16b1f3ed6dd57f5.mockapi.io/favorite', {items: cartItems});
        
        setOrderId(data.id)
        setIsOrderComplete(true)
        setCartItems([])
        
        for (let i = 0; i < cartItems.length; i++) {
          const item = cartItems[i];
          await axios.delete('https://6409cd15d16b1f3ed6dd57f5.mockapi.io/cart/' + item.id);
          await delay(1000);
        }
      } catch (error) {
        alert('Не удалось создать заказ!');
      }
      setIsLoading(false)
    };

    return (
        <div className="overlay">
        <div className="drawer">
          <h2 className="d-flex justify-between mb-30">Корзина <img onClick={offClickCart} className="removeBtn cu-p" alt="Remove"src="/img/btn-remove.svg" /></h2>

          {
            items.length > 0 ?
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                  <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <img style={{backgroundImage: `url(${obj.url})`}} className="mr-20 cartItemImg" alt=""/>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img onClick={() => {onRemove(obj.id)}} className="removeBtn" alt="Remove"src="/img/btn-remove.svg" />
                </div>
                ))}
          </div>
          <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>{totalPrice} руб.</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>{feePrice} руб.</b>
            </li>
          </ul>
          <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/img/errow.svg" alt="errow" /></button>
          </div>
          </div>
          : 
          <Info title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"} 
          description={isOrderComplete ? `"Ваш заказ #${orderId} скоро будет передан курьерской доставке"` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} 
          image={isOrderComplete ? "/img/order-complete.jpg" : "/img/empty-cart.jpg"} />
          }
        </div>
        </div>
    )
}

export default Cart;