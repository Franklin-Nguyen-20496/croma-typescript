import React from 'react';
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useColorMode,
} from '@chakra-ui/react'

interface Props {
    id?: string;
    value?: any;
    type?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    onChange?: (e: any) => void;
    onBlur?: (e: any) => void;
    onFocus?: (e: any) => void;
    onKeyDown?: (e: any) => void;
    onKeyUp?: (e: any) => void;
    onClick?: (e: any) => void;
}

const CustomNumberInput = (props: Props) => {
    const { min, max, ...moreProps } = props;
    const { colorMode } = useColorMode();

    return (
        <NumberInput
            min={min}
            max={max}
        >
            <NumberInputField
                h={9}
                borderRadius="50px"
                borderColor={colorMode === 'light' ? 'brand.100' : 'brand.200'}
                _hover={{ borderColor: colorMode === 'light' ? 'brand.100' : 'brand.200' }}
                {...moreProps}
            />
            <NumberInputStepper
                mr={4}
                borderWidth="1px"
                borderColor={colorMode === 'light' ? 'brand.100' : 'brand.200'}
            >
                <NumberIncrementStepper borderColor={colorMode === 'light' ? 'brand.100' : 'brand.200'} />
                <NumberDecrementStepper borderColor={colorMode === 'light' ? 'brand.100' : 'brand.200'} />
            </NumberInputStepper>
        </NumberInput>
    );
}

export default CustomNumberInput;