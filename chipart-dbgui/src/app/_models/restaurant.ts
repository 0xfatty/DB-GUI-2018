import { Review } from './review';
import { Menu } from '.';

export class Restaurant {
    constructor(public id: number,
        public name: string,
        public description: string,
        public imageName: string,
        public address: string,
        public zipcode: string,
        public link: string,
        public rate: number,
        public isFollowing?: boolean,
        public ownerId?: number,
        public city?: string,
        public menus?: Menu[],
        public reviews?: Review[],
    ) {
    }
}
