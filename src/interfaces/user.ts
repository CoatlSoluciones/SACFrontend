export interface User {
    birthday: Date;
    deleted: null;
    gender: string;
    created: Date;
    name: {
      first: string;
      last: string;
      middle: string;
      secondLast: string;
    };
    user_created: number;
    id: number;
    user_deleted: null;
    email: string;
  }