import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const products = [
    {id: '1', title: 'Джинсы', price: 50, description: 'Синего цвета, прямые'},
    {id: '2', title: 'Куртка', price: 120, description: 'Зеленого цвета, теплая'},
    {id: '3', title: 'Джинсы 2', price: 50, description: 'Синего цвета, прямые'},
    {id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая'},
    {id: '5', title: 'Джинсы 3', price: 50, description: 'Синего цвета, прямые'},
    {id: '6', title: 'Куртка 7', price: 60, description: 'Зеленого цвета, теплая'},
    {id: '7', title: 'Джинсы 4', price: 55, description: 'Синего цвета, прямые'},
    {id: '8', title: 'Куртка 5', price: 12, description: 'Зеленого цвета, теплая'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const [payUrl, setPayUrl] = useState('');
    const {tg, queryId} = useTelegram();
    const navigate = useNavigate();

    const onSendData = useCallback(() => {

        const api_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiTVRjME5EST0iLCJ0eXBlIjoicHJvamVjdCIsInYiOiI5ZGY0ZThkYmY0OTljN2RhOTcxZjIxMTBmYWFlM2I0ZjNjMTQwMmJhNDQ1OTQ3ODU3NDZjYThlYTE5OTdmZjcxIiwiZXhwIjo4ODEwMTYxMTk1NX0.J2Y7RsQC-M0jGnsgoDvLu_ndn8dzoR3EuNl_MD9RS44';
        const headers = {
          Authorization: 'Token ' + api_key
        };
        const payload = {
          shop_id: 'kf39EkOAVitlOfzg',
          amount: getTotalPrice(addedItems),
          order_id: queryId
        };
        
        axios.post(
          'https://api.cryptocloud.plus/v1/invoice/create',
           payload,
          { headers: headers }
        ).then(response => {
            setPayUrl(response.data.pay_url)
          })
        .catch(error => {
            console.error('Error:', error);
        });

    }, [addedItems])
    
    const redirect = () => {
        tg.redirect(payUrl)
    }

    useEffect(() => {
        if(payUrl) {
            tg.onEvent('mainButtonClicked', redirect)
        }
        return () => {
            tg.offEvent('mainButtonClicked', redirect)
        }
    }, [payUrl])

    useEffect(() => {
        if(!payUrl && addedItems) {
            onSendData()
        }
    }, [addedItems])
    

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
            <div>
                {payUrl && <div>
                    <a href={payUrl}>{payUrl}</a>
                    </div>
                    }
            </div>  
        </div>
    );
};

export default ProductList;
