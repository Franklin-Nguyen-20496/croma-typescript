
import React, { useState, createRef, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import axios from "axios";

// import actions from '../../../../redux/actions';
// import PatientItem from '../../../common/PatientItem';
// import FakePatientItems from './FakePatientItems';
// import Btn from '../../../common/Btn';
// import Preview from './Preview';
// import BackDrop from '../../../common/BackDrop';
// import SelectOneOption from './SelectOneOption';
// import { SocketContext } from '../../../../App';
// import PatientsNeedChangeRoom from './PatientsNeedChangeRoom';

// const {
//     updateOneRoom,
//     deleteUnRoomPatient,
//     addNewNormalPatient,
//     addNewUnDoctorPatient,
// } = actions;

const PatientTransfer = () => {
    // const dispatch = useDispatch();
    // const socket = useContext(SocketContext);
    // const [showBackdrop, setShowBackdrop] = useState(false);
    // const [chosen, setChosen] = useState({ score: 0 });
    // const [sortPatients, setSortPatients] = useState([]);
    // const [showTransfer, setShowTransfer] = useState(false);
    // const [roomsTransfer, setRoomsTransfer] = useState([]);
    // const elementPreview = createRef();

    // const profile = useSelector(state => state.account.account);
    // const patientsUnRoom = useSelector(state => state.patients.unRoom);

    // const roomsOfPosition = useSelector(state => {
    //     const rooms = state.rooms.list;
    //     return rooms.filter(room => room.position === profile.position);
    // });

    // const handleSelectRoom = (item) => {
    //     console.log(`handleSelectRoom item chosen `, item);
    //     setChosen(item);
    //     setShowBackdrop(true);
    // }

    // const handleAddMultiplePatients = () => {
    //     console.log('patient un room', patientsUnRoom);
    //     const patients = [...patientsUnRoom];
    //     if (patients.length > 0) {
    //         const list = [];
    //         let roomsPossible = [...roomsOfPosition];
    //         let roomsNumber = roomsPossible.length;

    //         patients.forEach(item => {
    //             for (let i = 0; i < roomsNumber; i++) {
    //                 const { level, member, name } = roomsPossible[i]
    //                 if (item.score <= level && member.length < 6) {
    //                     const newItem = {
    //                         ...item,
    //                         room: name,
    //                     }
    //                     list.push(newItem);
    //                     const newMember = [...member]
    //                     newMember.push(item.id);
    //                     const newRoom = { ...roomsPossible[i], member: newMember };
    //                     const newRooms = roomsPossible.map(room => {
    //                         if (room.id === newRoom.id) {
    //                             return newRoom;
    //                         }
    //                         else return room;
    //                     })
    //                     console.log('newRooms:', newRooms)
    //                     roomsPossible = [...newRooms];
    //                     console.log('patients, roomsPossible, list', patients, roomsPossible, list);
    //                     break;
    //                 }
    //                 else continue;
    //             }
    //         })

    //         setSortPatients(list);
    //         setRoomsTransfer(roomsPossible);
    //         setShowTransfer(true);
    //         window.scroll({
    //             top: elementPreview.current.offsetTop,
    //             behavior: 'smooth'
    //         });
    //     }
    // }

    // const handleSubmitMultiplePatients = async () => {
    //     try {
    //         console.log('list need submit roomsTransfer sortPatients', roomsTransfer, sortPatients);
    //         const rooms = [...roomsOfPosition];

    //         await roomsTransfer.forEach((room, index) => {
    //             console.warn('axios room', room)
    //             if (!_.isEqual(rooms[index], room)) {
    //                 axios({
    //                     method: 'put',
    //                     url: '/rooms/update',
    //                     data: room,
    //                 })
    //                     .then(res => {
    //                         const { data, message } = res.data;
    //                         if (data) {
    //                             socket.emit('rooms:update', room);
    //                             dispatch(updateOneRoom(room));
    //                         }
    //                         else console.warn(message);
    //                     })
    //                     .catch(err => console.log(err));
    //             }
    //         })
    //         await sortPatients.forEach(async (patient) => {
    //             try {
    //                 console.warn('axios patient', patient)
    //                 await axios({
    //                     method: 'put',
    //                     url: `/patients/update/${patient.id}`,
    //                     data: patient,
    //                 })
    //                     .then(res => {
    //                         const { data, message } = res.data;
    //                         if (data) {
    //                             socket.emit('patients:add_room', data);
    //                             if (data.doctorID) {
    //                                 dispatch(deleteUnRoomPatient(data.id));
    //                                 dispatch(addNewNormalPatient(data));
    //                             }
    //                             else {
    //                                 dispatch(deleteUnRoomPatient(data.id));
    //                                 dispatch(addNewUnDoctorPatient(data));
    //                             }
    //                         }
    //                         else console.warn(message);
    //                     })
    //                     .catch(err => console.log(err));
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         })
    //         setRoomsTransfer([]);
    //         setSortPatients([]);
    //     } catch (error) {
    //         console.log('error', error);
    //     }
    // }

    return (
        <div>
            <p className="fs-20 fw-600 mb-2">Chuyển phòng cho bệnh nhân</p>

            {/* <div className="row gap-16">
                {
                    patientsUnRoom.length > 0 ?
                        patientsUnRoom.map(item => {
                            return <PatientItem
                                showBtn={true}
                                key={item.id} item={item}
                                onClick={() => handleSelectRoom(item)}
                            />
                        }) :
                        <FakePatientItems />
                }
            </div>
            <Btn
                moreClass="mt-1" title="Chuyển tự động"
                onClick={() => handleAddMultiplePatients()}
            />
            <hr className="mt-2" />

            <PatientsNeedChangeRoom
                handleSelectRoom={handleSelectRoom}
            />

            <Preview
                ref={elementPreview}
                sortPatients={sortPatients}
                showTransfer={showTransfer}
                roomsTransfer={roomsTransfer}
                setSortPatients={setSortPatients}
                setRoomsTransfer={setRoomsTransfer}
                handleSubmit={handleSubmitMultiplePatients}
            />
            <br />

            <BackDrop
                show={showBackdrop} setShow={setShowBackdrop}
                moreStyle={{
                    bottom: '50%',
                    overflowX: 'hidden',
                    overflowY: 'hidden',
                    maxWidth: '94vw',
                    minWidth: '36rem',
                    boxShadow: 'none',
                }}
            >
                <SelectOneOption
                    chosenPatient={chosen}
                    setShowBackdrop={setShowBackdrop}
                />
            </BackDrop> */}
        </div>
    );

}

export default PatientTransfer;
