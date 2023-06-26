export interface Card {
    id: Number,
    name: String;
    type: String;
    frameType: String;
    desc: String;
    race: String;
    archetype: String;
    card_sets: Array<String>;
    card_images: Array<String>;
    card_prices: Array<String>;
}
