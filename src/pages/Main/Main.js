import React, {useState} from 'react';
import { Carousel } from 'antd';

// import {useTelegram} from "../../hooks/useTelegram";
// import {useCallback, useEffect} from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { availableProducts, products } from './Main.cons';
// import ProductItem from "../../components/ProductItem";

import './Main.css';
import Map from './components/Map';
import ProductList from '../../components/ProductList';

const Main = () => {
    return (
        <div className={'main'}>

            {/* TODO: Decompose */}
            <div className='payment-system'>
                <div className='context'>

                    {/* TODO: Decompose */}
                    <div className='filters'> 
                        <div className='filter_by_category'>
                            <p>weed | mushroom</p>
                        </div>
                        <div className='filter_by_location'>
                            <Map />
                        </div>
                    </div>

                    {/* TODO: Decompose */}
                    <div className='products'>
                        <div className='products_list'>
                            <p>Product 1 | Product 2</p>
                        </div>
                        <div className='products_view'>
                            <ProductList/>
                        </div>
                    </div>

                    {/* TODO: Decompose */}
                    <div className='payment_methods'>
                        <p>BTC | Cryptoprocesing | MasterCard Visa</p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Main;


//TODO: use for useRedirect()
// const redirect = () => {
//     tg.redirect(payUrl)
// }

// useEffect(() => {
//     if(payUrl) {
//         tg.onEvent('mainButtonClicked', redirect)
//     }
//     return () => {
//         tg.offEvent('mainButtonClicked', redirect)
//     }
// }, [payUrl])