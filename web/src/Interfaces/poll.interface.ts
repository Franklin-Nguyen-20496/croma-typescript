export default interface Poll {
    _id: Object | string;
    id: string;
    positionRoom: Number;
    levelRoom: Number;
    agreed?: string[];
    noAgreed?: string[];
    room?: Number;
    processed?: Boolean;
}