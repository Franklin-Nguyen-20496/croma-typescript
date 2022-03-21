
import React, { useEffect, useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { StateRedux } from '../../../redux/reducers';
import actions from '../../../redux/actions';
import { role } from '../../../helpers/user.role.helper';
const { setAllUsers } = actions;

const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector((state: StateRedux) => state.account.account);

    //check role
    useLayoutEffect(() => {
        if (profile && profile.role !== role.ADMIN) {
            navigate('/')
        }
    })

    useEffect(() => {
        axios({
            method: 'get',
            url: '/users',
        })
            .then(res => {
                console.log('res', res)
                const { message, data } = res.data;
                if (data) {
                    dispatch(setAllUsers(data));
                }
                else console.log(message);
            })
            .catch(err => console.log(err))
    }, [dispatch]);

    return (
        <Outlet />
    );
}

export default Admin;
