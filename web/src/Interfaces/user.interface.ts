
export default interface User {
    _id?: string;
    id: string;
    file: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    address: string;
    position: number;
    role: number;
}

export const initialUser: User = {
    _id: '',
    id: '',
    file: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: 0,
    address: '',
    position: 0,
    role: 0
}