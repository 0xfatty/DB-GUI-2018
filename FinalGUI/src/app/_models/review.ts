export class Review {
    constructor(
        public reviewOf: number,
        public userName: string,
        public rating: number,
        public date: Date,
        public type: number,
        public comment?: string,
        public id?: number,
    ) {
    }
}
