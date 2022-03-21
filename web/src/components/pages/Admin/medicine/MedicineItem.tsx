import React from 'react';
import {
    Box,
    IconButton,
    Text,
    Button,
} from '@chakra-ui/react';
import { CgMenuGridR } from 'react-icons/cg';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Medicine, { medicine } from '../../../../Interfaces/medicine.interface';

const MotionBox = motion(Box);

type Props = {
    item: Medicine,
    onClick: (e: any) => void,
    showMenu: boolean,
    handlePlus: () => void,
    handleMinus: () => void,
    handleDelete: () => void,
}

const MedicineItem = (props: Props) => {
    const {
        item,
        onClick,
        showMenu,
        handlePlus,
        handleMinus,
        handleDelete,
    } = props;

    return (
        <Box
            position="relative"
            h={10}
            display='flex'
            pl={4}
            pr={1}
            borderRadius="100px"
            borderWidth="1px"
            borderColor="brand.200"
            alignItems='center'

        >
            <Text
                sx={{ '&::first-letter': { textTransform: 'uppercase' } }}
                flex={1}
            >
                {`${item.name} | ${item.total} | ${item.unit}`}
            </Text>
            <IconButton
                colorScheme='blue'
                aria-label='Search database'
                icon={<CgMenuGridR size='18px' />}
                onClick={onClick}
                size='sm'
                borderRadius='50%'
                _hover={{
                    transform: 'scale(1.1)',
                }}
            />
            <MotionBox
                position='absolute' maxWidth='180px'
                _dark={{ bg: 'blue.200' }} _light={{ bg: 'blue.500' }}
                top={10} right={1}
                borderRadius='8px'
                zIndex={1}
                display={showMenu ? 'block' : 'none'}
                animate={{
                    scale: showMenu ? 1 : 0.5,
                    opacity: showMenu ? 1 : 0,
                }}
                transition={{
                    duration: 0.3,
                    type: 'spring',
                }}
            >
                <Button
                    justifyContent='flex-start' leftIcon={<FaMinus />} w='100%' colorScheme='blue'
                    borderTopRadius='8px'
                    onClick={handlePlus}
                >
                    Thêm số lượng
                </Button>
                <Button
                    justifyContent='flex-start' leftIcon={<FaPlus />} borderRadius='0' w='100%' colorScheme='blue'
                    onClick={handleMinus}
                >
                    Bớt số lượng
                </Button>
                <Button
                    justifyContent='flex-start' leftIcon={<FaTrashAlt />} borderRadius='0' w='100%' colorScheme='blue'
                    borderBottomRadius='8px'
                    onClick={handleDelete}
                >
                    Xóa
                </Button>
            </MotionBox>
        </Box>
    );
}

const itemStyle = {
    height: '4.4rem',
}

export default MedicineItem;
