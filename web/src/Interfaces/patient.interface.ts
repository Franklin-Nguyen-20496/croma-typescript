
export default interface Patient {
    _id?: string;
    id: string;
    name: string;
    phone: string;
    score?: number;
    position: number;
    disease: string;
    age?: number;
    gender?: number;
    antecedent?: string;
    covid19?: boolean;
    file?: string;
    room?: number;
    doctorID?: string;
    nurseID?: string;
    medicationTime?: number;
    recipeName?: string;
    recipeID?: string;
    finished?: boolean;
    updateAt?: string;
}

export const patient: Patient = {
    _id: '',
    id: '',
    name: '',
    phone: '',
    score: 0,
    position: 0,
    disease: '',
    age: 0,
    gender: 0,
    antecedent: '',
    covid19: false,
    file: '',
    room: 0,
    doctorID: '',
    nurseID: '',
    medicationTime: 0,
    recipeName: '',
    recipeID: '',
    finished: false,
    updateAt: '',
}
