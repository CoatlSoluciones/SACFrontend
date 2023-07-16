export interface Team {
    name: string,
    coach: {
      first: string,
      middle: string,
      last: string,
      secondLast: string
    },
    id: number;
    user_created: number;
    created: Date;
    user_deleted: number;
    deleted: Date;
  }