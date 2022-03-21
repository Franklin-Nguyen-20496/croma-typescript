
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    useColorMode,
    Button,
} from '@chakra-ui/react';

import { StateRedux } from '../../redux/reducers';
import actions from '../../redux/actions';

const { clearAccount } = actions;

type Button = {
    id: number;
    title: string;
    navigate: string[];
}

type User = {
    role: number;
    buttons: Button[];
}

const navigateButtons: User[] = [
    {
        role: 1,
        buttons: [
            {
                id: 1,
                title: 'Sơ đồ tổ chức',
                navigate: ['/admin/schema/1', '/admin/schema/2', '/admin/schema/3'],
            },
            {
                id: 2,
                title: 'Tạo tài khoản',
                navigate: ['/admin/register'],
            },
            {
                id: 3,
                title: 'Phòng bệnh',
                navigate: ['/admin/rooms'],
            },
            {
                id: 4,
                title: 'Kho thuốc',
                navigate: ['/admin/medicine'],
            },
        ]
    },
    {
        role: 2,
        buttons: [
            {
                id: 5,
                title: 'Phòng bệnh',
                navigate: ['/dean/rooms/'],
            },
            {
                id: 6,
                title: 'Chọn | Chuyển phòng bệnh',
                navigate: ['/dean/patient-transfer'],
            },
            {
                id: 7,
                title: 'Chọn y tá | bác sĩ',
                navigate: ['/dean/patient-transfer'],
            },
        ]

    },
    {
        role: 3,
        buttons: [
            {
                id: 8,
                title: 'Bệnh nhân của tôi',
                navigate: ['/doctor/my-patients'],
            },
            {
                id: 9,
                title: 'Chăm sóc bệnh nhân',
                navigate: ['/doctor/patient-check'],
            },
            {
                id: 10,
                title: 'Công thức thuốc',
                navigate: ['/doctor/recipes'],
            },
            {
                id: 11,
                title: 'Khám bệnh',
                navigate: ['/doctor/waiting-patient'],
            },
        ],
    },
    {
        role: 4,
        buttons: [
            {
                id: 12,
                title: 'Chăm sóc bệnh nhân',
                navigate: ['/nurse'],
            },
        ]
    },
    {
        role: 5,
        buttons: [
            {
                id: 13,
                title: 'Điều phối',
                navigate: ['/coordinator'],
            },
        ]
    },
    {
        role: 6,
        buttons: [
            {
                id: 14,
                title: 'Đăng ký khám bệnh',
                navigate: ['/patient/register'],
            },
            {
                id: 15,
                title: 'Tra cứu thông tin',
                navigate: ['/patient/info'],
            },
        ]
    },
]

type NavbarProps = {
    showNavbar: boolean;
}

const Navbar = ({ showNavbar }: NavbarProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { colorMode } = useColorMode();
    const profile = useSelector((state: StateRedux) => state.account.account);
    const [buttons, setButtons] = useState<Button[]>([]);

    useEffect(() => {
        if (profile && profile.id) {
            const user = navigateButtons.find((user: User) => user.role === profile.role);
            if (user) {
                setButtons(user.buttons);
            }
        }
        else {
            const user = navigateButtons.find((user: User) => user.role === 6);
            if (user) {
                setButtons(user.buttons);
            }
        }
    }, [profile]);

    return (
        <Box
            position="fixed"
            zIndex={11}
            bg={colorMode === 'dark' ? 'gray.800' : 'white'}
            height="calc(100vh - 50px)"
            overflowX="hidden"
            overflowY="auto"
            w={200}
            left={0}
            top={12}
            pt={12}
            borderRightWidth={1}
            transform={showNavbar ? 'translate(-100%)' : 'translate(0)'}
            transition="all 0.3s ease-in-out"
            onClick={(e) => {
                e.stopPropagation();
            }}
            display='flex'
            flexDirection='column'
            sx={{
                '&::-webkit-scrollbar': {
                    display: 'none',
                }
            }}
            _hover={{
                '&::-webkit-scrollbar': {
                    display: 'block'
                }
            }}
            _dark={{
                '&::-webkit-scrollbar': {
                    backgroundColor: 'gray.800',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: 'gray.800',
                },
                '&::-webkit-scrollbar-thumb': {
                    boxShadow: 'inset 0 0 16px rgba(255, 255, 255, 0.3)',
                }
            }}
            _light={{
                '&::-webkit-scrollbar': {
                    backgroundColor: 'white',
                }
            }}
        >   <Box flex={1}>
                <Button
                    width="100%"
                    onClick={() => navigate('/')}
                    borderRadius={0}
                    bgGradient={window.location.pathname === '/' ? 'linear(to-r, brand.100, brand.200)' : 'none'}
                    borderBottomWidth={1}
                    _first={{
                        borderTopWidth: '1px',
                    }}
                    justifyContent='center'
                    px={4}
                >
                    Trang chủ
                </Button>

                {buttons.map((button: Button) => (
                    <Button
                        key={button.id}
                        width="100%"
                        onClick={() => navigate(button.navigate[0])}
                        borderRadius={0}
                        bgGradient={button.navigate.find(item => item === window.location.pathname) ? 'linear(to-r, brand.100, brand.200)' : 'none'}
                        borderBottomWidth={1}
                        _first={{
                            borderTopWidth: '1px',
                        }}
                        justifyContent='center'
                        px={4}
                    >
                        {button.title}
                    </Button>
                ))}
            </Box>
            <Box>
                {(profile && profile.id) ?
                    <Button
                        width="100%"
                        onClick={() => {
                            dispatch(clearAccount());
                            localStorage.clear();
                            navigate('/login');
                        }}
                        borderRadius={0}
                        bgGradient='none'
                        borderBottomWidth={1}
                        _first={{
                            borderTopWidth: '1px',
                        }}
                        justifyContent='center'
                        px={4}
                    >
                        Đăng xuất
                    </Button>
                    :
                    <Button
                        width="100%"
                        onClick={() => navigate('/login')}
                        borderRadius={0}
                        bgGradient={window.location.pathname === '/login' ? 'linear(to-r, brand.100, brand.200)' : 'none'}
                        borderBottomWidth={1}
                        _first={{
                            borderTopWidth: '1px',
                        }}
                        justifyContent='center'
                        px={4}
                    >
                        Đăng nhập
                    </Button>}
            </Box>
        </Box>
    )
};

export default Navbar;