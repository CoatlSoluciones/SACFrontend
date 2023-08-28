export interface Team {
    id: number;
    name: string;
    gender: string;
    age: string;
    coach: {
      first: string,
      middle: string,
      last: string,
      secondLast: string
    };

    
    //user_created: number;
    //created: Date;
    //user_deleted: number;
    //deleted: Date;
  }