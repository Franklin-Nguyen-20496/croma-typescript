
import React from 'react';
import { Center, Spinner } from '@chakra-ui/react';

type LoadingProps = {}

const Loading = ({ }: LoadingProps) => (
    <Center
        w="100%"
        height="calc(100vh - 48px)"
    >
        <Spinner size='lg' />
    </Center>
);

export default Loading