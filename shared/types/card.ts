export enum CardType {
    Rookie = "rookie",
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
    percent: number;
    maxUser: number,
    currentUser: number,
    winner: number,
    loser: number,
    level: string,
    info?: {
        title: string;
        text: string;
    };
}
