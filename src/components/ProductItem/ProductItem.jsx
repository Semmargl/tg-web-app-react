import React, { useState, useEffect } from 'react';
// import Button from "../Button/Button";
import './ProductItem.css';
// import 'antd/dist/antd.css';
import { Button } from 'antd';

const ProductItem = ({ product, className, onAdd }) => {
    const [currentWeight, setCurrentWeight] = useState(null)

    const onAddHandler = () => {
        onAdd(product);
    }

    console.log('currentWeight', currentWeight);

    const chooseWeightHandler = (avOption) => {
        setCurrentWeight(avOption)
        console.log('product.img', avOption);
    }

    // product_price_item_active
    return (
        <div
            className={'product ' + className}
            style={{ background: `url(${product.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

            <div
                className='product_info'>
                <div className='left_block_content'>
                    <div className='product_name_weight'>
                        <div className='product_header'>
                            <div className={'title'}>{product.title}</div>
                        </div>
                        <div className={'product_info_price_wrap'}>

                            {
                                product.available?.map((avOption) => (
                                    <div
                                        key={product.id}
                                        className={`product_price_item ${avOption.weight === currentWeight?.weight && avOption.locationId === currentWeight?.locationId ? 'product_price_item_active' : ''}`}
                                        onClick={() => chooseWeightHandler(avOption)}
                                    >
                                        {/* <p>locationId: <b>{avOption.locationId}</b></p> */}
                                        <p className='product_price_item_weight'>{avOption.weight}g</p>
                                        <p className='product_price_item_price'>{avOption.price}e</p>
                                        <ln></ln>
                                    </div>))
                            }

                        </div>
                    </div>
                </div>
                <div className='right_block_component'>
                    <div className={'description'}>{product.short}</div>
                    <div className={'description'}>{product.description}</div>
                    
                </div>
            </div>

        </div>
    );
};

export default ProductItem;
