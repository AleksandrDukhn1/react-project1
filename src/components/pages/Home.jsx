import React from 'react';
import Card from './Card';
import AppContext from '../../context'

function Home( { searchValue, setSearchValue, onChangeSearchInput, onAddToCart, isReady} ) {

  const { onAddFavorite, items } = React.useContext(AppContext);

  const renderItems = () => {
    const filtredItems = items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
    
    return (isReady ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card 
      key={index}
      onPlus={(obj) => onAddToCart(obj)}
      onFavorite={(obj) => onAddFavorite(obj)}
      loading={isReady}
      {...item} />
    ))
  }
    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" alt="Remove"src="/img/btn-remove.svg" />}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск" />
        </div>
        </div>
        <div className="d-flex flex-wrap">
          {renderItems()}
        </div>
      </div>
    );
}

export default Home;