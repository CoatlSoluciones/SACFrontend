export interface Player {
    birthday: Date;
    id: number;
    name: {
        first: string;
        middle: string;
        last: string;
        secondLast: string;
    };
    gender: string;
    photo: string;
    identification: string;
    playerNumber: number;
}