
import React, { useEffect, useState, useLayoutEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import { PDFViewer } from '@react-pdf/renderer';
import { useNavigate } from 'react-router-dom';
import {
    Checkbox,
    FormLabel,
    Box,
    Heading,
    Avatar,
    AvatarBadge,
} from '@chakra-ui/react';

import { StateRedux } from '../../../redux/reducers/index';
// import WaitingPatientList from './WaitingPatientList';
import Btn from '../../common/Btn';
import Patient from '../../common/Patient';
import PDFPreview from '../../common/PDFPreview';
import { SocketContext } from "../../../App";
import { role } from '../../../helpers/user.role.helper';
import WaitingPatient from '../../../Interfaces/waitingPatient.interface';
import actions from '../../../redux/actions';

const { setAllWaitingPatients, updateOneWaitingPatient, setAllListIDs } = actions;

const Coordinator = () => {
    const dispatch = useDispatch();
    const [start, setStart] = useState(false);
    const navigate = useNavigate();
    const socket = useContext(SocketContext);
    const profile = useSelector((state: StateRedux) => state.account.account);
    const list = useSelector((state: StateRedux) => state.waitingPatients.list);
    const patient = useSelector((state: StateRedux) => {
        return state.waitingPatients.list.find((item: WaitingPatient) => item.selected === true);
    });

    const finishedID = useSelector((state: StateRedux) => {
        return state.waitingPatients.finishedID;
    });

    //check role
    useLayoutEffect(() => {
        if (profile && (profile.role !== role.COORDINATOR && profile.role !== role.ADMIN)) {
            navigate('/')
        }
    })

    // get array id data patients when reload 
    useLayoutEffect(() => {
        axios({
            method: 'get',
            url: '/waiting'
        })
            .then(res => {
                console.log('get_all_waiting_patients', res);
                const { message, data } = res.data;
                if (data) {
                    dispatch(setAllWaitingPatients(data))
                }
                else console.warn(message)
            })
            .catch(err => console.log(err))
    }, [dispatch])

    // get selected item when reload
    // useEffect(() => {
    //     axios({
    //         method: 'get',
    //         url: '/waiting/get-by-selected'
    //     })
    //         .then(res => {
    //             console.log('res when get by api selected', res);
    //             const { message, data } = res.data;
    //             if (data) {
    //                 dispatch(setSelectedPatient(data));
    //                 setStart(true)
    //             }
    //             else {
    //                 setStart(false)
    //                 console.warn(message)
    //             }
    //         })
    //         .catch(err => console.log(err))
    // }, [dispatch])

    // start job and select id selected
    const handleStartJob = async () => {
        try {
            if (list.length > 0) {
                const id = list[0];
                const newList = [...list];
                newList.shift();
                axios({
                    method: 'get',
                    url: `/waiting/selected/${id}`,
                })
                    .then(res => {
                        const { item, list } = res.data;
                        socket.emit('waiting_patients:update', item);
                        dispatch(updateOneWaitingPatient(item));
                        socket.emit('waiting_patients:get_all', list);
                        dispatch(setAllListIDs(list));
                        setStart(true)
                    })
                    .catch(err => console.log(err))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleNextPatient = async () => {
        try {
            if (patient && finishedID === patient.id) {
                handleStartJob()
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mb-5">
            <h1 className="fs-20 fw-600 text-dark">Điều phối</h1>

            {/* <div className="row gap-16 mt-2 mb-2">
                <div className="col-12 col-sm-5 text-center"
                >
                    <p className="fs-18 fw-600 text-white mb-2 d-none d-sm-block">Bệnh nhân</p>
                    <div className="d-flex flex-direction-column align-items-center text-center justify-content-center mb-3"
                        style={{ position: 'relative' }}
                    >
                        {!start && <Btn title="Bắt đầu ca làm việc" onClick={handleStartJob} />}
                        {start && <WaitingPatientCard patient={patient} finished={finishedId === patient._id} />}
                    </div>
                    {list.length > 0 && !_.isEmpty(patient) && <Btn
                        title="Next"
                        fontSize="fs-14"
                        disabled={true}
                        onClick={handleNextPatient}
                    />}
                </div>
                <div className="col-12 col-sm-7">
                    <WaitingPatientList />
                </div>
            </div>

            <hr className="mt-2 mb-2" />

            <p className=" fs-18 fw-600 text-dark text-center mb-3">Template gửi cho bác sĩ</p>

            <div className="row">

                <div className="col-12 col-sm-7 col-md-8">
                    <PatientDetail />
                </div>

                <div
                    className="col-12 col-sm-5 col-md-4"
                >
                    <div className="videoWrapper">
                        <PDFViewer>
                            <PDFPreview patient={patient} />
                        </PDFViewer>
                    </div>
                </div>
            </div> */}
        </div >
    );
}

export default Coordinator;
