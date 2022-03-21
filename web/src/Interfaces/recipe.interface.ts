interface item {
    medicineID: string;
    medicineName: string;
    total: number;
    unit: string;
}

export default interface Recipe {
    id: string;
    components: item[];
    name: string;
    description?: string;
    doctorID: string;
    type: number;
}
