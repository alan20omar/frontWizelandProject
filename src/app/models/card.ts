interface Sets {
    set_name: string;
    set_code: string;
    set_rarity: string;
    set_rarity_code: string;
    set_price: string;
}

interface Images {
    id: number;
    image_url: string;
    image_url_small: string;
    image_url_cropped: string;
}

interface Prices {
    cardmarket_price: string;
    tcgplayer_price: string;
    ebay_price: string;
    amazon_price: string;
    coolstuffinc_price: string;
}

export interface Card {
    id: number,
    name: string;
    type: string;
    frameType: string;
    desc: string;
    race: string;
    archetype: string;
    card_sets: Array<Sets>;
    card_images: Array<Images>;
    card_prices: Array<Prices>;
}
