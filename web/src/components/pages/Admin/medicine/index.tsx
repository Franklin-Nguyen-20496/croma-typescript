
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heading, Box } from '@chakra-ui/react'

import Btn from '../../../common/Btn';
import MedicineForm from './MedicineForm';
import Medicine, { medicine } from '../../../../Interfaces/medicine.interface';
import List from './List';

const MedicinePage = () => {
    const [showForm, setShowForm] = useState(false);
    const [medicines, setMedicines] = useState<Medicine[]>([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: '/medicines',
        })
            .then(res => {
                const { data, message } = res.data
                if (data && data.length > 0) {
                    setMedicines(data);
                }
                else console.warn(message);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <Heading size='lg' mb={4}>Thuốc men</Heading>

            <List
                items={medicines}
                setMedicines={setMedicines}
            />

            <MedicineForm
                showForm={showForm}
                setShowForm={setShowForm}
                setMedicines={setMedicines}
            />
            <Box display='flex' justifyContent='flex-end'>
                {!showForm && <Btn
                    onClick={() => setShowForm(true)}
                    type="button"
                >Thêm  thuốc</Btn>}
            </Box>
        </div>
    );
}

export default MedicinePage;
