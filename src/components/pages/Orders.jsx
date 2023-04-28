import React from 'react';
import axios from 'axios';
import Card from './Card';

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isReady, setIsReady] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
              const { data } = await axios.get('https://6409cd15d16b1f3ed6dd57f5.mockapi.io/favorite');
              setOrders(data.filter((item) => item.items).reduce((prev, obj) => [...prev, ...obj.items], []));
              setIsReady(false)
            } catch (err) {
              alert('Не удалось получить список заказов');
              console.error(err);
            }
        })();
    }, [])
  
    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
        </div>
        <div className="d-flex flex-wrap">
        {(isReady ? [...Array(8)] : orders).map((item, index) => (
              <Card 
              key={index}
              loading={isReady}
              {...item} />
            ))}
        </div>
      </div>
    );
}

export default Orders;