export class User {
    id: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    type: number;
}

export enum UserTypes {
    admin = 1,
    normalUser = 2,
    restaurantOwner = 3,
}
