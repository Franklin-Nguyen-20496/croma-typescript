import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import FormData from 'form-data';
import { useDispatch } from 'react-redux';
import { useToast, Box, Avatar } from '@chakra-ui/react';
import _ from 'lodash';

import PreviewImg from '../../../common/PreviewImg';
import actions from '../../../../redux/actions';
import Btn from '../../../common/Btn';
import ErrorMsg from '../../../common/ErrorMessage';
import CustomInput from '../../../common/CustomInput';
import CustomSelectInput from '../../../common/CustomSelectInput';
import User, { initialUser } from '../../../../Interfaces/user.interface';
import Action from '../../../../Interfaces/action.interface';

const { updateOneUser } = actions;

type Props = {
    user?: User;
    dispatch: (action: Action) => void;
}

const ImageForm = ({ user, dispatch }: Props) => {

    const [initialUser, setInitialUser] = useState(user);
    const ReduxDispatch = useDispatch()
    const [error, setError] = useState('');
    const toast = useToast();

    useEffect(() => {
        setInitialUser(user);
    }, [user])

    const formik = useFormik({
        initialValues: initialUser || {
            file: '',
            firstName: '',
            lastName: '',
            email: '',
            age: '',
            address: '',
            position: '',
            role: '',
        },
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            file: yup.mixed().nullable(),
            firstName:
                yup.string()
                    .max(16, 'Quá dài, tối đa là 32 ký tự')
                    .required('Bạn chưa nhập họ và tên!'),
            lastName:
                yup.string()
                    .max(16, 'Quá dài, tối đa là 16 ký tự')
                    .required('Bạn chưa nhập họ và tên!'),
            email:
                yup.string()
                    .email('Email không tồn tại, vui lòng kiểm tra lại!')
                    .required('Bạn chưa nhập email!'),
            age:
                yup.number()
                    .min(0, 'Tuổi không hợp lệ')
                    .max(117, 'Really? The oldest person in the world is 117 years old :))')
                    .required('Bạn chưa nhập tuổi'),
            address:
                yup.string()
                    .max(125, 'Quá dài, địa chỉ tối da 125 kí tự')
                    .required('Bạn chưa nhập địa chỉ'),
            position:
                yup.number()
                    .required('Bạn chưa chọn khoa'),
            role:
                yup.number()
                    .required('Bạn chưa chọn vai trò'),
        }),
        validate: values => {
            let errors = {}
            return errors
        },
        onSubmit: async (values, { resetForm, setFieldValue }) => {
            console.log(values, 'values');
            const { file, ...user } = values;
            if (_.isEqual(values, initialUser)) {
                toast({
                    title: 'Thông báo',
                    description: 'Bạn chưa thay đổi gì!',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom-left',
                });
                return;
            }

            if (typeof (file) !== 'string') {
                let bodyFormData = new FormData();
                bodyFormData.append('file', file);

                await axios({
                    method: 'post',
                    url: '/file/upload',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: bodyFormData
                })
                    .then(res => {
                        console.log(res)
                        const newFile = res.data;
                        const newUser = {
                            ...user,
                            file: newFile,
                        }
                        console.log('newUser', newUser);

                        axios({
                            method: 'put',
                            url: '/users/update',
                            // headers: { 'Content-Type': 'application/json' },
                            data: newUser,
                        })
                            .then((response) => {
                                console.log('response /users/create', response);
                                const { message, data } = response.data;
                                if (data) {
                                    toast({
                                        title: 'Chỉnh sửa tài khoản!',
                                        description: "Đã chỉnh sửa thành công tài khoản!",
                                        status: 'success',
                                        duration: 8000,
                                        isClosable: true,
                                        position: 'bottom-left',
                                    })
                                    resetForm();
                                    setError('');
                                    ReduxDispatch(updateOneUser(data));
                                    setInitialUser(data);
                                }
                                else {
                                    setError(message);
                                    toast({
                                        title: 'Chỉnh sửa tài khoản!',
                                        description: message,
                                        status: 'error',
                                        duration: 8000,
                                        isClosable: true,
                                        position: 'bottom-left',
                                    })
                                }
                            })
                            .catch((error) => {
                                console.log('error', error);
                                axios({
                                    method: 'delete',
                                    url: newFile,
                                })
                                    .then((response2) => {
                                        console.log('response in delete photo', response2);
                                    })
                                    .catch((error2) => {
                                        console.log('error in delete photo', error2);
                                    })
                            })
                    })
                    .catch((err) => {
                        console.log('err', err);
                    })
            }
            else {
                const newUser = {
                    ...user,
                    file: initialUser ? initialUser.file : '',
                }
                axios({
                    method: 'put',
                    url: '/users/update',
                    data: newUser,
                })
                    .then((response) => {
                        console.log('response /users/create', response);
                        const { message, data } = response.data;
                        if (data) {
                            toast({
                                title: 'Chỉnh sửa tài khoản!',
                                description: "Đã chỉnh sửa thành công tài khoản mới!",
                                status: 'success',
                                duration: 8000,
                                isClosable: true,
                                position: 'bottom-left',
                            })
                            resetForm();
                            setError('');
                            ReduxDispatch(updateOneUser(data));
                            setInitialUser(data);
                        }
                        else {
                            setError(message);
                            toast({
                                title: 'Chỉnh sửa tài khoản!',
                                description: message,
                                status: 'error',
                                duration: 8000,
                                isClosable: true,
                                position: 'bottom-left',
                            })
                        }
                    })
                    .catch(err => console.log(err))
            }
        },
    })

    return (
        <Box maxWidth="30rem" mb="20vh" mx="auto">
            <form onSubmit={formik.handleSubmit}>
                <Box mb={4}>
                    <label htmlFor="firstName">Tên:</label>
                    <CustomInput
                        id="firstName"
                        type="text"
                        placeholder="first name"
                        {...formik.getFieldProps('firstName')}
                    />

                    {formik.touched.firstName && formik.errors.firstName ? (
                        <ErrorMsg >{formik.errors.firstName}</ErrorMsg>
                    ) : null}
                </Box>
                <Box mb={4}>
                    <label htmlFor="lastName">Họ:</label>
                    <CustomInput
                        id="lastName"
                        type="text"
                        placeholder="last name"
                        {...formik.getFieldProps('lastName')}
                    />

                    {formik.touched.lastName && formik.errors.lastName ? (
                        <ErrorMsg >{formik.errors.lastName}</ErrorMsg>
                    ) : null}
                </Box>

                <Box mb={4}>
                    <label htmlFor="email">Email:</label>
                    <CustomInput
                        id="email"
                        type="email"
                        placeholder="email"
                        {...formik.getFieldProps('email')}
                        autoComplete="email"
                    />

                    {formik.touched.email && formik.errors.email ? (
                        <ErrorMsg >{formik.errors.email}</ErrorMsg>
                    ) : null}
                </Box>

                <Box mb={4}>
                    <label htmlFor="file">Ảnh đại diện</label>
                    <CustomInput type="file"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                formik.setFieldValue("file", e.target.files[0]);
                            }
                        }}
                        name="file"
                    />
                    {formik.initialValues.file && typeof (formik.values.file) === 'string' &&
                        <Box mt={4} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            <Avatar size='2xl' src={formik.initialValues.file} />
                        </Box>}
                    {formik.values.file && typeof (formik.values.file) !== 'string' &&
                        <PreviewImg file={formik.values.file} />}
                    {formik.touched.file && formik.errors.file ? (
                        <ErrorMsg >{formik.errors.file}</ErrorMsg>
                    ) : null}
                </Box>

                <Box mb={4}>
                    <label htmlFor="age">Tuổi:</label>
                    <CustomInput
                        id="age"
                        {...formik.getFieldProps('age')}
                        type="number"
                        placeholder="age"
                    />
                    {formik.touched.age && formik.errors.age ? (
                        <ErrorMsg >{formik.errors.age}</ErrorMsg>
                    ) : null}
                </Box>

                <Box mb={4}>
                    <label htmlFor="address">Địa chỉ:</label>
                    <CustomInput id="address"
                        {...formik.getFieldProps('address')}
                        type="text"
                        placeholder="address"
                    />
                    {formik.touched.address && formik.errors.address ? (
                        <ErrorMsg >{formik.errors.address}</ErrorMsg>
                    ) : null}
                </Box>



                <Box mb={4}>
                    <label htmlFor="position">Nơi làm việc:</label>
                    <CustomSelectInput
                        id="position"
                        {...formik.getFieldProps('position')}
                    >
                        <option value="" label="Chọn vị trí" />
                        <option value={1} label="Khoa ngoại" />
                        <option value={2} label="Khoa tim mạch" />
                        <option value={3} label="Khoa hô hấp" />
                    </CustomSelectInput>
                    {formik.touched.position && formik.errors.position ? (
                        <ErrorMsg >{formik.errors.position}</ErrorMsg>
                    ) : null}
                </Box>


                <Box mb={4}>
                    <label htmlFor="role">Nơi làm việc:</label>
                    <CustomSelectInput
                        id="role"
                        {...formik.getFieldProps('role')}
                        type="text" >
                        <option value="" label="Chọn chức danh" />
                        <option value={2} label="Trưởng khoa" />
                        <option value={3} label="Bác sĩ" />
                        <option value={4} label="Y tá" />
                        <option value={5} label="Điều phối viên" />
                    </CustomSelectInput>
                    {formik.touched.role && formik.errors.role ? (
                        <ErrorMsg>{formik.errors.role}</ErrorMsg>
                    ) : null}
                </Box>
                <Box >
                    <ErrorMsg textAlign="end">{error}</ErrorMsg>
                </Box>

                <Box mt={4} display="flex" justifyContent="flex-end">
                    <Btn
                        mr={4} bg='red.600' type="button"
                        onClick={() => {
                            dispatch({
                                type: 'SET_UPDATE',
                                payload: false
                            })
                        }}
                    >
                        Hủy
                    </Btn>
                    <Btn type="submit">Lưu chỉnh sửa</Btn>
                </Box>
            </form>
        </Box>
    );
}

export default ImageForm;
