
import React from 'react';
import { Select, useColorMode } from '@chakra-ui/react';

interface Props {
    id?: string;
    value?: any;
    type?: string;
    placeholder?: string;
    onChange?: (e: any) => void;
    onBlur?: (e: any) => void;
    onFocus?: (e: any) => void;
    onKeyDown?: (e: any) => void;
    onKeyUp?: (e: any) => void;
    onClick?: (e: any) => void;
    children: React.ReactNode;
}

const CustomSelectInput = ({ children, ...more }: Props) => {
    const { colorMode } = useColorMode();

    return (
        <Select
            h={9}
            borderRadius="50px"
            borderColor={colorMode === 'light' ? 'brand.100' : 'brand.200'}
            _hover={{ borderColor: colorMode === 'light' ? 'brand.100' : 'brand.200' }}
            {...more}
        >
            {children}
        </Select>
    );
}

export default CustomSelectInput;