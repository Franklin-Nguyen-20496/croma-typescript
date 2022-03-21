
import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { useFormik } from 'formik';
import { useOutletContext } from 'react-router-dom';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import {
    useToast,
    FormLabel,
    Box,
    Heading,
    Image,
} from '@chakra-ui/react';

import { Context } from './Register';
import ErrorMsg from '../../common/ErrorMessage';
import CustomInput from '../../common/CustomInput';
import Btn from '../../common/Btn';
import WaitingPatient from '../../../Interfaces/waitingPatient.interface';

//function check gender number return string if gender
const checkGender = (number: number) => {
    switch (number) {
        case 1:
            return 'Nam';
        case 2:
            return 'Nữ'
        default:
            return '...';
    }
}

const initialValues = {
    id: '',
    name: '',
    file: '',
    score: 0,
    age: 0,
    gender: 0,
    antecedent: '',
    covid19: false,
}

const Information = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const { phone, setPhone }: Context = useOutletContext();
    const [patient, setPatient] = useState(initialValues);

    const formik = useFormik({
        initialValues: {
            phone: '',
        },
        validationSchema: yup.object().shape({
            phone: yup.string()
                .min(9, 'Số điện thoại không đúng!')
                .max(12, 'Số điện thoại không đúng!')
                .required('Nhập số điện thoại của bạn'),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            axios({
                method: 'get',
                url: `/waiting/get-by-phone/${values.phone}`,
            })
                .then(res => {
                    console.log('res', res);
                    const { message, data } = res.data;
                    if (message === 'success') {
                        setPatient(data);
                        resetForm();
                        toast({
                            title: 'Đã tìm kiếm thông tin!',
                            description: "Bệnh nhân đã đăng ký khám chữa bệnh.",
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                            position: 'bottom-left',
                        })
                    }
                    else {
                        toast({
                            title: 'Không tìm thấy!',
                            description: "Số điện thoại chưa đăng ký khám chữa bệnh.",
                            status: 'error',
                            duration: 5000,
                            isClosable: true,
                            position: 'bottom-left',
                        })
                        setPatient(initialValues);
                    }
                })
                .catch(err => console.log(err))
        }
    })

    return (
        <Box
            maxWidth="30rem"
            mx="auto"
            mb="8rem"
        >
            <Heading size="lg" textAlign="center" mb={4}>
                Xem thông tin khám chữa bệnh
            </Heading>
            <form
                onSubmit={formik.handleSubmit}
            >
                <FormLabel htmlFor="phone">Số điện thoại:</FormLabel>
                <CustomInput
                    type="text"
                    id="phone"
                    placeholder="0123456789..."
                    {...formik.getFieldProps('phone')}
                />

                {formik.touched.phone && formik.errors.phone ? (
                    <ErrorMsg >{formik.errors.phone}</ErrorMsg>
                ) : null}
                <Box my={4} display="flex" justifyContent="flex-end">
                    <Btn type="submit">
                        Tra cứu
                    </Btn>
                </Box>
            </form>
            {
                patient.id && (
                    <Box w="50%" mx="auto" textAlign="center">
                        <Image
                            title={patient.name}
                            boxSize='100%'
                            objectFit='cover'
                            borderRadius="50%"
                            src={patient.file}
                        >
                        </Image>
                        <Heading size="md" mt={4}>Bệnh nhân {patient.name}</Heading>
                        <p>Mức độ bệnh: {patient.score}</p>
                        <p>Tuổi: {patient.age > 0 ? patient.age : '...'}</p>
                        <p>Giới tính: {checkGender(patient.gender)}</p>
                        {patient.antecedent && <p>Tiền sử bệnh: {patient.antecedent}</p>}
                        <p>{patient.covid19 ? 'Đã xét nghiệm covid19' :
                            'Chưa xét nghiệm covid19'
                        }</p>
                    </Box>
                )
            }
        </Box>
    );
}

export default Information;
