
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    Box, Grid, GridItem, Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'

import MedicineItem from './MedicineItem';
import Btn from '../../../common/Btn';
import Medicine, { medicine } from '../../../../Interfaces/medicine.interface';
import CustomInput from '../../../common/CustomInput';

type ListProps = {
    items: Medicine[];
    setMedicines: React.Dispatch<React.SetStateAction<Medicine[]>>;
}

const List = ({ items, setMedicines }: ListProps) => {
    const [selected, setSelected] = useState(medicine);
    const [chosen, setChosen] = useState(medicine)
    const { isOpen: isOpenPlusForm, onOpen: onOpenPlusForm, onClose: onClosePlusForm } = useDisclosure();
    const { isOpen: isOpenMinusForm, onOpen: onOpenMinusForm, onClose: onCloseMinusForm } = useDisclosure();
    const { isOpen: isOpenConfirmDelete, onOpen: onOpenConfirmDelete, onClose: onCloseConfirmDelete } = useDisclosure();


    const inputPlus = useRef<HTMLInputElement>(null);
    const inputMinus = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleHideMenu = () => {
            setSelected(medicine);
        }

        window.addEventListener('click', handleHideMenu)

        return () => {
            window.removeEventListener('click', handleHideMenu)
        }
    }, [])

    const handleSubmitPlus = (e: any) => {
        e.preventDefault();
        console.log('value', inputPlus);
        if (inputPlus.current && inputPlus.current.value) {
            const value = chosen.total + Number(inputPlus.current.value);
            const data = {
                ...chosen,
                total: value
            }

            if (inputPlus.current.value) {
                console.log(inputPlus.current.value)
                axios({
                    method: 'put',
                    url: '/medicines/update',
                    data: data
                })
                    .then(res => {
                        const { data, message } = res.data;
                        if (data) {
                            const result: Medicine[] = items.map(value => {
                                if (data.id === value.id) {
                                    return data
                                }
                                else return value
                            })
                            setSelected(medicine);
                            setMedicines(result);
                            onClosePlusForm();
                        }
                        else console.warn(message);
                    })
                    .catch(err => console.log(err))
            }
        }
    }

    const handleSubmitMinus = (e: any) => {
        e.preventDefault();
        console.log('value', inputMinus);
        if (inputMinus.current && inputMinus.current.value) {
            const value = chosen.total - Number(inputMinus.current.value);
            const data = {
                ...chosen,
                total: value
            }
            console.log(data);
            axios({
                method: 'put',
                url: '/medicines/update',
                data: data
            })
                .then(res => {
                    const { data, message } = res.data;
                    if (data) {
                        const result: Medicine[] = items.map(value => {
                            if (data.id === value.id) {
                                return data
                            }
                            else return value
                        })
                        setSelected(medicine);
                        setMedicines(result);
                        onCloseMinusForm();
                    }
                    else console.warn(message);
                })
                .catch(err => console.log(err))
        }
    }

    const handleDelete = (e: any) => {
        e.preventDefault();
        axios({
            method: 'delete',
            url: `/medicines/delete/${chosen.id}`,
        })
            .then(res => {
                const { message } = res.data;
                if (message === 'success') {
                    setMedicines(prev => {
                        return prev.filter(value => value.id !== chosen.id)
                    })
                    onCloseConfirmDelete();
                }
                else console.warn(message)
            })
    }

    return (
        <>
            <Grid gap={4} templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
                my={4}
            >
                {
                    items ? items.map((item: Medicine) => {
                        return <GridItem key={item.id}>
                            <MedicineItem
                                item={item}
                                key={item.id}
                                onClick={(e: any) => {
                                    e.stopPropagation();

                                    if (selected && selected.id === item.id) {
                                        setSelected(medicine)
                                    }
                                    else setSelected(item)
                                }}
                                showMenu={item.id === selected.id}
                                handlePlus={() => {
                                    setChosen(item);
                                    onOpenPlusForm();
                                }}
                                handleMinus={() => {
                                    setChosen(item);
                                    onOpenMinusForm();
                                }}
                                handleDelete={() => {
                                    setChosen(item);
                                    onOpenConfirmDelete();
                                }}
                            />
                        </GridItem>
                    })
                        :
                        <div className="col-12 ">
                            <p className="bg-green p-1">Chưa có công thức thuốc nào!</p>
                        </div>
                }
            </Grid>

            <Modal isOpen={isOpenPlusForm} onClose={onClosePlusForm}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Bớt số lượng thuốc</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb={2}>Tên thuốc: {chosen.name}</Text>
                        <CustomInput ref={inputPlus} />
                    </ModalBody>

                    <ModalFooter>
                        <form>
                            <Btn
                                mr={3} onClick={onClosePlusForm}
                                bg='red.600'
                            >
                                Close
                            </Btn>
                            <Btn
                                type='submit'
                                onClick={handleSubmitPlus}
                            >
                                Lưu lại
                            </Btn>
                        </form>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenMinusForm} onClose={onCloseMinusForm}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Bớt số lượng thuốc</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb={2}>Tên thuốc: {chosen.name}</Text>
                        <CustomInput type='number' ref={inputMinus} />
                    </ModalBody>

                    <ModalFooter>
                        <form>
                            <Btn
                                mr={3} onClick={onCloseMinusForm}
                                bg='red.600'
                            >
                                Close
                            </Btn>
                            <Btn type='submit' onClick={handleSubmitMinus}>Lưu lại</Btn>
                        </form>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenConfirmDelete} onClose={onCloseConfirmDelete}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Xóa tên thuốc</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Bạn có chắc chắn muốn xóa loại thuốc này khỏi kho thuốc?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <form>
                            <Btn
                                mr={3} onClick={onCloseConfirmDelete}
                                bg='red.600'
                            >
                                Hủy
                            </Btn>
                            <Btn type='submit' onClick={handleDelete} >Đồng ý</Btn>
                        </form>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    );
}

export default List;
