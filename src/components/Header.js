import React from 'react'
import { Link } from 'react-router-dom';

import AppContext from '../context'

function Header(props) {

  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
    return (
        <header className="p-40">
          <Link to="/">
        <div className="headerLeft">
            <img alt="logo" width={40} height={40} src="/img/logo.png" />
            <div>
              <h3 className="text-uppercase">react Sneakers</h3>
              <p className="opacity-5">Магазин лучших кроссовок</p>
            </div>
        </div>
        </Link>
        <ul className="headerRight">
          <li className="mr-30 cu-p" onClick={props.onClickCart}>
          <img alt="cart" width={18} height={18} src="/img/cart.svg" />      
            <span>{totalPrice}</span>
          </li>
          <li>
          <Link to="/favorites"><img className="cu-p mr-20" alt="favorite" width={18} height={18} src="/img/favorite.svg" /></Link>
          </li>
          <li>
          <Link to="/orders"><img alt="user" width={18} height={18} src="/img/user.svg" /></Link>
          </li>
        </ul>
      </header>
    )
}

export default Header;