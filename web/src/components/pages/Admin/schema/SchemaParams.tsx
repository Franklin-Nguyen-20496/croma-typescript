
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useOutletContext } from "react-router-dom";
import { useSelector } from 'react-redux';
import {
    Heading,
    Box,
    Alert,
    AlertIcon,
    Grid,
    useColorMode,
} from '@chakra-ui/react';

import { StateRedux } from '../../../../redux/reducers';
import UserItem from './UserItem';
import User, { initialUser } from '../../../../Interfaces/user.interface';
import { InitialState } from './index';
import Action from '../../../../Interfaces/action.interface';

type ContextType = {
    state: InitialState;
    dispatch: React.Dispatch<Action>;
    handleScroll: () => void;
    handleDeleteUser: () => void;
}

const SchemaParams = () => {
    const { colorMode } = useColorMode();
    const params = useParams();
    const classId = Number(params.classId);
    const { state, dispatch, handleScroll, handleDeleteUser } = useOutletContext<ContextType>();
    const users = useSelector((state: StateRedux) => state.users.list);
    const [users2, setUsers2] = useState<User[]>([]);
    const [users3, setUsers3] = useState<User[]>([]);

    useEffect(() => {
        const list2 = users.filter(value => {
            return value.position === classId && value.role === 2;
        })
        setUsers2(list2)
        const list3 = users.filter(value => {
            return value.position === classId && value.role === 3
        })
        setUsers3(list3)
    }, [users, classId])

    return (
        <Box mb={8}>
            <Box
                display={{ base: 'none', sm: 'grid' }}
                gridAutoFlow="column dense"
                transform="translateY(50%)"
            >
                <Box>
                    <Box display="flex" justifyContent="center">
                        <Box
                            opacity={classId === 1 ? '1' : '0'}
                            transform="rotate(45deg)"
                            w={8} h={8}
                            bg="gray.300"
                            transition='all .3s ease-in-out'
                        >
                        </Box>
                    </Box>
                </Box>

                <Box>
                    <Box display="flex" justifyContent="center">
                        <Box
                            opacity={classId === 2 ? '1' : '0'}
                            transform="rotate(45deg)"
                            w={8} h={8}
                            bg="gray.300"
                            transition='all .3s ease-in-out'
                        >
                        </Box>
                    </Box>
                </Box>

                <Box>
                    <Box display="flex" justifyContent="center">
                        <Box
                            opacity={classId === 3 ? '1' : '0'}
                            transform="rotate(45deg)"
                            w={8} h={8}
                            bg="gray.300"
                            transition='all .3s ease-in-out'
                        >
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box
                color='gray.800'
                bg="gray.300"
                p={4}
                borderRadius={16}
                transition='all .3s ease-in-out'
            >
                <Box mb={4} >
                    <Heading size="md" mb={2}>Trưởng khoa</Heading>
                    {users2.length > 0 ?
                        <Grid
                            templateColumns={{
                                base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)'
                            }}
                            mb={4}
                            gap={2}
                        >
                            {users2.map((value, index) => (
                                <UserItem
                                    key={value.id}
                                    user={value}
                                    show={state.user.id === value.id && state.showMenu}
                                    onClick={() => {
                                        dispatch({
                                            type: 'SET_USER',
                                            payload: value
                                        })
                                        dispatch({ type: 'TOGGLE_MENU' })
                                    }}
                                    handleShowInfo={() => dispatch({
                                        type: 'SET_SHOW_INFO',
                                        payload: true
                                    })}
                                    handleUpdate={() => {
                                        dispatch({
                                            type: 'SET_SHOW_MENU_FALSE',
                                        })
                                        dispatch({
                                            type: 'SET_UPDATE',
                                            payload: true,
                                        })
                                        handleScroll()
                                    }}
                                    handleDelete={() => {
                                        dispatch({
                                            type: 'SET_DELETE',
                                            payload: true,
                                        })
                                    }}
                                />
                            ))}

                        </Grid>
                        :
                        <Alert bg='blue.300' status='info' w="100%">
                            <AlertIcon />
                            Chưa có trưởng khoa nào!
                        </Alert>
                    }
                </Box>
                <Box>
                    <Heading size="md" mb={2}>Bác sĩ</Heading>
                    {users3.length > 0 ?
                        <Grid
                            templateColumns={{
                                base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)'
                            }}
                            mb={4}
                            gap={2}
                        >

                            {users3.map((value, index) => (
                                <UserItem
                                    key={value.id}
                                    user={value}
                                    show={state.user.id === value.id && state.showMenu}
                                    onClick={() => {
                                        dispatch({
                                            type: 'SET_USER',
                                            payload: value
                                        })
                                        dispatch({ type: 'TOGGLE_MENU' })
                                        dispatch({
                                            type: 'SET_UPDATE', payload: false,
                                        })
                                    }}
                                    handleShowInfo={() => dispatch({
                                        type: 'SET_SHOW_INFO',
                                        payload: true
                                    })}
                                    handleUpdate={() => {
                                        dispatch({
                                            type: 'SET_UPDATE',
                                            payload: true,
                                        })
                                        dispatch({
                                            type: 'SET_SHOW_MENU_FALSE',
                                        })
                                        handleScroll()
                                    }}
                                    handleDelete={() => {
                                        dispatch({
                                            type: 'SET_DELETE',
                                            payload: true,
                                        })
                                    }}
                                />
                            ))}
                        </Grid>
                        :
                        <Alert bg='blue.300' status='info' w="100%">
                            <AlertIcon />
                            Chưa có bác sĩ nào!
                        </Alert>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default SchemaParams;
