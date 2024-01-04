import React, {useState} from 'react';
import { Carousel } from 'antd';
import {products, availableProducts} from '../../components/ProductList/ProductList.cons'
import {productsMushrooms, availableProductsMushrooms } from '../../components/ProductList/ProductsListMushrooms.cons'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import { GiMushroomGills } from "react-icons/gi";
import { FaCannabis } from "react-icons/fa";
import './Main.css';
import Map from './components/Map';
import ProductList from '../../components/ProductList';
// import availableProducts from '../../components/ProductList';

const Main = () => {
    const [activeTab, setActiveTab] = useState('weed');
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    console.log('availableProducts', availableProducts);

    
    return (
        <div className={'main'}>

            {/* TODO: Decompose */}
            <div className='payment-system'>
                <div className='context'>

                    {/* TODO: Decompose */}
                    <div className='filters'> 
                        <div className='filter_by_category'>
                            {/* <p>weed | mushroom</p> */}
                            <div className='tabs'>
                                <Button className={activeTab === 'weed' ? 'active' : ''} type="primary" icon={<FaCannabis className='tabs_icon' />}  onClick={() => handleTabClick('weed')}/>
                                <Button className={activeTab === 'mushroom' ? 'active' : ''} type="primary" icon={<GiMushroomGills className='tabs_icon' />}  onClick={() => handleTabClick('mushroom')}/>
                            </div>
                        </div>
                        <div className='filter_by_location'>
                            {/* <Map availableProducts={availableProducts}/> */}
                            <Map
                            availableProducts={activeTab === 'weed' ? availableProducts : availableProductsMushrooms} 
                            selectedDistrict={selectedDistrict}
                            setSelectedDistrict={setSelectedDistrict}/>
                        </div>
                    </div>

                    {/* TODO: Decompose */}
                    <div className='products'>
                        <div className='products_list'>
                        </div>
                        <div className='products_view'>
                        <ProductList 
                        products={activeTab === 'weed' ? products : productsMushrooms} 
                        productType={activeTab} 
                        availableProducts={activeTab === 'weed' ? availableProducts : availableProductsMushrooms}
                        />
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