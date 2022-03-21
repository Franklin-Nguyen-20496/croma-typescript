
import React, { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { Box, Avatar, Text } from '@chakra-ui/react';

import WaitingPatient, { waitingPatient } from '../../../Interfaces/waitingPatient.interface';

interface Props {
    id: string;
}

const WaitingPatientItem = ({ id }: Props) => {
    const [item, setItem] = useState(waitingPatient);
    useLayoutEffect(() => {
        axios({
            method: 'get',
            url: `/waiting/get-one/${id}`
        })
            .then(res => {
                if (res.data.data) {
                    setItem(res.data.data);
                }
            })
    }, [id])
    return (

        <Box display="flex">
            <Avatar
                w="6.8rem"
                h="6.8rem"
                src={item.file}
            >
            </Avatar>
            <Box flex={1}>
                {item.name && <Text >{item.name}</Text>}
                {item.score && <Text>Tình trạng: {item.score}</Text>}
            </Box>
        </Box>
    );
}

export default WaitingPatientItem;
