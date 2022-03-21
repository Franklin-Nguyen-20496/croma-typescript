
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Text, Heading, Box, Grid, GridItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import Btn from '../../../common/Btn';
import ErrorMsg from '../../../common/ErrorMessage';
import Medicine from '../../../../Interfaces/medicine.interface';
import CustomInput from '../../../common/CustomInput';
import CustomSelect from '../../../common/CustomSelectInput';

const MotionBox = motion(Box);

type Props = {
    showForm: boolean,
    setShowForm: (value: boolean) => void,
    setMedicines: (value: any) => void,
}

const MedicineForm = (props: Props) => {
    const { showForm, setShowForm, setMedicines } = props;
    const [errorMessage, setErrorMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            unit: '',
            total: '',
        },
        validationSchema: yup.object({
            name: yup.string()
                .max(32, 'Tên thuốc không dài quá 32 kí tự!')
                .required('Chưa có tên thuốc!'),
            unit: yup.string()
                .required('Chưa có đơn vị!'),
            total: yup.number()
                .min(0, 'Số lượng thuốc không đúng!')
        }),
        onSubmit: (values, { resetForm }) => {
            console.log('values', values);
            axios({
                method: 'post',
                url: '/medicines/create',
                data: values,
            })
                .then(res => {
                    const { data, message } = res.data;
                    if (data) {
                        console.log('data', data);
                        setShowForm(false);
                        setMedicines((prev: Medicine[]) => {
                            return [...prev, data,]
                        })
                        resetForm();
                    }
                    else setErrorMessage(message);
                })
                .catch(error => console.log(error))
        },
    })

    return (
        <MotionBox
            display={showForm ? 'block' : 'none'}
            my={6}
            animate={{
                opacity: showForm ? 1 : 0,
                y: showForm ? 0 : -100,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <Heading size='md'>Thêm thuốc mới</Heading>
            <form
                onSubmit={formik.handleSubmit}
            >
                <Grid
                    gap={4} templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
                    mt={4} mb={4}
                >
                    <GridItem w='100%'>
                        <label htmlFor="name">Tên thuốc</label>
                        <CustomInput
                            id="name"
                            type="text"
                            placeholder="name"
                            {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <ErrorMsg >{formik.errors.name}</ErrorMsg>
                        ) : null}
                    </GridItem>

                    <GridItem w='100%'>
                        <label htmlFor="total">Số lượng</label>
                        <CustomInput
                            id="total"
                            type="number"
                            placeholder="total"
                            {...formik.getFieldProps('total')}
                        />
                        {formik.touched.total && formik.errors.total ? (
                            <ErrorMsg >{formik.errors.total}</ErrorMsg>
                        ) : null}
                    </GridItem>

                    <GridItem w='100%'>
                        <label htmlFor="unit">Đơn vị</label>
                        <CustomSelect id="unit"
                            {...formik.getFieldProps('unit')} >
                            <option value="" label="Chọn đơn vị" />
                            <option value="viên" label="viên" />
                            <option value="gam" label="gam" />
                            <option value="ml" label="ml" />
                        </CustomSelect>
                        {formik.touched.unit && formik.errors.unit ? (
                            <ErrorMsg >{formik.errors.unit}</ErrorMsg>
                        ) : null}
                    </GridItem>

                </Grid>

                <Box >
                    {errorMessage &&
                        <ErrorMsg textAlign="end" mb={4}>{errorMessage}</ErrorMsg>}
                    <Box display='flex' justifyContent='flex-end'>
                        <Btn
                            type="submit"
                            bg='red.600'
                            mr={4}
                            onClick={() => {
                                setShowForm(false);
                                setErrorMessage('');
                                formik.resetForm();
                            }}
                        >Hủy</Btn>
                        <Btn
                            type="submit"
                        >Thêm thuốc</Btn>
                    </Box>
                </Box>

            </form>
        </MotionBox>
    );
}

export default MedicineForm;
