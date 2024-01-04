import React, { useState } from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { availableProducts, products } from './ProductList.cons';
import { Carousel } from 'antd';
import { GiMushroomGills } from "react-icons/gi";
import { FaCannabis } from "react-icons/fa";


const getProductAvailable = ({ id }) => {
    return availableProducts.find(({ productId }) => productId === id)?.available
}

// const productsItemArr = products.map((product) => {
//     return {
//         ...product,
//         available: getProductAvailable(product)
//     }
// })


const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = ({ products, productType, availableProducts }) => {
    const [addedItems, setAddedItems] = useState([]);
    const [payUrl, setPayUrl] = useState('');
    const { tg, queryId } = useTelegram();
    const navigate = useNavigate();

    const allProductIds = products.map(product => product.id);

    const isProductAvailable = (productId) => {
        return availableProducts.some(product => product.productId === productId);

    };



    const productIcons = allProductIds.map(productId => (
        <div
            key={productId}
            className={`icon_product_qrt ${isProductAvailable(productId) ? 'available' : 'icon_product_qrt_wrap_unavailable'}`}
        >
            {productType === 'weed' ? <FaCannabis /> : <GiMushroomGills />}
        </div>
    ));

    const productsItemArr = products.map((product) => {
        return {
            ...product,
            available: getProductAvailable(product)
        }
    })


    // console.log('products', products);
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
        if (payUrl) {
            tg.onEvent('mainButtonClicked', redirect)
        }
        return () => {
            tg.offEvent('mainButtonClicked', redirect)
        }
    }, [payUrl])

    useEffect(() => {
        if (!payUrl && addedItems) {
            onSendData()
        }
    }, [addedItems])


    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if (newItems.length === 0) {
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
            <div className='icon_product_qrt_wrap'>
                {/* {products.map((item, idx) => (
                    <div className='icon_product_qrt' key={idx} >
                        {productType === 'weed' ? <FaCannabis /> : <GiMushroomGills />}
                    </div>
                ))} */}
                <div className='icon_product_qrt_wrap'>
                    {productIcons}
                </div>
            </div>
            <Carousel swipeToSlide draggable>
                {productsItemArr.map(item => (
                    <ProductItem
                        product={item}
                        onAdd={onAdd}
                        className={'item'}
                    />
                ))}
            </Carousel>
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
