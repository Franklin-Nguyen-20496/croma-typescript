import React, { forwardRef } from 'react';
import { Input, useColorMode } from '@chakra-ui/react';

interface Props {
    id?: string;
    value?: any;
    type?: string;
    placeholder?: string;
    name?: string;
    onChange?: (e: any) => void;
    onBlur?: (e: any) => void;
    onFocus?: (e: any) => void;
    onKeyDown?: (e: any) => void;
    onKeyUp?: (e: any) => void;
    onClick?: (e: any) => void;
    autoComplete?: string;
}

const CustomInput = forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>((props: Props, ref?: React.LegacyRef<HTMLInputElement>) => {
    const { colorMode } = useColorMode();

    return (
        <Input
            h={9}
            borderRadius="50px"
            borderColor={colorMode === 'light' ? 'brand.100' : 'brand.200'}
            _hover={{ borderColor: colorMode === 'light' ? 'brand.100' : 'brand.200' }}
            ref={ref}
            {...props}
        />
    );
});

export default CustomInput;