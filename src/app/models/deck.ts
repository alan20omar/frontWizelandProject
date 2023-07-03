import { Card } from "./card";

export interface Deck {
    cards: Array<Card>;
    _id: string;
    userId: string;
    userName?: string;
};
