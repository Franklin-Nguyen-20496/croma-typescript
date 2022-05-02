import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { get } from 'lodash';

import Room from '../../../../Interfaces/room.interface';
import { motion } from 'framer-motion';
import checkPosition from '../../../../helpers/checkPosition.helper';

type RoomNodeProps = {
    item: Room;
}

const MotionBox = motion(Box);

const RoomNode = ({ item }: RoomNodeProps) => {
    const [show, setShow] = useState(false);
    console.log('state', show)

    return (
        <Box
            w={8} h={8}
            position='relative'
            className='room-node'
            _dark={{ bg: 'yellow.300' }}
            _light={{ bg: 'yellow.500' }}
            cursor='pointer'
            onMouseOver={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            <MotionBox
                position='absolute'
                top={0} left={0}
                w='200px' h='200px'
                bg='gray.300'
                borderRadius={8}
                zIndex={1}
                animate={{ scale: show ? 1 : 0.9, opacity: show ? 1 : 0, display: show ? 'block' : 'none' }}
                transition={{
                    duration: 0.3,
                    type: 'spring',
                }}
            >
                <Box>
                    <Box>{`Phòng số ${get(item, 'level')}`}</Box>
                    <Text>{`${get(item, 'name')}`}</Text>
                    <Text>{checkPosition(get(item, 'description'))}</Text>
                    <Text>{get(item, '') ? `Hiện tại có tổng cộng ${get(item, 'description')}` : `Hiện tại chưa có bệnh nhân nào.`}</Text>
                </Box>
            </MotionBox>
        </Box>
    )
};

export default RoomNode;