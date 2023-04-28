import React, { useState, useContext } from 'react';
import styles from './Card.module.css'
import ContentLoader from "react-content-loader"
import AppContext from '../../../context'

function Card({ onFavorite, onPlus,  name, url, price, favorited = false, id, addCart = false, loading = false }) {
    const { isAddedItem } = useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(favorited);
    const obj = {name, url, price, parentId: id};
   

    const onClickButton = () => {
        onPlus(obj);
    };

    const onClickFavorite = () => {
        onFavorite(obj);
        setIsFavorite(!isFavorite);
    };



    return (
        <div className={styles.card}>
            {loading ? 
            <ContentLoader 
            speed={2}
            width={150}
            height={187}
            viewBox="0 0 150 187"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
            <rect x="0" y="98" rx="5" ry="5" width="150" height="15" /> 
            <rect x="0" y="126" rx="5" ry="5" width="100" height="15" /> 
            <rect x="0" y="163" rx="5" ry="5" width="80" height="25" /> 
            <rect x="118" y="156" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>
          :
          <><div className={styles.favorite} onClick={onClickFavorite}>
                {onFavorite && <img alt="like" src={isFavorite ? '/img/like.svg' : '/img/unlike.svg'} />}
            </div>
                <img width={133} height={112} src={url} alt="sneakers"/>  
                <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                    {onPlus && <img className={styles.plus} onClick={onClickButton} alt="plus" src={isAddedItem(id) ? '/img/btn-cheked.svg' : '/img/btn-plus.svg'}/>}
            </div></>
          }
            
        </div>
    )
}

export default Card;