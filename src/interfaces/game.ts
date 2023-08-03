export interface Game {
    id: number,
    name: string,
    genderCategory: string,
    ageCategory: String,
    playDate: Date,
    gameDateTime: Date,
    userCreated: number,
    userDeleted: number,
    created: Date,
    deleted: Date,
    referee: {
      first: string,
      middle: string,
      last: string,
      secondLast: string
    }
  }