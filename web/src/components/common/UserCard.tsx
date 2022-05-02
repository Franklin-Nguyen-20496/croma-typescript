import React from 'react';
import { Box, Avatar, Text } from '@chakra-ui/react';

import User from '../../Interfaces/user.interface';
import userRoleHelper from '../../helpers/user.role.helper';
import checkPosition from '../../helpers/checkPosition.helper';

type UserInfoProps = {
    item: User;
    position?: boolean;
}

const UserCard = ({ item, position }: UserInfoProps) => {
    const { firstName, lastName, email, role, file, age } = item;

    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            lineHeight={1.7}
        >
            <Avatar src={file} size='2xl'></Avatar>
            <Text mt={4} >{userRoleHelper(role)}</Text>
            <Text fontWeight='bold' >{`${lastName} ${firstName}`}</Text>
            <Text >{'Tuổi: ' + age}</Text>
            <Text >{`Email: ${email}`}</Text>
            {!position && <Text >{'Vị trí: ' + checkPosition(item.position)}</Text>}
        </Box>
    )
};

export default UserCard;