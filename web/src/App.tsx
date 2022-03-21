
import React, { Suspense, lazy, useLayoutEffect, useEffect, createContext, useState } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from "socket.io-client";
import './App.scss';

import actions from './redux/actions';
import Loading from './components/common/Loading';
import MainView from './components/common/MainView';
import Header from './components/pages/Header';
import Navbar from './components/common/Navbar';
import SchemaParams from './components/pages/Admin/schema/SchemaParams';
import PatientRegister from './components/pages/Patient/Register';
import Information from './components/pages/Patient/Information';
import MyPatientsList from './components/pages/Doctor/MyPatientsList';
import WaitingPatientCheck from './components/pages/Doctor/WaitingPatientCheck';
import PatientCheck from './components/pages/Doctor/PatientCheck';
import MedicineRecipe from './components/pages/Doctor/MedicineRecipe';
import Rooms from './components/pages/Dean/Rooms';
import Selective from './components/pages/Dean/Selective';
import PatientTransfer from './components/pages/Dean/PatientTransfer';
import Account from './Interfaces/account.interface';

const Home = lazy(() => import('./components/pages/Home'));
const Login = lazy(() => import('./components/pages/Login'));
const Schema = lazy(() => import('./components/pages/Admin/schema'));
const Admin = lazy(() => import('./components/pages/Admin'));
const AdminRegister = lazy(() => import('./components/pages/Admin/register'));
const Medicine = lazy(() => import('./components/pages/Admin/medicine'))
const Patient = lazy(() => import('./components/pages/Patient'));
const Coordinator = lazy(() => import('./components/pages/Coordinator'));
const Doctor = lazy(() => import('./components/pages/Doctor'));
const Dean = lazy(() => import('./components/pages/Dean'));
const Nurse = lazy(() => import('./components/pages/Nurse'));


export const SocketContext = createContext<any>(null);

const socket = io(process.env.REACT_APP_BASE_URL, {
    reconnectionDelayMax: 10000,
    auth: {
        token: "123"
    },
});

const { setAccount, clearAccount } = actions;

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initNavbar = useBreakpointValue({ base: 'none', xl: 'block' });
    const [showNavbar, setShowNavbar] = useState<boolean>(initNavbar === 'block' ? true : false);

    useEffect(() => {
        const access_token: string = JSON.parse(localStorage.getItem('access_token') || '{}');
        const refresh_token: string = JSON.parse(localStorage.getItem('refresh_token') || '{}');
        const account: Account = JSON.parse(localStorage.getItem('profile') || '{}')
        console.log(account, access_token, refresh_token);
        if (account.id && access_token && refresh_token) {
            dispatch(setAccount({
                access_token: access_token,
                refresh_token: refresh_token,
                account: account,
            }));
        }
        else {
            dispatch(clearAccount());
        }
    }, []);

    //set up account and refresh token
    useLayoutEffect(() => {
        const baseURL = process.env.REACT_APP_BASE_URL;
        axios.defaults.baseURL = baseURL;
        const token = JSON.parse(localStorage.getItem('access_token') || '{}');
        console.log('token', token);
        if (token && typeof token === 'string') {
            axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
        }

        // some thing else to refresh token
        axios.interceptors.response.use((response) => {
            return response;
        }, async (error) => {
            console.log('something wrong in call API', error.response);
            const originalRequest = error.config;
            console.log('originalRequest', originalRequest);

            // 403 request
            if (error.response.status === 403 &&
                originalRequest.url === '/auth/refresh'
            ) {
                console.log('in api response 403 navigate login');
                dispatch(clearAccount());
                // dispatch(resetUsers());
                // dispatch(notifyError('Xác minh tài khoản của bạn'));
                navigate('/login');
                // setTimeout(() => {
                //     dispatch(hideNotify()) 
                // }, 4000)
                localStorage.clear();
                return Promise.reject(error);
            }

            // error 401 => refresh
            if (error.response.data.message === 'token_not_valid' &&
                error.response.status === 401 &&
                error.response.statusText === "Unauthorized") {

                const refreshToken = JSON.parse(localStorage.getItem('refresh_token') || '');
                console.log('refresh_token', refreshToken);
                axios.defaults.headers.common['Authorization'] = 'bearer ';

                if (refreshToken && typeof refreshToken === 'string') {
                    console.log('in call api refresh token');

                    await axios.post('/auth/refresh', { token: refreshToken })
                        .then(res => {
                            console.log('res in refresh token', res)
                            const { access_token, refresh_token, data } = res.data;
                            localStorage.setItem('access_token', JSON.stringify(access_token));
                            localStorage.setItem('refresh_token', JSON.stringify(refresh_token));
                            localStorage.setItem('profile', JSON.stringify(data));
                            dispatch(setAccount({
                                access_token: access_token,
                                refresh_token: refresh_token,
                                account: data,
                            }));

                            axios.defaults.headers.common['Authorization'] = `bearer ${access_token}`;
                            originalRequest.headers['Authorization'] = `bearer ${access_token}`;

                            return axios(originalRequest);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
                else {
                    console.log("Không tồn tại refresh token, đăng nhập lại");
                    navigate('/login');
                }
            }

            return Promise.reject(error);
        });
    }, [dispatch, navigate]);

    return (
        <React.Fragment>
            <SocketContext.Provider value={socket}>

                <Header
                    setShowNavbar={setShowNavbar}
                    showNavbar={showNavbar}
                ></Header>
                <Navbar
                    showNavbar={showNavbar}
                />
                <MainView
                    showNavbar={showNavbar}
                    setShowNavbar={setShowNavbar}
                >
                    <Suspense fallback={<Loading />} >
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/admin" element={<Admin />} >
                                <Route path="/admin" element={<Navigate replace to="/admin/schema/1" />} />
                                <Route path="/admin/register" element={<AdminRegister />} />
                                <Route path="/admin/rooms" element={<Rooms />} />
                                <Route path="/admin/medicine" element={<Medicine />} />
                                <Route path="/admin/schema" element={<Schema />} >
                                    <Route path="/admin/schema" element={<Navigate replace to="/admin/schema/1" />} />
                                    <Route path=":classId" element={<SchemaParams />} />
                                </Route>
                            </Route>

                            <Route path="/dean" element={<Dean />}>
                                <Route path="/dean" element={<Navigate replace to="/dean/rooms" />} />
                                <Route path="/dean/rooms" element={<Rooms />} />
                                <Route path="/dean/patient-transfer" element={<PatientTransfer />} />
                                <Route path="/dean/selective" element={<Selective />} />
                            </Route>

                            <Route path="/doctor" element={<Doctor />}>
                                <Route path="/doctor" element={<Navigate replace to="/doctor/my-patients" />} />
                                <Route path="/doctor/my-patients" element={<MyPatientsList />} />
                                <Route path="/doctor/waiting-patient" element={<WaitingPatientCheck />} />
                                <Route path="/doctor/patient-check" element={<PatientCheck />} />
                                <Route path="/doctor/recipes" element={<MedicineRecipe />} />
                            </Route>

                            <Route path="/coordinator" element={<Coordinator />} />

                            <Route path="/patient" element={<Patient />}>
                                <Route path="/patient" element={<Navigate replace to="/patient/register" />} />
                                <Route path="/patient/register" element={<PatientRegister />} />
                                <Route path="/patient/info" element={<Information />} />
                            </Route>

                            <Route path="/nurse" element={<Nurse />} />

                            <Route path="/" element={<Home />} />
                            <Route path="/*" element={<Navigate replace to="/" />} />
                        </Routes>

                    </Suspense>
                </MainView>
            </SocketContext.Provider >
        </React.Fragment>
    );
}

export default App;
