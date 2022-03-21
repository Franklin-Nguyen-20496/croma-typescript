
import React, { } from 'react';
import { Heading } from '@chakra-ui/react';
import ImageForm from './ImageForm';

const AdminRegister = () => {

    return (
        <div className="container">
            <Heading size="lg" textAlign="center">Tạo tài khoản</Heading>
            <ImageForm />
        </div>
    );
}

export default AdminRegister;
