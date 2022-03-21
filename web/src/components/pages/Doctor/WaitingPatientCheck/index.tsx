
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { PDFViewer } from '@react-pdf/renderer';

// import WaitingPatientCard from '../../../common/waitingPatientCard';
// import actions from '../../../../redux/actions';
// import PDFPreview from '../../../common/PDFPreview';
// import AddDiseaseForm from './AddDiseaseForm';
// import { SocketContext } from "../../../../App";

// const { setSelectedPatient, setFinishedId, addNewUnRoomPatient } = actions;

const WaitingPatientCheck = () => {
    // const socket = useContext(SocketContext);
    // const [profile, setProfile] = useState({});
    // const finishedId = useSelector(state => state.waitingPatients.finishedId);
    // const dispatch = useDispatch();
    // const patient = useSelector(state => state.waitingPatients.selectedPatient);
    // console.log('compare', finishedId, patient._id, finishedId === patient._id);

    // get selected patient when reload
    // useEffect(() => {
    //     axios({
    //         method: 'get',
    //         url: '/waiting/get-by-selected'
    //     })
    //         .then(res => {
    //             console.log(res);
    //             const { data, message } = res.data
    //             if (data) {
    //                 dispatch(setSelectedPatient(data))
    //             }
    //             else console.warn(message)
    //         })
    //         .catch(err => console.log(err))
    // }, [dispatch]);

    // const handleFinishedProfile = (values) => {
    //     console.log(values);
    //     const { disease, score } = values;
    //     if (disease && score) {
    //         const newPatient = { ...patient, ...values };
    //         setProfile(newPatient);
    //     }
    // }

    // const handlePatientSubmit = (newValues, { resetForm }) => {
    //     if (patient._id) {
    //         const values = { ...patient, ...newValues }
    //         console.log('handle submit finished', values);
    //         axios({
    //             method: 'put',
    //             url: '/waiting/finished',
    //             data: values,
    //         })
    //             .then(res => {
    //                 const { data, message } = res.data;
    //                 if (data) {
    //                     socket.emit('waiting_patients:finished', values._id);
    //                     dispatch(setFinishedId(values._id));
    //                     socket.emit('patients:add_new_un_room', data);
    //                     dispatch(addNewUnRoomPatient(data));
    //                     setProfile({});
    //                     resetForm();
    //                 }
    //                 else console.warn(message);
    //             })
    //             .catch(err => console.log(err))
    //     }
    // }

    return (
        <div className="mb-5">
            <p className="fs-20 fw-600 mb-2">Chẩn đoán sơ lượt</p>

            {/* <div className="row gap-16">
                <div className="col-12 col-md-5">
                    <div>
                        <div
                            className="mb-2"
                            style={{ maxWidth: '20rem' }}
                        >
                            <WaitingPatientCard
                                patient={patient}
                                finished={finishedId === patient._id}
                            />
                        </div>
                        <div className="p-2">
                            <AddDiseaseForm
                                handlePatientSubmit={handlePatientSubmit}
                                handleFinishedProfile={handleFinishedProfile}
                            />
                        </div>

                    </div>

                </div>
                <div className="col-12 col-md-7">

                    <div className="videoWrapper">
                        <PDFViewer>
                            <PDFPreview patient={!_.isEmpty(profile) ? profile : patient} />
                        </PDFViewer>
                    </div>

                </div>

            </div> */}
        </div>
    );
}

export default WaitingPatientCheck;
