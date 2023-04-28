import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Cart from "./components/Cart";
import Header from "./components/Header";
import axios from "axios";
import Home from './components/pages/Home';
import Favorites from "./components/pages/Favorites";
import AppContext from './context'
import Orders from "./components/pages/Orders";


function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isReady, setIsReady] = useState(true);

  React.useEffect(() => {
    async function fechData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([axios.get('https://6409cd15d16b1f3ed6dd57f5.mockapi.io/cart'), axios.get('https://6409cd15d16b1f3ed6dd57f5.mockapi.io/favorite'), axios.get('https://my.api.mockaroo.com/items.json?key=05f9fd00')])
        // const cartResponse = await axios.get('https://6409cd15d16b1f3ed6dd57f5.mockapi.io/cart');
        // const favoritesResponse = await axios.get('https://6409cd15d16b1f3ed6dd57f5.mockapi.io/favorite');
        // const itemsResponse = await axios.get('https://my.api.mockaroo.com/items.json?key=05f9fd00');
        setIsReady(false)
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch(error) {
        alert('Ошибка получения данных')
        console.error(error);
      }
    }
    fechData();
  }, []);

  const OpenCart = () => {
    setCartOpened(!cartOpened)
  };

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(el => Number(el.parentId) === Number(obj.parentId));
      if(findItem){
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.parentId)));
        await axios.delete(`https://6409cd15d16b1f3ed6dd57f5.mockapi.io/cart/${findItem.id}`);
      } else {
        const { data } = await axios.post('https://6409cd15d16b1f3ed6dd57f5.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в корзину')
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6409cd15d16b1f3ed6dd57f5.mockapi.io/cart/${id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
    } catch(error) {
      alert('Не удалось удалить товар');
      console.error(error);
    }
  };

  const onAddFavorite = async (obj) => {
    try {
      const findItem = favorites.find(el => Number(el.parentId) === Number(obj.parentId));
      if(findItem){
        axios.delete(`https://6409cd15d16b1f3ed6dd57f5.mockapi.io/favorite/${findItem.parentId}`);
        setFavorites(prev => prev.filter(item => Number(item.parentId) !== Number(obj.parentId)));
      } else {
        const { data } = await axios.post('https://6409cd15d16b1f3ed6dd57f5.mockapi.io/favorite', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в закладки');
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  };

  const isAddedItem = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={{ cartItems, favorites, items, isAddedItem, onAddFavorite, onAddToCart, setCartOpened, setCartItems }}>
    <div className="wrapper">
      {cartOpened && <Cart onRemove={onRemoveItem} offClickCart={OpenCart} items={cartItems}/>}
      
      <Header onClickCart={OpenCart} onClickFavorites={OpenCart} />
        <Routes>
          <Route path="/" exact 
          element={<Home 
                  searchValue={searchValue} 
                  setSearchValue={setSearchValue}
                  onChangeSearchInput={onChangeSearchInput}
                  onAddToCart={onAddToCart}
                  isReady={isReady}
                   />}>
          </Route>
          <Route path="/favorites" exact element={<Favorites />}>
          </Route>
          <Route path="/orders" exact element={<Orders />}>
          </Route>
        </Routes>
      
    </div>
    </AppContext.Provider>
    );
}

export default App;
