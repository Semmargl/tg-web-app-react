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
                    product.available?.map( (avOption)=>( <div key={product.id}>
                        <p>locationId: <b>{avOption.locationId}</b></p>
                        <p>price: <b>{avOption.price}</b></p>
                        <p>weight: <b>{avOption.weight}</b></p>
                        <ln></ln>
                    </div> ) )
                }
                
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    );
};

export default ProductItem;
