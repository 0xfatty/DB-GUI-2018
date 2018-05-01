import { Review } from './review';

export class Menu {
    constructor(public id: number,
        public restaurantId: number,
        public name: string,
        public description: string,
        public imageName: string,
        public rate: number,
        public isHot?: boolean,
        public alreadyRate?: boolean,
        public reviews?: Review[]) {
    }
}
