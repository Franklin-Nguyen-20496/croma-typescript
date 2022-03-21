import React from 'react';
import { Text } from '@chakra-ui/react';


interface Props {
    children?: React.ReactNode;
    textAlign?: string;
    w?: string | number;
    mb?: string | number;
}

const ErrorMsg = ({ children, textAlign, ...more }: Props) => {

    return (
        <Text
            color="red.500"
            sx={{ textAlign: 'end' }}
            {...more}
        >
            {children}
        </Text>
    );
}

export default ErrorMsg;
