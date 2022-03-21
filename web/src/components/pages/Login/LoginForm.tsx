import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Heading,
    Box,
    useToast,
} from '@chakra-ui/react';

import Btn from '../../common/Btn';
import { checkNavigation } from '../../../helpers/navigate.helper';
import CustomInput from '../../common/CustomInput';
import ErrorMsg from '../../common/ErrorMessage';
import actions from '../../../redux/actions';
const { notifyInfo, notifyError, setAccount, hideNotify } = actions;


const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email không tồn tại, vui lòng kiểm tra lại!')
                .required('Bạn chưa nhập email!'),
            password: Yup.string()
                .required('Bạn chưa nhập mật khẩu!')
        }),

        onSubmit: (values, { resetForm }) => {
            console.log('values', values);

            axios({
                method: 'post',
                url: '/auth/login',
                data: values,
            })
                .then(res => {
                    console.log('res', res);
                    const { access_token, refresh_token, data } = res.data;
                    console.log('res.data', res.data)
                    dispatch(setAccount({
                        access_token: access_token,
                        refresh_token: refresh_token,
                        account: data,
                    }));

                    localStorage.setItem('access_token', JSON.stringify(access_token));
                    localStorage.setItem('refresh_token', JSON.stringify(refresh_token));
                    localStorage.setItem('profile', JSON.stringify(data));
                    axios.defaults.headers.common['Authorization'] = `bearer ${access_token}`;
                    toast({
                        position: 'bottom-left',
                        title: 'Đăng nhập thành công.',
                        description: `Xin chào ${data.firstName} ${data.lastName}.`,
                        status: 'success',
                        duration: 6000,
                        isClosable: true,
                    })
                    const link = checkNavigation(data.role);
                    navigate(link);
                })
                .catch(err => {
                    console.log('err', err);
                    toast({
                        position: 'bottom-left',
                        title: 'Đăng nhập thất bại.',
                        description: `Email hoặc mật khẩu không đúng.`,
                        status: 'error',
                        duration: 6000,
                        isClosable: true,
                    })
                });
        }
    });

    return (
        <Box maxWidth="32rem" mx="auto">

            <Heading size="lg" mb={4} textAlign="center">
                Đăng nhập
            </Heading>
            <form
                onSubmit={formik.handleSubmit}
            >

                <Box mb={4}>
                    <CustomInput
                        id="email"
                        type="text"
                        placeholder="Email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <ErrorMsg >{formik.errors.email}</ErrorMsg>
                    ) : null}
                </Box>

                <Box mb={4}>
                    <CustomInput
                        id="password"
                        type="password"
                        placeholder="Mật khẩu"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <ErrorMsg >{formik.errors.password}</ErrorMsg>
                    ) : null}
                </Box>
                <Box display="flex" justifyContent="flex-end">
                    <Btn type="submit" >Đăng nhập</Btn>
                </Box>
            </form>
        </Box>
    );
}

export default LoginForm;
