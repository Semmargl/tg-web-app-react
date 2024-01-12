import React, { useState, useEffect, useCallback, useRef } from 'react';
// import Button from "../Button/Button";
import './ProductItem.css';
// import 'antd/dist/antd.css';
import { Button } from 'antd';

const ProductItem = ({ product, className, onAdd, selectedDistrict, setSelectedDistrict, availableProducts }) => {
    const [currentWeight, setCurrentWeight] = useState(null)
    // const [availableOptions, setAvailableOptions] = useState(null)
    const availableOptions = product.available?.filter(avOption => avOption.locationId === selectedDistrict);
    // const [heightTop, setHeightTop] = useState(200);
    // const [heightBottom, setHeightBottom] = useState(200);
    const [heightTop, setHeightTop] = useState(25);
    const [heightBottom, setHeightBottom] = useState(100);
    // const [heightTop, setHeightTop] = useState(() => {
    //     return localStorage.getItem('heightTop') || 35;
    // });
    // const [heightBottom, setHeightBottom] = useState(() => {
    //     return localStorage.getItem('heightBottom') || 40;
    // });
    const refTop = useRef(null);
    const refBottom = useRef(null);


    const onAddHandler = () => {
        onAdd(product);
    }

    useEffect(() => {
        localStorage.setItem('heightTop', heightTop);
    }, [heightTop]);

    useEffect(() => {
        localStorage.setItem('heightBottom', heightBottom);
    }, [heightBottom]);


    const getRandomAvailableLocation = (productId, weight) => {
        const availableLocations = availableProducts
            .filter(product => product.productId === productId)
            .flatMap(product => product.available)
            .filter(option => option.weight === weight);

        return availableLocations.length > 0
            ? availableLocations[Math.floor(Math.random() * availableLocations.length)].locationId
            : null;
    };

    console.log('currentWeight', currentWeight);

    const isWeightAvailable = (avOption) => {
        return availableOptions.some(option =>
            option.weight === avOption.weight &&
            option.locationId === avOption.locationId
        );
    };


    const chooseWeightHandler = (avOption) => {
        if (isWeightAvailable(avOption)) {
            setCurrentWeight(avOption);
        } else {
            const randomLocationId = getRandomAvailableLocation(product.id, avOption.weight);
            if (randomLocationId) {
                setSelectedDistrict(randomLocationId);
                setCurrentWeight({ ...avOption, locationId: randomLocationId });
            }
        }
    };


    const handleDragTop = useCallback((e) => {
        e.preventDefault();
        const startY = e.clientY;
        const startHeight = heightTop;

        const handleMouseMove = (moveEvent) => {
            const delta = startY - moveEvent.clientY;
            setHeightTop(Math.max(50, startHeight - delta)); 
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [heightTop]);

    const handleDragBottom = useCallback((e) => {
        e.preventDefault();
        const startY = e.clientY;
        const startHeight = heightBottom;

        const handleMouseMove = (moveEvent) => {
            const delta = moveEvent.clientY - startY;
            setHeightBottom(Math.max(50, startHeight - delta)); 
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [heightBottom]);


    return (
        <div
            className={'product ' + className}
            // style={{ background: `url(${product.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >

            <div
                className='product_info'>
                <div className='left_block_content'>
                    <div className='product_name_weight'>
                        <div className='product_header'>
                            {/* <div className={'title'}>{product.title}</div> */}
                            <div className={'title'}>Активные кнопки</div>

                        </div>
                        <div className={'product_info_price_wrap'}>

                            {
                                product.available?.map((avOption) => (
                                    <div
                                        key={product.id}
                                        // className={`product_price_item ${avOption.weight === currentWeight?.weight && avOption.locationId === currentWeight?.locationId ? 'product_price_item_active' : ''}`}
                                        className={`product_price_item ${isWeightAvailable(avOption) ? (avOption.weight === currentWeight?.weight && avOption.locationId === currentWeight?.locationId ? 'product_price_item_active' : '') : 'product_price_item_unavailable'}`}
                                        onClick={() => chooseWeightHandler(avOption)}
                                    >
                                        {/* <p>locationId: <b>{avOption.locationId}</b></p> */}
                                        <p className='product_price_item_weight'>{avOption.days} day</p>
                                        <p className='product_price_item_price'>{avOption.price}€</p>
                                        <ln></ln>
                                    </div>))
                            }

                        </div>
                    </div>
                    <div className={'product_pay_wrap'}>
                        <div className={'product_pay_item'}>
                            <button className={'product_pay_var'} > <p> Bitcoin Wallet</p></button>
                        </div>
                        <div className={'product_pay_item'}>
                            <button className={'product_pay_var'}> <p>Telegram Wallet</p> </button>
                            {/* <button className={'product_pay_pacifier'}> <img src="/icon/pacifier.png" alt="" /> </button> */}
                        </div>
                        <div className={'product_pay_item'}>
                            <button className={'product_pay_var'}> <p>Visa MasterCard</p></button>
                            {/* <button className={'product_pay_pacifier'}> <img src="/icon/pacifier.png" alt="" /> </button> */}
                        </div>
                    </div>
                </div>
                <div className='right_block_component'>
                    <div
                        className={'description description_top'}
                        style={{ height: `${heightTop}%` }}
                    >
                        {product.short}
                        <div
                            className="resize-handle-top"
                            // onMouseDown={handleDragTop}
                        >
                            {/* <span></span> */}
                            </div>
                    </div>
                    <div
                        className={'description description_bottom'}
                        style={{ height: `${heightBottom}%` }}
                    >
                        <div
                            className="resize-handle-bottom"
                            // onMouseDown={handleDragBottom}
                        >
                            {/* <span></span> */}
                            </div>
                        {product.description}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductItem;
