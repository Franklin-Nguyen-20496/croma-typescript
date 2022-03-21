
import React, { useState, useEffect, memo } from 'react';
import {
    Box,
    Avatar,
} from '@chakra-ui/react';

interface Props {
    file?: Blob | string;
}

const PreviewImg = ({ file }: Props) => {
    const [preview, setPreview] = useState('');
    useEffect(() => {
        if (file && typeof file === 'object') {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPreview(reader.result as string);
            }
        }
    }, [file])

    return (
        <Box display='flex' justifyContent='center' alignItems='center' m='auto'>
            <Avatar mx="auto" mt={4} size='2xl'
                src={preview}
            >
            </Avatar>
        </Box>
    );
}

export default memo(PreviewImg);
