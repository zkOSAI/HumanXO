export enum CardType {
    Rokie = "rokie",
    Pro = "pro",
    Master = "master",
}

export enum Status {
    Live = "live",
    Date = "date",
    Finished = "finished",
}

export interface Card {
    id: number;
    type: CardType;
    name: string;
    status: Status;
    date: string;
    percent: number;
    info?: {
        title: string;
        text: string;
    };
}
