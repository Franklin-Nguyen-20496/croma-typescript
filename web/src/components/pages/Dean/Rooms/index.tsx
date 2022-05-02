
import React, { useState, useEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, GridItem, Flex } from '@chakra-ui/react';

import RoomNode from './RoomNode';
import Btn from '../../../common/Btn';
import List from '../../../common/List';
import { StateRedux } from '../../../../redux/reducers';
import actions from '../../../../redux/actions';

const { getAllRooms } = actions;

const Rooms = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: StateRedux) => state.account.account);
    const rooms = useSelector((state: StateRedux) => state.rooms.list);

    useEffect(() => {
        dispatch(getAllRooms());
    }, [dispatch]);

    return (
        <Box className="mb-5 pb-5">
            <p className="fs-20 fw-600 mb-2">Admin/Giám đốc/trưởng khoa</p>

            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}>
                <GridItem>
                    <List
                        p={4}
                        bg="teal.400"
                        mb={4}
                        gap={4}
                        borderRadius={8}
                        items={rooms.filter(room => room.name > 100 && room.name < 200)}
                        item={RoomNode}
                    />
                    <List
                        p={4}
                        bg="teal.400"
                        mb={4}
                        gap={4}
                        borderRadius={8}
                        items={rooms.filter(room => room.name > 200 && room.name < 300)}
                        item={RoomNode}
                    />
                    <List
                        p={4}
                        bg="teal.400"
                        mb={4}
                        gap={4}
                        borderRadius={8}
                        items={rooms.filter(room => room.name > 300 && room.name < 400)}
                        item={RoomNode}
                    />
                </GridItem>
                <GridItem >

                </ GridItem>

            </Grid>

            <Box>
                <Btn>Thêm phòng</Btn>
            </Box>

            <Box className="row">
                <Box className="col-12 col-sm-6 mt-2 " >
                </Box>
            </Box>
        </Box>
    );
}

export default Rooms;