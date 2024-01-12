import React, {useState, useEffect} from 'react';
import { Carousel } from 'antd';
import {products, availableProducts} from '../../components/ProductList/ProductList.cons'
import {productsRooms, availableProductsRooms} from '../../components/ProductList/ProductsListRooms.cons'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import { FaHouseChimney } from "react-icons/fa6";
import { MdBedroomParent } from "react-icons/md";
import './Main.css';
import Map from './components/Map';
import ProductList from '../../components/ProductList';

// import availableProducts from '../../components/ProductList';

const Main = () => {
    const [activeTab, setActiveTab] = useState('dwelling');
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [catigories, setCatigories] = useState(['dwelling', 'room'])

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSlideChange = (currentSlide) => {
        setActiveTab(catigories[currentSlide]);
    };

    useEffect(() => {
        setSelectedDistrict(2)
    }, [])

    console.log('selectedDistrict', selectedDistrict);

    
    return (
        <div className={'main'}>

            {/* TODO: Decompose */}
            <div className='payment-system'>
                <div className='context'>
                    <div className='location_wrap'>
                        {/* TODO: Decompose */}
                        <Carousel  swipeToSlide draggable afterChange={handleSlideChange}>
                            {catigories.map((item,idx) => (
                                <div key={idx} className='filters'> 
                                <div className='filter_by_category'>
                                    {/* <p>dwelling | room</p> */}
                                    <div className='tabs'>
                                        <Button className={activeTab === 'dwelling' ? 'active' : ''} type="primary" icon={<FaHouseChimney className='tabs_icon' />}  onClick={() => handleTabClick('dwelling')}/>
                                        <Button className={activeTab === 'room' ? 'active' : ''} type="primary" icon={<MdBedroomParent className='tabs_icon' />}  onClick={() => handleTabClick('room')}/>
                                    </div>
                                </div>
                                <div className='filter_by_location'>
                                    {/* <Map availableProducts={availableProducts}/> */}
                                    <Map
                                    availableProducts={activeTab === 'dwelling' ? availableProducts : availableProductsRooms} 
                                    selectedDistrict={selectedDistrict}
                                    setSelectedDistrict={setSelectedDistrict}/>
                                </div>
                            </div>
                            ))}
                        </Carousel>
                    </div>


                    {/* TODO: Decompose */}
                    <div className='products'>
                        <div className='products_list'>
                        </div>
                        <div className='products_view'>
                        <ProductList 
                        products={activeTab === 'dwelling' ? products : productsRooms} 
                        productType={activeTab} 
                        availableProducts={activeTab === 'dwelling' ? availableProducts : availableProductsRooms}
                        selectedDistrict={selectedDistrict}
                        setSelectedDistrict={setSelectedDistrict}
                        />
                        </div>
                    </div>

                    {/* TODO: Decompose */}
                    {/* <div className='payment_methods'>
                        <p>BTC | Cryptoprocesing | MasterCard Visa</p>
                    </div> */}

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