import React, { useState, useEffect, useCallback, useRef } from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
// import { useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { availableProducts, products } from './ProductList.cons';
import { Carousel } from 'antd';
import { FaHouseChimney } from "react-icons/fa6";
import { MdBedroomParent } from "react-icons/md";


const getProductAvailable = ({ id }) => {
    return availableProducts.find(({ productId }) => productId === id)?.available
}


const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = ({ products, productType, availableProducts, selectedDistrict, setSelectedDistrict }) => {
    const [addedItems, setAddedItems] = useState([]);
    const [payUrl, setPayUrl] = useState('');
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const { tg, queryId } = useTelegram();
    const iconContainerRef = useRef(null);
    const iconRefs = useRef([]);
    const navigate = useNavigate();

    const allProductIds = products.map(product => product.id);

    // const isProductAvailable = (productId) => {
    //     return availableProducts.some(product => product.productId === productId);

    // };

    const isProductAvailable = (productId) => {
        return availableProducts.some(product => 
            product.productId === productId && 
            product.available.some(av => av.locationId === selectedDistrict)
        );
    };

    const handleSlideChange = (currentSlide) => {
        setActiveSlideIndex(currentSlide);
        centerActiveIcon(currentSlide);
    };

        const centerActiveIcon = (index) => {
            const iconContainer = iconContainerRef.current;
            const activeIcon = iconRefs.current[index];
    
            if (iconContainer && activeIcon) {
                const containerWidth = iconContainer.offsetWidth;
                const activeIconOffset = activeIcon.offsetLeft + activeIcon.offsetWidth / 2;
                const scrollPosition = activeIconOffset - containerWidth / 2;
                iconContainer.scrollLeft = scrollPosition;
            }
        };
    
        const setIconRef = (element, index) => {
            iconRefs.current[index] = element;
        };
    


    const productIcons = allProductIds.map((productId, index) => (
        <div
            ref={(el) => setIconRef(el, index)}
            key={productId}
            className={`icon_product_qrt ${isProductAvailable(productId) ? 'icon_product_qrt_wrap_available' : 'icon_product_qrt_wrap_unavailable'} ${index === activeSlideIndex ? 'icon_product_qrt_active-icon' : ''}`}
        >
            {productType === 'dwelling' ? <FaHouseChimney /> : <MdBedroomParent />}
        </div>
    ));


    const productsItemArr = products.map((product) => {
        return {
            ...product,
            available: getProductAvailable(product)
        }
    })


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
            <div ref={iconContainerRef} className='icon_product_qrt_wrap'>
                    {productIcons}
            </div>
            <div className={'product_carousel_wrap'}>
                <Carousel swipeToSlide draggable afterChange={handleSlideChange}>
                    {productsItemArr.map(item => (
                        <ProductItem
                            product={item}
                            onAdd={onAdd}
                            className={'item'}
                            selectedDistrict={selectedDistrict}
                            setSelectedDistrict={setSelectedDistrict}
                            availableProducts={availableProducts}
                        />
                    ))}
                </Carousel>
            </div>
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
