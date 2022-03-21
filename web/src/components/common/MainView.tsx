
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    useColorMode,
    Button,
    useBreakpointValue,
    Icon
} from '@chakra-ui/react';
// import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

interface BUTTON {
    id: number;
    title: string;
    navigate: string;
}

interface Props {
    children?: React.ReactNode;
    showNavbar: boolean;
    setShowNavbar: (showNavbar: boolean) => void;
}

const MainView = (props: Props) => {
    const {
        children,
        showNavbar,
        setShowNavbar,
    } = props;
    const navigate = useNavigate();
    // const { colorMode } = useColorMode();
    const display = useBreakpointValue({ base: 'none', xl: 'block' });
    const pseudoBox = useBreakpointValue({ base: 'none', xl: 'block' });

    useEffect(() => {
        if (display === 'block' && setShowNavbar) {
            setShowNavbar(false);
        }
        else setShowNavbar(true);
    }, [display, setShowNavbar])

    useEffect(() => {
        const handleShowNavbar = () => {
            setShowNavbar(true);
        }

        if (pseudoBox === 'none') {
            window.addEventListener('click', handleShowNavbar);
        }
        else {
            window.removeEventListener('click', handleShowNavbar);
        }

        return () => {
            window.removeEventListener('click', handleShowNavbar);
        }
    }, [pseudoBox, setShowNavbar])

    return (
        <Box display="flex" pt={12} >

            <Box
                width={showNavbar ? '0px' : '200px'}
                transition="all 0.3s ease-in-out"
                display={pseudoBox}
            >
            </Box>

            <Container
                maxWidth='container.xl'
                mt={12}
                flex={1}
            >
                {children}
            </Container>
        </Box >
    );
}

export default MainView;
