export const products = [{
    id: 1, 
    title: 'Girl Scout Cookies', 
    short: 'Творческий хай с ароматом сладкого печенья',
    details: `
        Индор (Indoor)
        ТГК: до 20%
        Сатива 40% / Индика 60%
        Вкус: печенье, сладкий, земляной
        Эффекты: социальность, расслабленность, счастье
    `,
    img: 'https://2fast4buds.com/static/products/77/m_blc_girl_scout_cookies_black_1690109718.jpg'
},{
    id: 2, 
    title: 'Mexican Airlines', 
    short: 'Сативный полет с цитрусовым оттенком',
    details: `
        Индор (Indoor)
        ТГК: до 19%
        Сатива 65% / Индика 35%
        Вкус: лимон, фруктовый, сосна
        Эффекты: энергия, креативность, бодрость
    `,
    img: 'https://2fast4buds.com/static/products/69/m_blc_mexican_airlines_black_1690109427.jpg'
},{
    id: 3, 
    title: 'White Widow', 
    short: 'Олдскульная легенда с гибридным эффектом',
    details: `
        Индор (Indoor)
        ТГК: до 20%
        Сатива 30% / Индика 70%
        Вкус: мускус, пряный, земляной
        Эффекты: стимуляция с плавным переходом в релакс
    `,
    img: 'https://2fast4buds.com/static/products/122/m_blc_original_auto_white_widow_black_1690110426.jpg'
},{
    id: 4, 
    title: 'Gorilla Glue', 
    short: ' Максимум ТГК с тяжелой эйфорией',
    details: `
        Индор (Indoor) 
        ТГК: до 24%
        Сатива 65% / Индика 35%
        Вкус: цитрус, сосна, пикантный
        Эффекты: позитив, эйфория
    `,
    img: 'https://2fast4buds.com/static/products/81/m_blc_gorilla_glue_black_1690109789.jpg'
}];

export const availableProducts = [{
    id: 1,
    productId: 1,
    available: [{
        locationId: 1,
        price: 25,
        weight: 5
    },
    {
        locationId: 1,
        price: 40,
        weight: 10
    },
    {
        locationId: 2,
        price: 25,
        weight: 5
    }]
},
{
    id: 2,
    productId: 2,
    available: [{
        locationId: 3,
        price: 25,
        weight: 5
    },
    {
        locationId: 2,
        price: 40,
        weight: 10
    },
    {
        locationId: 1,
        price: 25,
        weight: 5
    }]
}]

const location = [{}];
