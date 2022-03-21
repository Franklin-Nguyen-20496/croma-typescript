
export default interface WaitingPatient {
    _id?: string;
    id: string;
    name: string;
    phone: string;
    score?: number;
    position: number;
    age: number;
    gender: number;
    antecedent?: string;
    covid19?: boolean;
    file?: string;
    selected: boolean;
}

export const waitingPatient: WaitingPatient = {
    _id: '',
    id: '',
    name: '',
    phone: '',
    score: 0,
    position: 0,
    age: 0,
    gender: 0,
    antecedent: '',
    covid19: false,
    file: '',
    selected: false,
}
