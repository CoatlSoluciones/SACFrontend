export interface Player {
    id: number;
    name: {
        first: string;
        middle: string;
        last: string;
        secondLast: string;
    };
    birthday: Date;
    gender: string;
    photo: string;
    identification: string;
    playerNumber: number;
}