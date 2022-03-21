
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import MainView from '../../common/MainView';
import Header from '../Header';

const buttons = [
    {
        id: 1,
        title: 'Đăng ký khám bệnh',
        navigate: '/patient/register',
    },
    {
        id: 2,
        title: 'Tra cứu thông tin',
        navigate: '/patient/info',
    },
]

const Patient = () => {
    const [phone, setPhone] = useState('');

    return (
        <Outlet context={{ phone, setPhone }} />
    )
}

export default Patient;
