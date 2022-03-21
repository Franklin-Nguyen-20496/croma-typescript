
import React, { useEffect, useReducer, useRef } from 'react';
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
    Heading, Box, Grid, Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';

import UpdateForm from './UpdateForm';
import User, { initialUser } from '../../../../Interfaces/user.interface';
import Action from '../../../../Interfaces/action.interface';
import UserInfo from '../../../common/UserInfo';
import Btn from '../../../common/Btn';
import actions from '../../../../redux/actions';

const { deleteOneUser } = actions;

const list = [
    {
        id: 1,
        name: 'Khoa chấn thương',
        link: '/admin/schema/1',
        img: '/img/chan_thuong.png',
    },
    {
        id: 2,
        name: 'Khoa hô hấp',
        link: '/admin/schema/2',
        img: '/img/ho_hap.png',
    },
    {
        id: 3,
        name: 'Khoa tim mạch',
        link: '/admin/schema/3',
        img: '/img/tim.png',
    },
];

export interface InitialState {
    user: User;
    isUpdate: boolean;
    isShowInfo: boolean;
    isDelete: boolean;
    showMenu: boolean;
}

const initialState = {
    user: initialUser,
    showMenu: false,
    isUpdate: false,
    isShowInfo: false,
    isDelete: false,
}

const reducer = (state: InitialState, action: Action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload }
        case 'SET_UPDATE':
            return { ...state, isUpdate: action.payload }
        case 'SET_SHOW_INFO':
            return { ...state, isShowInfo: action.payload }
        case 'SET_DELETE':
            return { ...state, isDelete: action.payload }
        case 'SET_SHOW_MENU_FALSE':
            return { ...state, showMenu: false }
        case 'TOGGLE_MENU':
            return { ...state, showMenu: !state.showMenu }
        default:
            return state;
    }
}

const Schema = () => {
    const reduxDispatch = useDispatch();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const formElement = useRef<HTMLDivElement>(null);

    const handleCloseInfo = () => {
        dispatch({ type: 'SET_SHOW_INFO', payload: false })
        dispatch({ type: 'SET_SHOW_MENU_FALSE' })
    }

    const handleCloseConfirmDelete = () => {
        dispatch({ type: 'SET_DELETE', payload: false })
        dispatch({ type: 'SET_SHOW_MENU_FALSE' })
    }

    const handleDeleteUser = () => {
        if (state.user) {
            axios({
                method: 'delete',
                url: `/users/delete/${state.user.id}`
            })
                .then(res => {
                    const { message } = res.data;
                    if (message === 'success') {
                        reduxDispatch(deleteOneUser(state.user.id));
                        handleCloseConfirmDelete();
                    }
                })
                .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        const handleClickOutside = () => {
            dispatch({ type: 'SET_SHOW_MENU_FALSE' })
        }
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        }
    }, [])

    const handleScroll = () => {
        window.scroll({
            top: (formElement.current?.offsetTop),
            behavior: 'smooth'
        });
    }

    return (
        <div>
            <Heading size="lg" mb={4}>Sơ đồ tổ chức</Heading>
            <Grid
                templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' }}
                gap={4}
                mb={{ base: 6, sm: 0 }}
            >
                {list.map(item => (
                    <Box
                        key={item.id}
                        h={{ base: '24px', sm: '120px', md: '160px', lg: '200px', xl: '220px', '2xl': '240px' }}
                        cursor="pointer"
                        onClick={() => navigate(item.link)}
                    >
                        <Box
                            // display={{ base: 'none', sm: 'block' }}
                            backgroundImage={`url(${item.img})`}
                            backgroundSize="cover"
                            backgroundPosition="center"
                            borderRadius="8px"
                            w="100%"
                            h={{ base: 0, sm: 'calc(100% - 24px)' }}
                        >
                        </Box>
                        <Box
                            display="flex"
                            justifyContent={{ base: 'flex-start', sm: 'center' }}
                        >
                            <Text
                                className='text-one-line'
                                transition='all .3s ease-in-out'
                                width='100%'
                                textAlign={{ base: 'start', sm: 'center' }}
                                color={window.location.pathname === item.link ? 'red.500' : ''}
                                _hover={{ color: 'white', bg: "brand.200" }} p={1}
                            >
                                {item.name}
                            </Text>
                        </Box>
                    </Box>
                ))}
            </Grid>
            <Box>
                <Outlet context={{ state, dispatch, handleScroll, handleDeleteUser }} />
            </Box>
            <hr />
            <Heading size="lg" mt={4} mb={4} textAlign='center'>Cập nhật tài khoản!</Heading>

            <Box ref={formElement}>
                <UpdateForm dispatch={dispatch} user={state.isUpdate && state.user ? state.user : null} />
            </Box>

            <Modal isOpen={state.isShowInfo} onClose={handleCloseInfo}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Thông tin nhân viên</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <UserInfo item={state.user} />
                    </ModalBody>

                    <ModalFooter>
                        <Btn bg='red.700' type='button' mr={4} onClick={handleCloseInfo}>
                            Close
                        </Btn>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={state.isDelete} onClose={handleCloseConfirmDelete}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Xóa tài khoản</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <UserInfo item={state.user} position />
                        <Text textAlign='center' lineHeight={1.7}>Bạn có chắn chắn muốn xóa tài khoản này không?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Btn bg='red.700' type='button' mr={4} onClick={handleCloseConfirmDelete}>
                            Hủy
                        </Btn>
                        <Btn type='button' onClick={handleDeleteUser}>
                            Đồng ý
                        </Btn>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div >
    );
}

export default Schema;
