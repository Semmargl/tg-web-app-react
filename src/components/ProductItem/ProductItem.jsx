import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={'product ' + className}>
            <img src={product.img} className={'img'}/>
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.short}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                {
                    product.available.map( ()=>( <>
                        <span>locationId: <b>{product.locationId}</b></span>
                        <span>price: <b>{product.price}</b></span>
                        <span>weight: <b>{product.weight}</b></span>
                    </> ) )
                }
                
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    );
};

export default ProductItem;
