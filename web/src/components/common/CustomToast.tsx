
import React from 'react';
import { useToast, Button } from '@chakra-ui/react'

type CustomToastProps = {}

const CustomToast = ({ }: CustomToastProps) => {
    const toast = useToast()
    return (
        <Button
            onClick={() =>
                toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }
        >
            Show Toast
        </Button>
    )
};

export default CustomToast;