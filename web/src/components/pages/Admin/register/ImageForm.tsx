import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import FormData from 'form-data';
import { useDispatch } from 'react-redux';
import { useToast, Box, Text } from '@chakra-ui/react'

import PreviewImg from '../../../common/PreviewImg';
import actions from '../../../../redux/actions/';
import Btn from '../../../common/Btn';
import ErrorMsg from '../../../common/ErrorMessage';
import CustomInput from '../../../common/CustomInput';
import CustomSelectInput from '../../../common/CustomSelectInput';

const { addOneUser } = actions;

const ImageForm = () => {
    const dispatch = useDispatch()
    const [error, setError] = useState('');
    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            file: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            age: '',
            address: '',
            position: '',
            role: '',
        },

        validationSchema: yup.object().shape({
            file: yup.mixed()
                .required('Chưa có ảnh đại diện!'),
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
            password:
                yup.string()
                    .min(8, 'Quá ngắn, mật khẩu tối tối thiểu 8 kí tự')
                    .max(32, 'Quá dài, mật khẩu tối da 32 kí tự')
                    .required('Bạn chưa nhập mật khẩu!'),
            confirmPassword:
                yup.string().when("password", {
                    is: (val: string) => (val && val.length > 0 ? true : false),
                    then: yup.string().trim().oneOf(
                        [yup.ref("password")],
                        "Mật khẩu không khớp!"
                    )
                }),
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

            // if (values.file.length === 0) {
            //     errors.file = "This is required."
            // } else {
            //     let type = values.file.type.split("/")[0];

            //     if (type !== "image") {
            //         errors.file = "The Uploaded file must be a Image."
            //     }
            // }

            return errors
        },
        onSubmit: async (values, { resetForm }) => {

            // console.log(values);
            const { file, ...user } = values;

            // read file image from element HTML
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
                        method: 'post',
                        url: '/users/create',
                        // headers: { 'Content-Type': 'application/json' },
                        data: newUser,
                    })
                        .then((response) => {
                            console.log('response /users/create', response);
                            const { message, data } = response.data;
                            if (data) {
                                toast({
                                    title: 'Tài khoản được tạo!',
                                    description: "Đã tạo thành công tài khoản mới!",
                                    status: 'success',
                                    duration: 8000,
                                    isClosable: true,
                                    position: 'bottom-left',
                                })

                                resetForm();
                                setError('');
                                dispatch(addOneUser(data));
                            }
                            else {
                                setError(message);
                                toast({
                                    title: 'Lỗi khi tạo tài khoản!',
                                    description: message,
                                    status: 'error',
                                    duration: 8000,
                                    isClosable: true,
                                    position: 'bottom-left',
                                })
                            }
                        })
                        .catch((error) => {
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
                    <label htmlFor="password">Mật khẩu:</label>
                    <CustomInput id="password"
                        {...formik.getFieldProps('password')}
                        type="password"
                        placeholder="password"
                        autoComplete="new-password"
                    />

                    {formik.touched.password && formik.errors.password ? (
                        <ErrorMsg >{formik.errors.password}</ErrorMsg>
                    ) : null}
                </Box>


                <Box mb={4}>
                    <label htmlFor="confirmPassword">Xác minh mật khẩu:</label>
                    <CustomInput
                        id="confirmPassword"
                        {...formik.getFieldProps('confirmPassword')}
                        type="password"
                        placeholder="confirmPassword"
                        autoComplete="confirm-password"
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <ErrorMsg >{formik.errors.confirmPassword}</ErrorMsg>
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
                    {formik.values.file && <PreviewImg file={formik.values.file} />}
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
                        <option value={2} label="Khoa hô hấp" />
                        <option value={3} label="Khoa tim mạch" />
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
                <Box mb={4}>
                    <ErrorMsg textAlign="end">{error}</ErrorMsg>
                </Box>

                <Box display="flex" justifyContent="flex-end" mt={4}>
                    <Btn type="submit">Tạo tài khoản</Btn>
                </Box>
            </form>
        </Box>
    );
}

export default ImageForm;
