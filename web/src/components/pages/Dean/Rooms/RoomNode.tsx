import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Room from '../../../../Interfaces/room.interface';

type RoomNodeProps = {
    room: Room;
}

const RoomNode = ({ room }: RoomNodeProps) => (
    <Box
        w={8} h={8}
        position='relative'
        className='room-node'
        _dark={{ bg: 'yellow.300' }}
        _light={{ bg: 'yellow.500' }}
    >
        <Box
            display='none'
            sx={{
                '.room-node:hover': {
                    display: 'block'
                }
            }}
            position='absolute'
            top={0} left={0}
        >
            <Text>{room.name}</Text>
        </Box>
    </Box>
);

export default RoomNode;