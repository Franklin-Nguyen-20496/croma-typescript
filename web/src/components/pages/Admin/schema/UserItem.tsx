
import React, { memo, useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import {
    Box, type BoxProps,
    Text,
    Avatar,
    IconButton,
    Button,
    useColorMode,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import User from '../../../../Interfaces/user.interface';
import userRoleHelper from '../../../../helpers/user.role.helper';

const MotionBox = motion(Box);

type UserItemProps = {
    user: User;
    show?: boolean;
    onClick?: () => void;
    handleShowInfo?: () => void;
    handleUpdate?: () => void;
    handleDelete?: () => void;
}

const UserItem = (props: UserItemProps, key?: string) => {

    const {
        user,
        show,
        onClick,
        handleShowInfo,
        handleUpdate,
        handleDelete,
    } = props;
    const { colorMode } = useColorMode();

    return (
        <Box
            key={key}
            display="flex" justifyContent="flex-start" alignItems="center" p={2}
            borderRadius="8px"
            _hover={{
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)"
            }}
            className='user-item'
            position="relative"
            onClick={(e) => e.stopPropagation()}
            transition='all .3s ease-in-out'
            // bg={show ? 'brand.200' : ''}
            boxShadow={show ? '0px 0px 8px rgba(0, 0, 0, 0.2)' : ''}
        >
            <Avatar src={user.file} mr={2} />
            <Box flex={1}>
                <Text className="text-tow-line">
                    {`${userRoleHelper(user.role)} ${user.firstName}`}
                </Text>
            </Box>
            <IconButton
                as='div'
                display='flex'
                justifyContent='center'
                variant='outline'
                aria-label='Call Sage'
                fontSize='20px'
                icon={<FiMoreVertical />}
                borderRadius='50%'
                borderColor='white'
                color='white'
                size='sm'
                cursor='pointer'
                _hover={{
                    borderColor: 'white',
                    color: 'white',
                }}
                alignSelf='start'
                sx={{
                    '.user-item:hover &': {
                        opacity: 1
                    }
                }}
                transition='all .3s ease-in-out'
                onClick={onClick}
                opacity={show ? 1 : 0}
            />
            <MotionBox
                display={show ? 'block' : 'none'}
                position='absolute'
                top={10}
                right='0'
                borderRadius="4px"
                minWidth={40}
                borderWidth="1px"
                borderColor="gray.500"
                bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'}
                color={colorMode === 'dark' ? 'gray.200' : 'gray.800'}
                zIndex={10}
                animate={{ scale: show ? 1 : 0.5 }}
                transition={{
                    duration: 0.3,
                    type: 'spring',
                }}
            >
                <Button
                    borderRadius='none'
                    display="block"
                    width="100%"
                    borderBottomWidth='1px'
                    borderColor="gray.500"
                    onClick={handleShowInfo}
                >
                    Xem thông tin
                </Button>
                <Button
                    borderRadius='none' display="block" width="100%"
                    borderBottomWidth='1px'
                    borderColor="gray.500"
                    onClick={handleUpdate}
                >
                    Chỉnh sửa
                </Button>
                <Button
                    borderRadius='none' display="block" width="100%"
                    onClick={handleDelete}
                >
                    Xóa
                </Button>
            </MotionBox>
        </Box>
    )
};

export default memo(UserItem);