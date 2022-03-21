
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdDarkMode } from 'react-icons/md';
import { BsFillSunFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import {
    Container,
    Box,
    useColorMode,
    useColorModeValue,
    Icon,
    Button,
    Avatar,
} from '@chakra-ui/react';

// import Btn from "../../common/Btn";
import { StateRedux } from '../../../redux/reducers';
import userRoleHelper from '../../../helpers/user.role.helper';

type Props = {
    showNavbar: boolean;
    setShowNavbar: (showNavbar: boolean) => void;
}

const Header = ({ setShowNavbar, showNavbar }: Props) => {
    const profile = useSelector((state: StateRedux) => state.account.account);
    const { colorMode, toggleColorMode } = useColorMode();
    const icon = useColorModeValue(<Icon color="black.500" boxSize="1.2em" as={MdDarkMode} />, <Icon boxSize="1.2em" color="orange.700" as={BsFillSunFill} />)

    return (
        <Box
            w="100%"
            bgGradient="linear(to-r, brand.100, brand.200)"
            boxShadow="xl" rounded={0} zIndex={100}
            position="fixed"
            top={0}
            left={0}
        >
            <Container
                maxWidth="container.xl"
            >
                <Box h={12} display="flex" justifyContent="flex-end" alignItems="center" position="relative" >
                    <Button
                        w={10} h={10} borderRadius="50%"
                        onClick={toggleColorMode}
                        variant='outline'
                        outline={colorMode === 'light' ? 'none' : 'default'}
                    >
                        {icon}
                    </Button>

                    <Button
                        variant='outline'
                        ml={2}
                        leftIcon={<Icon as={FaUser} boxSize="1.2em" />}
                        outline={colorMode === 'light' ? 'none' : 'default'}
                    >
                        {profile.role ? `${userRoleHelper(profile.role)} ${profile.firstName}` : 'User'}
                    </Button>
                    <Box
                        position="absolute"
                        borderWidth="4px"
                        borderColor="gray.300"
                        transform="translateY(50%)"
                        sx={{
                            bottom: 0,
                            left: 0,
                        }}
                        borderRadius="50%"
                        boxShadow='lg'
                        zIndex={10}
                    >
                        <Avatar
                            src={profile.file}
                            title={profile.firstName ? `${profile.firstName} ${profile.lastName}` : ''}
                            size='lg'
                            cursor="pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('handle show navbar');
                                setShowNavbar(!showNavbar);
                            }}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Header;