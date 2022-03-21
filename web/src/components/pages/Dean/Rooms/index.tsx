
import React, { useState, useEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, GridItem } from '@chakra-ui/react';

import RoomNode from './RoomNode';
import Btn from '../../../common/Btn';
import { StateRedux } from '../../../../redux/reducers';
import actions from '../../../../redux/actions';

const { getAllRooms } = actions;

const Rooms = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: StateRedux) => state.account.account);
    const rooms = useSelector((state: StateRedux) => state.rooms.list);
    console.log('rooms', rooms);

    useEffect(() => {
        dispatch(getAllRooms());
    }, [dispatch]);

    return (
        <Box className="mb-5 pb-5">
            <p className="fs-20 fw-600 mb-2">Admin/Giám đốc/trưởng khoa</p>

            <Box>
                <Box >
                    <Box
                        p={4} bg="teal.400" mb={4} display='flex' gap={4}
                        flexWrap='wrap'
                    >
                        {
                            rooms.length > 0 && rooms.map(room => {
                                if (room.name > 300 && room.name < 400) {
                                    return (
                                        <GridItem key={room.id}>
                                            <RoomNode
                                                room={room}
                                            />
                                        </GridItem>
                                    )
                                }
                                else return null;
                            })}
                    </Box>

                    <Box
                        p={4} bg="teal.400" mb={4} display='flex' gap={4}
                        flexWrap='wrap'
                    >
                        {
                            rooms.length > 0 && rooms.map(room => {
                                if (room.name > 200 && room.name < 300) {
                                    return (
                                        <GridItem key={room.id}>
                                            <RoomNode
                                                room={room}
                                            />
                                        </GridItem>
                                    )
                                }
                                else return null;
                            })}
                    </Box>

                    <Box
                        p={4} bg="teal.400" mb={4} display='flex' gap={4}
                        flexWrap='wrap'
                    >
                        {
                            rooms.length > 0 && rooms.map(room => {
                                if (room.name > 100 && room.name < 200) {
                                    return (
                                        <GridItem key={room.id}>
                                            <RoomNode
                                                room={room}
                                            />
                                        </GridItem>
                                    )
                                }
                                else return null;
                            })}
                    </Box>

                    <Box >
                        <Btn >Thêm phòng</Btn>
                    </Box>
                </Box>

            </Box>

            <Box className="row">
                <Box className="col-12 col-sm-6 mt-2 " >
                </Box>
            </Box>
        </Box>
    );
}

export default Rooms;