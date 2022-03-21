
import React, { useState, useContext, memo } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import FormData from 'form-data';
import { useDispatch } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
    Checkbox,
    FormLabel,
    Box,
    Heading,
} from '@chakra-ui/react';

import CustomInput from '../../common/CustomInput';
import CustomNumberInput from '../../common/CustomNumberInput';
import CustomSelectInput from '../../common/CustomSelectInput';
import ErrorMsg from '../../common/ErrorMessage';
import Btn from '../../common/Btn';
import PreviewImg from '../../common/PreviewImg';
import actions from '../../../redux/actions';
import { SocketContext } from '../../../App';

const {
    notifyInfo,
    hideNotify,
    setAllWaitingPatients,
} = actions;

export interface Context {
    phone: string;
    setPhone: (phone: string) => void;
}

const PatientRegister = () => {
    const { phone, setPhone }: Context = useOutletContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = useContext(SocketContext);
    const [phoneError, setPhoneError] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            score: 0,
            file: '',
            age: 0,
            gender: '',
            antecedent: '',
            covid19: false,
        },
        validationSchema: yup.object().shape({
            file: yup.mixed(),
            name: yup.string()
                .max(32, 'Quá dài tối đa 32 kí tự!')
                .required('Bạn chưa nhập họ tên'),
            phone: yup.string()
                .min(9, 'Số điện thoại không đúng!')
                .max(12, 'Số điện thoại không đúng!')
                .required('Nhập số điện thoại của bạn'),
            score: yup.number()
                .min(0, 'Thang đo mức độ từ 1-10')
                .max(10, 'Thang đo mức độ bệnh từ 1-10')
                .required('Vui lòng cho biết mức độ bệnh'),
            age: yup.number()
                .min(0, 'Tuổi không hợp lệ')
                .max(117, 'Really? The oldest person in the world is 117 years old :))'),
            gender: yup.number(),
            antecedent: yup.string(),
            covid19: yup.boolean(),
        }),
        validate: () => { },
        onSubmit: async (values, { resetForm }) => {
            console.log('values submit', values);
            axios({
                method: 'get',
                url: `/waiting/check-phone/${values.phone}`,
            })
                .then(res => {
                    const { message } = res.data;
                    if (message === 'success') {
                        const { file, age, gender, ...patient } = values;
                        const newValues = {
                            ...patient,
                            age: age ? age : 0,
                            gender: gender ? gender : 0,
                        }

                        if (file) {
                            let bodyFormData = new FormData();
                            bodyFormData.append('file', file);

                            axios({
                                method: 'post',
                                url: '/file/upload',
                                headers: { 'Content-Type': 'multipart/form-data' },
                                data: bodyFormData
                            })
                                .then(res => {
                                    console.log('res', res);
                                    const newFile = res.data;
                                    const newPatient = { ...newValues, file: newFile };
                                    console.log('new patient', newPatient);
                                    axios({
                                        method: 'post',
                                        url: '/waiting/create',
                                        data: newPatient,
                                    })
                                        .then(res => {
                                            const { message, data } = res.data;
                                            if (data) {
                                                socket.emit('waiting_patients:create', data);
                                                dispatch(notifyInfo('Đã đăng ký khám chữa bệnh'));
                                                dispatch(setAllWaitingPatients(data));
                                                setTimeout(() => {
                                                    dispatch(hideNotify());
                                                }, 4000);
                                                resetForm();
                                                setPhone(newPatient.phone);
                                                // dispatch(setSearchInfo(values.phone));
                                                navigate('/patient/info');
                                            }
                                            else console.log('error', message);
                                        })
                                        .catch(err => {
                                            console.log('err', err);
                                            axios({
                                                method: 'delete',
                                                url: newPatient.file,
                                            })
                                                .then(res => console.log('delete file', res))
                                                .catch(err => console.log('delete file', err));


                                        }); // end axios post waiting patients
                                })
                                .catch(err => {
                                    console.log('error', err);

                                })
                        }
                        else {
                            // no image
                            axios({
                                method: 'post',
                                url: '/waiting/create',
                                data: newValues,
                            })
                                .then(res => {
                                    const { message, data } = res.data;
                                    if (data) {
                                        // socket.emit('waiting_patients:create', data);
                                        dispatch(notifyInfo('Đã đăng ký khám chữa bệnh'));
                                        dispatch(setAllWaitingPatients(data));
                                        setTimeout(() => {
                                            dispatch(hideNotify());
                                        }, 4000);
                                        resetForm();
                                        setPhone(newValues.phone);
                                        navigate('/patient/info');
                                    }
                                    else console.log('error', message);
                                })
                                .catch(err => console.log('err', err));
                        }
                    }
                    else {
                        setPhoneError(message);
                    }
                })
        },
    });

    return (
        <Box
            maxWidth="30rem"
            mx="auto"
            mb="8rem"
        >
            <Heading size="lg" mb={4} >Đăng ký khám chữa bệnh</Heading>

            <form
                onSubmit={formik.handleSubmit}
            >

                <Box mb={3}>
                    <FormLabel htmlFor="name">Họ và tên:</FormLabel>
                    <CustomInput
                        id="name"
                        type="text"
                        placeholder="name"
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <ErrorMsg >{formik.errors.name}</ErrorMsg>
                    ) : null}
                </Box>

                <Box mb={3}>
                    <FormLabel htmlFor="phone">Số diện thoại:</FormLabel>
                    <CustomInput
                        id="phone"
                        type="text"
                        placeholder="phone"
                        {...formik.getFieldProps('phone')}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <ErrorMsg >{formik.errors.phone}</ErrorMsg>
                    ) : null}
                </Box>


                <Box mb={3}>
                    <FormLabel htmlFor="score">Đánh giá mức độ bệnh:</FormLabel>
                    <CustomSelectInput
                        id="score"
                        {...formik.getFieldProps('score')}
                    >
                        <option value={0} label="Chọn mức độ" />
                        <option value={1} label="1" />
                        <option value={2} label="2" />
                        <option value={3} label="3" />
                        <option value={4} label="4" />
                        <option value={5} label="5" />
                        <option value={6} label="6" />
                        <option value={7} label="7" />
                        <option value={8} label="8" />
                        <option value={9} label="9" />
                        <option value={10} label="10" />
                    </CustomSelectInput>

                    {formik.touched.score && formik.errors.score ? (
                        <ErrorMsg >{formik.errors.score}</ErrorMsg>
                    ) : null}
                </Box>

                <Box mb={3}>
                    <FormLabel htmlFor="file">Ảnh đại diện:</FormLabel>
                    <CustomInput
                        id="file"
                        type="file"
                        placeholder="file"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                formik.setFieldValue('file', e.target.files[0]);
                            }
                        }}
                    />
                    {formik.values.file && <PreviewImg file={formik.values.file} />}
                    {formik.touched.file && formik.errors.file ? (
                        <ErrorMsg >{formik.errors.file}</ErrorMsg>
                    ) : null}
                </Box>

                <Box mb={3}>
                    <FormLabel htmlFor="age">Tuổi:</FormLabel>
                    <CustomNumberInput
                        min={1}
                        max={117}
                        id="age"
                        type="number"
                        placeholder="age"
                        {...formik.getFieldProps('age')}
                    />

                    {formik.touched.age && formik.errors.age ? (
                        <ErrorMsg >{formik.errors.age}</ErrorMsg>
                    ) : null}
                </Box>

                <Box mb={3}>
                    <FormLabel htmlFor="gender">Giới tính:</FormLabel>
                    <CustomSelectInput
                        id="gender"
                        {...formik.getFieldProps('gender')}
                    >
                        <option value="" label="Chọn giới tính" />
                        <option value={1} label="nam" />
                        <option value={2} label="nữ" />
                        <option value={3} label="khác" />
                    </CustomSelectInput>

                    {formik.touched.gender && formik.errors.gender ? (
                        <ErrorMsg >{formik.errors.gender}</ErrorMsg>
                    ) : null}
                </Box>


                <Box mb={3}>
                    <FormLabel htmlFor="antecedent">Tiền sử bệnh tật:</FormLabel>
                    <CustomInput
                        id="antecedent"
                        type="text"
                        placeholder="antecedent"
                        {...formik.getFieldProps('antecedent')}
                    />

                    {formik.touched.antecedent && formik.errors.antecedent ? (
                        <ErrorMsg >{formik.errors.antecedent}</ErrorMsg>
                    ) : null}
                </Box>
                <Box display="flex" mb={3}>
                    <FormLabel
                        htmlFor="covid19"
                        mb={0}
                    >Đã xét nghiệm Covid19:</FormLabel>
                    <Checkbox
                        id="covid19"
                        type="checkbox"
                        placeholder="covid19"
                        borderColor="brand.100"
                        _dark={{ borderColor: 'brand.200' }}
                        size='lg'
                        {...formik.getFieldProps('covid19')}
                    > </Checkbox>
                    {formik.touched.covid19 && formik.errors.covid19 ? (
                        <ErrorMsg >{formik.errors.covid19}</ErrorMsg>
                    ) : null}
                </Box>

                {phoneError && <ErrorMsg>{phoneError}</ErrorMsg>}
                <Box display="flex" justifyContent="flex-end" >
                    <Btn type="submit" />
                </Box>
            </form>
        </Box >
    );
};

export default memo(PatientRegister);
