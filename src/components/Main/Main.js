import React, {useState} from 'react';
import './Main.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { availableProducts, products } from './Main.cons';
import ProductList from '../ProductList/ProductList';
import Map from './components/Map';


const Main = () => {
    return (
        <div className={'main'}>
            <div className='payment-system'>
                <div className='filters'>
                    <div className='filter_by_category'></div>
                    <div className='filter_by_location'>
                        <Map />
                    </div>
                </div>
                <div className='products'>
                    <div className='products_list'></div>
                    <div className='products_view'>
                        <ProductList/>
                    </div>
                </div>
                <div className='payment_methods'></div>
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